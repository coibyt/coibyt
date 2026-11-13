import json, io, base64, os
from PIL import Image
SP='/tmp/claude-0/-home-user/859cbca1-b083-5edf-a4c9-db8129f9ac09/scratchpad/'; FS=SP+'fs/'
meta=json.load(open(FS+'L/meta.json')); P=json.load(open(SP+'ballet_poses.json'))
def uri(im,q=84):
    b=io.BytesIO(); im.save(b,'WEBP',quality=q,method=6); return 'data:image/webp;base64,'+base64.b64encode(b.getvalue()).decode()
pk={'size':meta['bp_ready_size'],'poses':{},'costumes':{},'bg':{},'teacher':{}}
for p in P: pk['poses'][p]=uri(Image.open(FS+f'L/bp_{p}_base.png').convert('RGBA'),84)
for k,r in meta.items():
    if '.' in k and k.split('.')[0] in P and k.split('.')[1] in ('pink','swan','fairy') and os.path.exists(FS+f'L/{k}.png'):
        p,c=k.split('.'); pk['costumes'].setdefault(c,{})[p]=r+[uri(Image.open(FS+f'L/{k}.png').convert('RGBA'),84)]
for k in ['studio','stage','dress']:
    im=Image.open(FS+f'bg_{k}.png').convert('RGB'); im.thumbnail((640,1140),Image.LANCZOS); pk['bg'][k]=uri(im,70)
for k in ['talk','clap','show']:
    f=FS+f'tch_{k}.png'
    if os.path.exists(f): im=Image.open(f).convert('RGB'); im=im.crop((int(im.width*0.08),0,int(im.width*0.92),int(im.height*0.66))); im.thumbnail((360,400),Image.LANCZOS); pk['teacher'][k]=uri(im,80)
js='/* Studio Sáng Tạo Nhí – Lớp học Ba lê (ảnh tạo bằng kie.ai). */\nwindow.BTV_BALLET='+json.dumps(pk,separators=(',',':'))+';\n'
open(SP+'be-tap-ve-ballet.js','w').write(js)
print('ballet pack',len(js)//1024,'KB','costumes',{c:len(v) for c,v in pk['costumes'].items()},'teacher',list(pk['teacher']))
