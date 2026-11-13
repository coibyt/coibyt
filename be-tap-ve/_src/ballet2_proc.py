# Ballet v2 layers: full figures (base + costumes) cut from the grey studio, hair masks, dress masks,
# head registration (ready → pose), headpieces and fairy wings as separate accessories.
import sys, os, json, numpy as np
from PIL import Image
from scipy import ndimage as nd
from ballet2_cut import cutout, load
OUT='L2/'; os.makedirs(OUT,exist_ok=True)
FULL=os.environ.get('BALLET_FULL','full/')
S=0.42; W0,H0=1536,2752; W,H=round(W0*S),round(H0*S)
POSES=['arabesque','arm1','arm2','arm5','attitude','feet2','feet5','final','passe','pirouette','pirprep','plie','portbras','ready','releve','reverence','saute','tendu']
CP=['ready','releve','tendu','passe','arabesque','portbras','pirouette','final','reverence']
def down(col,al):
    pm=np.dstack([col*al[...,None],al*255]).astype(np.float32)
    p=np.asarray(Image.fromarray(np.clip(pm,0,255).astype(np.uint8),'RGBA').resize((W,H),Image.LANCZOS)).astype(np.float32)
    a=p[...,3]/255; c=np.where(a[...,None]>0.01,p[...,:3]/np.maximum(a,0.01)[...,None],0)
    return np.clip(c,0,255), a
def floorclean(c,a):
    sat=c.max(2)-c.min(2); yy=np.arange(H)[:,None]
    a=np.where((yy>0.74*H)&(sat<12),0,a)
    m=a>0.25; lab,n=nd.label(m)
    if n:
        sz=nd.sum(m,lab,range(1,n+1)); k=np.zeros(n+1,bool); k[1:]=sz>=0.01*sz.max(); a=a*nd.binary_dilation(k[lab],iterations=2)
    return a
def hairmask(c,a):
    lum=c.mean(2); dark=(lum<100)&(a>0.6)
    lab,n=nd.label(nd.binary_closing(dark,iterations=2))
    if not n: return np.zeros_like(a)
    sz=nd.sum(dark,lab,range(1,n+1)); i=np.argmax(sz)+1; m=lab==i
    m=nd.binary_fill_holes(m)
    soft=np.clip((150-lum)/55,0,1)*a
    return np.where(nd.binary_dilation(m,iterations=2),soft,0)*(nd.gaussian_filter(m.astype(float),1.5)>0.05)
def skin(c):
    r,g,b=c[...,0],c[...,1],c[...,2]
    return (r>150)&(r-b>35)&(r-g>18)&(g>100)&(g>=b+4)
def shift_est(A,B):
    # translation that maps B onto A (phase correlation)
    F=np.fft.fft2(A)*np.conj(np.fft.fft2(B)); F/=np.abs(F)+1e-6
    r=np.fft.ifft2(F).real; y,x=np.unravel_index(np.argmax(r),r.shape)
    if y>r.shape[0]//2: y-=r.shape[0]
    if x>r.shape[1]//2: x-=r.shape[1]
    return int(y),int(x)
def shifted(img,dy,dx):
    return nd.shift(img,(dy,dx)+(0,)*(img.ndim-2),order=1,mode='constant')
def register(hA,hB):
    # similarity transform mapping ready-hair (A) onto pose-hair (B): returns [cx0,cy0,cx1,cy1,rot,scale]
    def cent(m):
        ys,xs=np.nonzero(m>0.5); return xs.mean(),ys.mean(),len(xs)
    ax,ay,na=cent(hA); bx,by,nb=cent(hB)
    s0=np.sqrt(nb/na); best=(-1,0,s0)
    ys,xs=np.nonzero(hA>0.5); px=xs-ax; py=ys-ay
    Bm=hB>0.5
    for sc in s0*np.array([0.9,0.95,1,1.05,1.1]):
        for rot in np.radians(np.arange(-90,91,3)):
            cr,sr=np.cos(rot),np.sin(rot)
            qx=np.round(bx+sc*(cr*px-sr*py)).astype(int); qy=np.round(by+sc*(sr*px+cr*py)).astype(int)
            ok=(qx>=0)&(qx<W)&(qy>=0)&(qy<H)
            sc_=Bm[qy[ok],qx[ok]].mean()
            if sc_>best[0]: best=(sc_,rot,sc)
    return [round(ax,1),round(ay,1),round(bx,1),round(by,1),round(float(best[1]),3),round(float(best[2]),3)], round(float(best[0]),3)
def save(arr,name,mode='RGBA'):
    Image.fromarray(np.clip(arr,0,255).astype(np.uint8),mode).save(OUT+name)
meta={}
base={}
todo=sys.argv[1:] or ['all']
# ---- bases ----
for p in POSES:
    if os.path.exists(OUT+f'b_{p}.png'):
        im=np.asarray(Image.open(OUT+f'b_{p}.png')).astype(np.float32); c,a=im[...,:3],im[...,3]/255
        h=np.asarray(Image.open(OUT+f'bh_{p}.png')).astype(np.float32)/255; base[p]=(c,a,h); continue
    col,al,_=cutout(load('b_'+p)); c,a=down(col,al); a=floorclean(c,a)
    h=hairmask(c,a); base[p]=(c,a,h)
    save(np.dstack([c,a*255]),f'b_{p}.png'); save(h*255,f'bh_{p}.png','L')
    print('base',p,flush=True)
hr=base['ready'][2]
for p in POSES:
    T,q=register(hr,base[p][2]); meta['T_'+p]=T; print('T',p,T,q,flush=True)
# ---- costumes ----
for cos in ['pink','swan','fairy','plum']:
    for p in CP:
        k=f'bc_{cos}_{p}'
        if not os.path.exists(FULL+k+'.png'): continue
        col,al,_=cutout(load(k),wings=cos=='fairy',close=12 if cos=='swan' else 5); c,a=down(col,al); a=floorclean(c,a)
        bc,ba,bh=base[p]
        # align base → costume using the face/hair area
        hy,hx=np.nonzero(bh>0.5); y0,y1=max(0,hy.min()-40),min(H,hy.max()+140); x0,x1=max(0,hx.min()-60),min(W,hx.max()+60)
        g1=(c.mean(2)*a)[y0:y1,x0:x1]; g0=(bc.mean(2)*ba)[y0:y1,x0:x1]
        dy,dx=shift_est(g1,g0)
        bcs=shifted(bc,dy,dx); bas=shifted(ba,dy,dx); bhs=shifted(bh,dy,dx)
        diff=np.sqrt(((nd.gaussian_filter(c,(1,1,0))-nd.gaussian_filter(bcs,(1,1,0)))**2).sum(2))
        # headpiece: differs from the plain bun near the hair
        zone=nd.binary_dilation(bhs>0.3,iterations=26)
        sk=skin(c)
        hp=zone&(a>0.15)&((diff>45)|(bas<0.3))&~sk
        hp&=~((bhs>0.5)&(diff<70))
        hp=nd.binary_opening(hp,iterations=1); hp=nd.binary_closing(hp,iterations=3)
        lab,n=nd.label(hp)
        if n: sz=nd.sum(hp,lab,range(1,n+1)); kk=np.zeros(n+1,bool); kk[1:]=sz>40; hp=kk[lab]
        hpa=nd.gaussian_filter(nd.binary_dilation(hp,iterations=2).astype(float),1.0)
        acc_a=np.clip(hpa,0,1)*a
        wing=np.zeros((H,W),bool)
        # headpiece crop (accessory)
        ys,xs=np.nonzero(acc_a>0.03)
        if len(ys):
            Y0,Y1,X0,X1=ys.min(),ys.max()+1,xs.min(),xs.max()+1
            save(np.dstack([c,acc_a*255])[Y0:Y1,X0:X1],f'hp_{cos}_{p}.png'); meta[f'hp_{cos}_{p}']=[int(X0),int(Y0),int(X1-X0),int(Y1-Y0)]
        # remove headpiece: base pixels (aligned) there
        m=hpa[...,None]
        c2=c*(1-m)+bcs*m; a2=a*(1-hpa)+bas*hpa
        h2=hairmask(c2,a2)
        # dress mask: rows from the shoulders to the hem of the tutu
        outb=(a2>0.3)&(bas<0.2)
        rows=np.nonzero(outb.sum(1)>10)[0]
        dm=(a2>0.3)&((diff>24)|(bas<0.5))&~sk
        dm=nd.binary_opening(dm,iterations=2)
        dm=nd.binary_closing(np.pad(dm,12),iterations=10)[12:-12,12:-12]
        dm=nd.binary_fill_holes(dm)&(a2>0.2)&~sk&~(h2>0.3)&~nd.binary_dilation(zone,iterations=6)
        if len(rows):
            # the tutu: the longest run of rows that stick out of the plain dancer
            runs=np.split(rows,np.nonzero(np.diff(rows)>6)[0]+1); big=max(runs,key=len)
            if p not in ('arabesque','portbras','reverence'): dm[big.max()+6:]=False
        lab,n=nd.label(dm)
        if n: sz=nd.sum(dm,lab,range(1,n+1)); kk=np.zeros(n+1,bool); kk[1:]=sz>0.1*sz.max(); dm=kk[lab]
        # bodice: same colour as the tutu, above the hem
        if dm.sum()>500:
            med=np.median(c2[dm&(a2>0.8)],0)
            cd=np.sqrt(((nd.gaussian_filter(c2,(1.5,1.5,0))-med)**2).sum(2))
            ys,xs=np.nonzero(dm); bx0,bx1=xs.min(),xs.max(); by1=ys.max()
            box=np.zeros_like(dm); box[:by1+1,bx0:bx1+1]=True
            bod=(cd<(38 if cos!='swan' else 50))&(a2>0.5)&box&~sk&~(h2>0.2)&~nd.binary_dilation(zone,iterations=6)
            if cos=='fairy': bod&=~(bas<0.2)
            bod=nd.binary_opening(bod,iterations=2)
            lab,n=nd.label(bod|dm); keep=np.unique(lab[dm]); dm=np.isin(lab,keep[keep>0])
            dm=nd.binary_closing(dm,iterations=3)&(a2>0.2)&~sk
            if cos=='fairy': dm&=~((bas<0.2)&(np.arange(H)[:,None]<ys.min()+0.25*(by1-ys.min())))
        dma=nd.gaussian_filter(dm.astype(float),1.0)*a2
        save(np.dstack([c2,a2*255]),f'c_{cos}_{p}.png')
        save(np.dstack([dma*255,h2*255,np.zeros_like(h2)]),f'cm_{cos}_{p}.png','RGB')
        T,q=register(hr,h2); meta[f'T_{cos}_{p}']=T
        meta[f'sh_{cos}_{p}']=[dy,dx]
        print(cos,p,'shift',dy,dx,'T',T,q,flush=True)
json.dump(meta,open(OUT+'meta.json','w'),indent=0,default=float)
