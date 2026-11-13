# Extract aligned layers: python proc.py body|face [keys]
import sys, json, os, numpy as np
from PIL import Image
from scipy import ndimage as nd
MODE=sys.argv[1]
def load(p, size=None):
    im=Image.open(p).convert('RGB')
    if size and im.size!=size: im=im.resize(size, Image.LANCZOS)
    return np.asarray(im).astype(np.float32)
def bglike(a):
    mx=a.max(2); mn=a.min(2); return ((mx-mn)<14)&(a.mean(2)>165)
def cut_base(a):
    # background model: each row's colour taken from the left / right edges (the studio grey has a soft gradient)
    edge=np.concatenate([a[:,:24],a[:,-24:]],1)
    rowbg=np.median(edge,1)                                      # H × 3
    rowbg=nd.uniform_filter1d(rowbg,41,axis=0)
    dist=np.sqrt(((a-rowbg[:,None,:])**2).sum(2))
    bg=bglike(a)&((a.max(2)-a.min(2))<7); lab,n=nd.label(bg)
    border=set(np.unique(np.concatenate([lab[0],lab[-1],lab[:,0],lab[:,-1]])))-{0}
    outside=np.isin(lab,list(border))
    body=~outside; body=nd.binary_fill_holes(body); body=nd.binary_opening(body,iterations=2)
    return body
def soft(mask, sigma=1.0):
    return np.clip(nd.gaussian_filter(mask.astype(np.float32),sigma),0,1)
def save_layer(rgb, alpha, name, scale, crop=True):
    H,W=alpha.shape
    rgba=np.dstack([rgb,alpha*255]).astype(np.uint8)
    im=Image.fromarray(rgba,'RGBA')
    tw,th=round(W*scale),round(H*scale)
    # premultiply-aware downscale
    pm=np.dstack([rgb*alpha[...,None],alpha*255]).astype(np.float32)
    pim=Image.fromarray(np.clip(pm,0,255).astype(np.uint8),'RGBA').resize((tw,th),Image.LANCZOS)
    p=np.asarray(pim).astype(np.float32); a=p[...,3:4]/255
    col=np.where(a>0.01,p[...,:3]/np.maximum(a,0.01),0)
    out=np.dstack([np.clip(col,0,255),p[...,3]]).astype(np.uint8)
    ys,xs=np.where(out[...,3]>6)
    if len(ys)==0: return None
    x0,x1,y0,y1=(max(0,xs.min()-2),min(tw,xs.max()+3),max(0,ys.min()-2),min(th,ys.max()+3)) if crop else (0,tw,0,th)
    Image.fromarray(out[y0:y1,x0:x1],'RGBA').save(name)
    return [int(x0),int(y0),int(x1-x0),int(y1-y0)]
CFG=json.load(open('layers_cfg.json'))[MODE]
base=load(CFG['base']); H,W=base.shape[:2]
os.makedirs('L',exist_ok=True)
meta=json.load(open('L/meta.json')) if os.path.exists('L/meta.json') else {}
done_keys=set(); drop_keys=set()
S=CFG['scale']
body=cut_base(base)
for _k,_c in CFG['items'].items():                               # keep grey / white hair that looks like the backdrop
    if _c.get('chroma') and os.path.exists(_c.get('src',_k)+'.png'):
        _e=load(_c.get('src',_k)+'.png',(base.shape[1],base.shape[0]))
        _g=(_e[...,1]-np.maximum(_e[...,0],_e[...,2]))>20
        body|=nd.binary_closing(_g,iterations=3); body=nd.binary_fill_holes(body)
if '--base' in sys.argv or not os.path.exists(f"L/{MODE}_base.webp"):
    r=save_layer(base, soft(body,1.2), f"L/{MODE}_base.png", S, crop=False); meta[MODE+'_base']=r; done_keys.add(MODE+'_base')
    meta[MODE+'_size']=[round(W*S),round(H*S)]; done_keys.add(MODE+'_size')
yy,xx=np.mgrid[0:H,0:W]
def zone(z):
    m=np.ones((H,W),bool)
    for kind,(x0,y0,x1,y1) in z:
        if kind=='oute':
            cx,cy,rx,ry=(x0+x1)/2*W,(y0+y1)/2*H,(x1-x0)/2*W,(y1-y0)/2*H
            m&=((xx-cx)/rx)**2+((yy-cy)/ry)**2>1; continue
        r=(xx>=x0*W)&(xx<x1*W)&(yy>=y0*H)&(yy<y1*H)
        m = (m|r) if kind=='only_first' else (m&r if kind=='in' else m&~r)
    return m
bb=nd.gaussian_filter(base,(1.2,1.2,0))
keys=[] if '--baseonly' in sys.argv else ([k for k in sys.argv[2:] if not k.startswith('--')] or [k for k in CFG['items']])
for key in keys:
    c=CFG['items'][key]; src=c.get('src',key)+'.png'
    if not os.path.exists(src): print('missing',src); continue
    e=load(src,(W,H)); eb=nd.gaussian_filter(e,(1.2,1.2,0))
    d=np.sqrt(((eb-bb)**2).sum(2))
    if c.get('chroma'):
        R,G,B=e[...,0],e[...,1],e[...,2]
        ratio=(G-np.maximum(R,B))/np.maximum(G,1)
        green=np.clip((ratio-0.1)/0.22,0,1)*np.clip((G-14)/20,0,1)   # chroma-key green hair → soft alpha (dark strands too)
        green=nd.gaussian_filter(green,0.8)
        hz=zone(c.get('zone',[]))
        hair=(green>0.05)&hz
        lab,n=nd.label(hair)
        if n: sz=nd.sum(hair,lab,range(1,n+1)); keep=np.zeros(n+1,bool); keep[1:]=sz>=0.02*sz.max(); hair=keep[lab]
        holes=nd.binary_fill_holes(hair)&~hair; lab,n=nd.label(holes)
        if n: sz=nd.sum(holes,lab,range(1,n+1)); small=np.zeros(n+1,bool); small[1:]=sz<1500; hair|=small[lab]; green=np.where(small[lab],1,green)
        ha=np.where(nd.binary_dilation(hair,iterations=1),np.clip(green*1.2,0,1),0)
        ha=np.maximum(ha,nd.binary_fill_holes(hair)&~hair*0)        # (no hole filling: gaps between strands stay open)
        # background that replaced the old bun → erase from the base
        er=bglike(eb)&body&zone(c.get('erase_zone',[]))&~hair
        er=nd.binary_opening(er,iterations=3)
        lab,n=nd.label(er)
        if n: sz=nd.sum(er,lab,range(1,n+1)); keep=np.zeros(n+1,bool); keep[1:]=sz>=4000; er=keep[lab]
        er=nd.binary_dilation(er,iterations=3)
        # skin where the old dark hairline was but the new style shows forehead / ears
        Lb=bb.mean(2); skin=(Lb<95)&~hair&~bglike(eb)&(d>40)&hz&(eb.mean(2)>110)
        skin=nd.binary_opening(skin,iterations=2)
        r=save_layer(e,ha,f"L/{key}.png",S); meta[key]=r; done_keys.add(key)
        if er.sum()>500: meta[key+'_erase']=save_layer(np.zeros_like(e),soft(er,1.5),f"L/{key}_erase.png",S); done_keys.add(key+'_erase')
        else: meta.pop(key+'_erase',None); drop_keys.add(key+'_erase')
        if skin.sum()>800: meta[key+'_skin']=save_layer(e,soft(skin,1.2),f"L/{key}_skin.png",S); done_keys.add(key+'_skin')
        else: meta.pop(key+'_skin',None); drop_keys.add(key+'_skin')
        print(key,r,'erase',int(er.sum()),'skin',int(skin.sum()),flush=True)
        continue
    m=d>c.get('t',30)
    if not c.get('nobg'): m&=~(bglike(eb)&bglike(bb))     # floor shadows / background noise
    sat=eb.max(2)-eb.min(2)
    m&=~((sat<24)&bglike(bb)&(yy>0.8*H))                       # shadow under long skirts
    if c.get('floor'): m&=~(bglike(bb)&(yy>c['floor']*H))
    m&=zone(c.get('zone',[]))
    if c.get('core'):
        x0,y0,x1,y1,tc=c['core']; cx,cy,rx,ry=(x0+x1)/2*W,(y0+y1)/2*H,(x1-x0)/2*W,(y1-y0)/2*H
        inside=((xx-cx)/rx)**2+((yy-cy)/ry)**2<=1
        re_=eb[...,2]/np.maximum(eb[...,0],1); rb=bb[...,2]/np.maximum(bb[...,0],1)
        hairish=(d>30)&((re_<rb-0.07)|(d>tc))                  # blonde hair is yellower than skin
        m&=~(inside&~hairish)
        # near the face and on the shoulders keep only hair-coloured pixels (blonde: little blue)
        ex=((xx-cx)/(rx*1.25))**2+((yy-cy)/(ry*1.2))**2<=1
        bfrac=eb[...,2]/np.maximum(eb.sum(2),1)
        m&=~((ex|(yy>c.get('neck',1.0)*H))&(bfrac>=0.25))
    m=nd.binary_opening(m,iterations=2)
    m=nd.binary_closing(m,iterations=c.get('close',4))
    lab,n=nd.label(m)
    if n:
        sz=nd.sum(m,lab,range(1,n+1)); keep=np.zeros(n+1,bool); keep[1:]=(sz>=c.get('minarea',1500))&(sz>=c.get('mainfrac',0)*sz.max()); m=keep[lab]
    if c.get('fill')=='all': m=nd.binary_fill_holes(m)
    else:
        holes=nd.binary_fill_holes(m)&~m; lab,n=nd.label(holes)
        if n:
            sz=nd.sum(holes,lab,range(1,n+1)); small=np.zeros(n+1,bool); small[1:]=sz<c.get('hole',6000); m|=small[lab]
    # "erase": where the base had body/hair but the edit shows background (hair styles)
    er=None
    if c.get('erase'):
        er=bglike(eb)&body&zone(c.get('erase_zone',[]))
        er=nd.binary_opening(er,iterations=3)
        lab,n=nd.label(er)
        if n: sz=nd.sum(er,lab,range(1,n+1)); keep=np.zeros(n+1,bool); keep[1:]=sz>=c.get('erase_min',6000); er=keep[lab]
        m&=~nd.binary_dilation(er,iterations=1); er=nd.binary_dilation(er,iterations=3)
    a=soft(m,1.0)
    r=save_layer(e,a,f"L/{key}.png",S); meta[key]=r; done_keys.add(key)
    if er is not None and er.sum()>500:
        z=np.zeros_like(e); r2=save_layer(z,soft(er,1.5),f"L/{key}_erase.png",S); meta[key+'_erase']=r2; done_keys.add(key+'_erase')
    print(key,r,flush=True)
import fcntl
mine=dict(meta)
with open('L/meta.lock','w') as lk:
    fcntl.flock(lk,fcntl.LOCK_EX)
    cur=json.load(open('L/meta.json')) if os.path.exists('L/meta.json') else {}
    cur.update({k:v for k,v in mine.items() if k in done_keys or k not in cur})
    for k in drop_keys: cur.pop(k,None)
    json.dump(cur,open('L/meta.json.tmp','w'),indent=0); os.replace('L/meta.json.tmp','L/meta.json')
