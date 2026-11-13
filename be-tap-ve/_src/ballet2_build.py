# pack: be-tap-ve-ballet.js (v2)
import json, io, base64, os, numpy as np
from PIL import Image
from scipy import ndimage as nd
L='L2/'; FULL=os.environ.get('BALLET_FULL','full/')
meta=json.load(open(L+'meta.json'))
POSES=['arabesque','arm1','arm2','arm5','attitude','feet2','feet5','final','passe','pirouette','pirprep','plie','portbras','ready','releve','reverence','saute','tendu']
CP=['ready','releve','tendu','passe','arabesque','portbras','pirouette','final','reverence']
def uri(im,q=82,lossless=False):
    b=io.BytesIO(); im.save(b,'WEBP',quality=q,method=6,lossless=lossless); return 'data:image/webp;base64,'+base64.b64encode(b.getvalue()).decode()
def mask_uri(arr):  # small grey mask → lossy webp is fine for soft masks
    return uri(Image.fromarray(arr.astype(np.uint8),'RGB'),70)
def T(k): return [round(float(v),3) for v in meta['T_'+k]]
pk={'v':2,'size':[645,1156],'poses':{},'hair':{},'T':{},'costumes':{},'acc':{},'bg':{},'teacher':{}}
for p in POSES:
    pk['poses'][p]=uri(Image.open(L+f'b_{p}.png'),82)
    h=np.asarray(Image.open(L+f'bh_{p}.png')); pk['hair'][p]=mask_uri(np.dstack([h*0,h,h*0]))
    pk['T'][p]=T(p)
for c in ['pink','swan','fairy']:
    pk['costumes'][c]={}
    for p in CP:
        pk['costumes'][c][p]=[uri(Image.open(L+f'c_{c}_{p}.png'),82),mask_uri(np.asarray(Image.open(L+f'cm_{c}_{p}.png').convert('RGB'))),T(f'{c}_{p}')]
# accessories in the "ready" frame
W,H=645,1156
def to_ready(img,box,Tk):
    cx0,cy0,cx1,cy1,rot,s=Tk
    a=np.zeros((H,W,4),np.float32); x,y,w,h=box; a[y:y+h,x:x+w]=np.asarray(img.convert('RGBA')).astype(np.float32)
    # output pixel p (ready) samples pose pixel p' = s R (p-c0) + c1
    yy,xx=np.mgrid[0:H,0:W]; px=xx-cx0; py=yy-cy0; cr,sr=np.cos(rot),np.sin(rot)
    qx=cx1+s*(cr*px-sr*py); qy=cy1+s*(sr*px+cr*py)
    out=np.dstack([nd.map_coordinates(a[...,k],[qy,qx],order=1) for k in range(4)])
    return out
for name,c,p in [('tiara','pink','ready'),('feather','swan','releve'),('flowers','fairy','ready'),('crown','plum','ready')]:
    k=f'hp_{c}_{p}'; im=Image.open(L+k+'.png'); arr=to_ready(im,meta[k],T(f'{c}_{p}'))
    lum=arr[...,:3].mean(2); arr[...,3]*=np.clip((lum-70)/45,0,1); al=arr[...,3]>8; lab,n=nd.label(nd.binary_dilation(al,iterations=3))
    if n:
        sz=nd.sum(al,lab,range(1,n+1)); kk=np.zeros(n+1,bool); kk[1:]=sz>0.2*sz.max(); arr[...,3]*=kk[lab]
    ys,xs=np.nonzero(arr[...,3]>6); y0,y1,x0,x1=ys.min(),ys.max()+1,xs.min(),xs.max()+1
    pk['acc'][name]=[int(x0),int(y0),int(x1-x0),int(y1-y0),uri(Image.fromarray(np.clip(arr[y0:y1,x0:x1],0,255).astype(np.uint8),'RGBA'),88)]
    Image.fromarray(np.clip(arr[y0:y1,x0:x1],0,255).astype(np.uint8),'RGBA').save(f'acc_{name}.png')
for k in ['studio','stage','dress']:
    im=Image.open(FULL+f'bg_{k}.png').convert('RGB'); im.thumbnail((720,1280),Image.LANCZOS); pk['bg'][k]=uri(im,72)
for k in ['talk','clap','show']:
    im=Image.open(FULL+f'tch_{k}.png').convert('RGB'); im=im.crop((int(im.width*0.08),0,int(im.width*0.92),int(im.height*0.66))); im.thumbnail((360,400),Image.LANCZOS); pk['teacher'][k]=uri(im,80)
js='/* Studio Sáng Tạo Nhí – Lớp học Ba lê (ảnh tạo bằng kie.ai). */\nwindow.BTV_BALLET='+json.dumps(pk,separators=(',',':'))+';\n'
open('be-tap-ve-ballet.js','w').write(js)
print('KB',len(js)//1024, {k:len(json.dumps(v))//1024 for k,v in pk.items() if isinstance(v,dict)})
