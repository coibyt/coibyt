# cutout test
import sys, numpy as np
from PIL import Image
from scipy import ndimage as nd
import os
FULL=os.environ.get('BALLET_FULL','full/')
def load(k): return np.asarray(Image.open(FULL+k+'.png').convert('RGB')).astype(np.float32)
def cutout(a, wings=False, close=0):
    H,W=a.shape[:2]
    edge=np.concatenate([a[:,:30],a[:,-30:]],1)
    rowbg=nd.uniform_filter1d(np.median(edge,1),61,axis=0)
    ab=nd.gaussian_filter(a,(1,1,0))
    dist=np.sqrt(((ab-rowbg[:,None,:])**2).sum(2))
    sat=ab.max(2)-ab.min(2); lum=ab.mean(2); bgl=rowbg.mean(1)[:,None]
    yy=np.arange(H)[:,None]*np.ones((1,W))
    shadow=(sat<14)&(lum<bgl+3)&(yy>0.82*H)
    shadow|=(sat<12)&(yy>0.74*H)
    cand=((dist<(np.where(yy<0.6*H,3,6) if wings else 6))&(sat<8))|shadow
    lab,n=nd.label(cand)
    border=np.unique(np.concatenate([lab[0],lab[-1],lab[:,0],lab[:,-1]])); border=border[border>0]
    bg=np.isin(lab,border)
    # enclosed backdrop (between legs / arms): flat grey almost everywhere
    flat=(dist<5)&(sat<7)
    rest=nd.binary_fill_holes(~bg)&~bg&cand
    lab,n=nd.label(rest)
    if n:
        idx=range(1,n+1); sz=nd.sum(rest,lab,idx); fr=nd.mean(flat,lab,idx)
        k=np.zeros(n+1,bool); k[1:]=(sz>1200)&(fr>0.75); bg|=k[lab]
    fig=~bg
    fig=nd.binary_opening(fig,iterations=2)
    lab,n=nd.label(fig); sz=nd.sum(fig,lab,range(1,n+1))
    keep=np.zeros(n+1,bool); keep[1:]=sz>0.08*sz.max(); fig=keep[lab]
    holes=nd.binary_fill_holes(fig)&~fig; lab,n=nd.label(holes)
    if n:
        sz=nd.sum(holes,lab,range(1,n+1)); k=np.zeros(n+1,bool); k[1:]=sz<600; fig|=k[lab]
    gap=None
    if close:
        f2=nd.binary_closing(np.pad(fig,close+2),iterations=close)[close+2:-close-2,close+2:-close-2]
        gap=f2&~fig&~(yy>0.78*H); fig=fig|gap
    core=nd.binary_erosion(fig,iterations=2)
    soft=np.clip((dist-2.5)/(14 if wings else 10),0,1)
    alpha=np.where(core,1.0,np.where(fig,np.maximum(soft,0.35),0))
    if gap is not None: alpha=np.where(gap,np.maximum(np.clip((dist-2.5)/10,0,1),0.6),alpha)
    if wings:   # translucent wings: alpha follows the difference from the backdrop
        alpha=np.where(fig & (dist<24) & (sat<20) & (yy<0.6*H), np.clip((dist-2)/16,0.15,1), alpha)
        alpha=np.where(core&(dist>=24),1.0,alpha)
    alpha=nd.gaussian_filter(alpha,0.7)*nd.binary_dilation(fig,iterations=1)
    bgimg=np.broadcast_to(rowbg[:,None,:],a.shape)
    am=np.maximum(alpha,0.08)[...,None]
    col=np.clip(np.where(alpha[...,None]>0.02,(a-(1-am)*bgimg)/am,0),0,255)
    if gap is not None and gap.any():   # tulle between the spikes: borrow the colour of the tutu around it
        solid=(alpha>0.8)&~gap
        wsum=nd.gaussian_filter(solid.astype(np.float32),6)+1e-4
        near=np.dstack([nd.gaussian_filter(col[...,k]*solid,6) for k in range(3)])/wsum[...,None]
        col=np.where(gap[...,None],near,col)
        alpha=np.where(gap,np.maximum(alpha,0.55),alpha)
    return col, alpha, fig
if __name__=='__main__':
    out=[]
    for k in sys.argv[1:]:
        col,al,_=cutout(load(k),wings='fairy' in k,close=5 if k.startswith('bc_') else 0)
        rgba=np.dstack([col,al*255]).astype(np.uint8)
        im=Image.fromarray(rgba,'RGBA').resize((614,1100),Image.LANCZOS)
        bg=Image.new('RGBA',im.size,(30,140,60,255)); bg.alpha_composite(im); out.append(bg.convert('RGB'))
        bg=Image.new('RGBA',im.size,(20,20,40,255)); bg.alpha_composite(im); out.append(bg.convert('RGB'))
    s=Image.new('RGB',(sum(o.width for o in out)//2,550)); x=0
    for o in out: s.paste(o.resize((307,550)),(x,0)); x+=307
    s.save('cut_test.jpg')
