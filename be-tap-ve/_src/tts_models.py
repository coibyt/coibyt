# Per-model voices via 11max (ElevenLabs). Key from env only (proxy-injected).
import os, sys, time, json, re, requests, concurrent.futures as cf
SP='/tmp/claude-0/-home-user/859cbca1-b083-5edf-a4c9-db8129f9ac09/scratchpad/'
KEY=os.environ['MAX11_API_KEY'].strip(); API="https://api.11max.id.vn"; H={"xi-api-key":KEY}
VOICES={'sarah':'EXAVITQu4vr4xnSDxMaL','laura':'FGY2WhTYpPnrIDTdsKH5','liam':'TX3LPaxmHKxFdv7VOQHJ','jessica':'cgSgspJ2msm6clMCkdW9','will':'bIHbv24MWmeRgasZH58o',
 'matilda':'XrExE9yKIg1WjnnlVkGX','charlie':'IKne3meq5aSn9XLyUdCD','aria':'9BWtsMINqrJLrRacOk9x','chris':'iP95p4xoKVk53GoZ742B','alice':'Xb7hH8MSUJpSbSDYk0k2',
 'eric':'cjVigY5qzO86Huf0OWal','brian':'nPczCjzI2devNBz1zQrb','lily':'pFZP5JQG7iQjIQuC4Bku','bill':'pqHfZKP75CyZ1pMS4oZo','george':'JBFqnCBsd6RMkjVDRZzb','trang':'HAAKLJlaJeGl18MKHYeg','sarah_slow':'EXAVITQu4vr4xnSDxMaL','trang_slow':'HAAKLJlaJeGl18MKHYeg'}
def fnv(t):
    h=0x811c9dc5
    for b in t.encode('utf-8'):
        h^=b; h=(h*0x01000193)&0xffffffff
    return f'{h:08x}'
def jobs():
    src=open(SP+'models.js').read(); J={}
    for m in re.finditer(r"\['(\w+)', '([^']+)', (\d+), '(\w)', '(\w+)', '(\w+)', '(\w+)', '([^']+)', '([^']+)', \"([^\"]+)\"\]",src):
        mid,name,age,sex,tpl,grp,voice,pr,vi,en=m.groups()
        J[f'mi_{mid}_vi']=(vi,'vi',voice); J[f'mi_{mid}_en']=(en,'en',voice)
        P=pr[0].upper()+pr[1:]; you='con' if pr in('cô','chú') else 'cháu' if pr in('bà','ông') else 'em' if pr in('chị','anh') else 'bạn'
        for i,t in enumerate(['Đẹp quá đi!',f'{P} thích bộ này lắm!',f'Cảm ơn {you} nhé!',f'Trông {pr} thế nào?']): J[f'mr_{mid}_{i}']=(t,'vi',voice)
    W={'ag_toddler':('Em bé','Toddler','Taapero'),'ag_kid':('Bạn nhỏ','Child','Lapsi'),'ag_teen':('Tuổi teen','Teenager','Teini'),'ag_adult':('Người lớn','Adult','Aikuinen'),
       'ag_senior':('Ông bà','Grandparents','Isovanhemmat'),'fs_suit':('Bộ vest','Suit','Puku'),'fs_aodaim':('Áo dài nam','Ao dai','Ao dai'),'fs_office':('Đồ công sở','Office outfit','Toimistoasu'),
       'fs_oxfords':('Giày tây','Dress shoes','Juhlakengät'),'fs_party_t':('Đồ dự tiệc','Party outfit','Juhla-asu'),'fs_swim_m':('Đồ bơi','Swimwear','Uima-asu'),
       'fs_cardigan':('Áo len cardigan','Cardigan','Neuletakki'),'fs_silkdress':('Váy lụa dự tiệc','Silk dress','Silkkimekko'),'fs_evening':('Váy dạ hội','Evening gown','Iltapuku')}
    for k,(vi,en,fi) in W.items():
        J[f'w_{k}_vi']=(vi,'vi','sarah'); J[f'w_{k}_en']=(en,'en','sarah'); J[f'w_{k}_fi']=(fi,'fi','sarah')
    s=open(SP+'src_index.html').read()
    lines=['Người mẫu chưa có quần áo phù hợp, bé chọn thêm nhé!','Chưa tải được người mẫu, bé kiểm tra mạng rồi thử lại nhé!',
           'Chào mừng đến xưởng thời trang! Ở đây có hai mươi tư người mẫu, bé chọn một bạn nhé!','Bây giờ bé chọn quần áo cho người mẫu nhé!']
    lines+=re.findall(r"(?:ask|tip): '([^']*)'",s)
    for t in lines: J['t_'+fnv(t)]=(t,'vi','sarah')
    return J
def one(k,J,out):
    text,lang,voice=J[k]
    if os.path.exists(f'{out}/{k}.mp3'): return k,'skip'
    body={"text":text,"model_id":"eleven_flash_v2_5","language_code":lang,"output_format":"mp3_22050_32",
          "voice_settings":{"stability":0.6 if voice.endswith('_slow') else 0.5,"similarity_boost":0.75,"speed":0.7 if voice=='sarah_slow' else 0.85 if voice=='trang_slow' else 0.95}}
    s=requests.Session()
    for attempt in range(6):
        try:
            r=s.post(f"{API}/v1/text-to-speech/{VOICES[voice]}",headers=H,json=body,timeout=90)
            if r.status_code==429: time.sleep(10+attempt*10); continue
            if r.status_code>=300: raise RuntimeError(f"{r.status_code} {r.text[:160].replace(KEY,'***')}")
            if 'audio' in r.headers.get('content-type',''): data=r.content
            else:
                task=r.json()['id']; data=None
                for _ in range(90):
                    time.sleep(2); d=s.get(f"{API}/v1/history/{task}",headers=H,timeout=60).json()
                    if d.get('status')=='completed': data=s.get(d['result']['audio_url'],timeout=120).content; break
                    if d.get('status')=='failed': raise RuntimeError('failed '+str(d.get('error')))
                if data is None: raise RuntimeError('timeout')
            open(f'{out}/{k}.mp3','wb').write(data); return k,'ok'
        except Exception as e:
            err=str(e).replace(KEY,'***')
            if attempt==5: return k,'ERR '+err
            time.sleep(4+attempt*4)
if __name__=='__main__':
    import importlib
    J=importlib.import_module(os.environ['JOBS']).jobs() if os.environ.get('JOBS') else jobs(); out=SP+os.environ.get('OUT','mtts'); os.makedirs(out,exist_ok=True)
    only=sys.argv[1:] or list(J)
    print(len(J),flush=True)
    with cf.ThreadPoolExecutor(3) as ex:
        for k,res in ex.map(lambda k: one(k,J,out), only): print(k,res,flush=True)
