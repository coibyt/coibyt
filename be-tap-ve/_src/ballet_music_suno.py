import json,urllib.request,time,sys,os
H={"Authorization":"Bearer dummy","Content-Type":"application/json"}
JOBS={
 'count':{"style":"classical ballet class piano, solo grand piano, steady 4/4, 72 bpm, clear downbeats, elegant, Tchaikovsky style, studio recording","title":"Barre Exercise"},
 'bg':{"style":"gentle classical ballet music for a children's ballet class, solo piano with soft strings and harp, calm, dreamy, Nutcracker inspired, slow, background music","title":"Ballet Studio Morning"},
 'jump':{"style":"allegro ballet class piano accompaniment, solo grand piano, bouncy steady 4/4, 84 bpm, light and joyful, for small jumps","title":"Petit Allegro"},
 'stage':{"style":"grand orchestral ballet performance, Swan Lake inspired, strings, harp, oboe, majestic and magical, steady 4/4 at 72 bpm","title":"Little Swan Performance"},
}
tasks=json.load(open('tasks.json')) if os.path.exists('tasks.json') else {'count':'b91b2726bf6757cafc14f6dac192d8ed'}
for k,j in JOBS.items():
    if k in tasks: continue
    body=dict(customMode=True,instrumental=True,model="V4_5",callBackUrl="https://example.com/cb",**j)
    r=json.load(urllib.request.urlopen(urllib.request.Request("https://api.kie.ai/api/v1/generate",json.dumps(body).encode(),H),timeout=60)); tasks[k]=r['data']['taskId']; time.sleep(4)
json.dump(tasks,open('tasks.json','w'))
left=dict(tasks)
for _ in range(120):
    for k,t in list(left.items()):
        d=json.load(urllib.request.urlopen(urllib.request.Request("https://api.kie.ai/api/v1/generate/record-info?taskId="+t,headers=H),timeout=60))['data']
        st=d.get('status')
        if st=='SUCCESS':
            for i,s in enumerate(d['response']['sunoData']):
                urllib.request.urlretrieve(s['audioUrl'],f'{k}_{i}.mp3'); print(k,i,round(s.get('duration',0)),flush=True)
            del left[k]
        elif st and 'FAIL' in st or st=='SENSITIVE_WORD_ERROR': print('FAIL',k,st,d.get('errorMessage'),flush=True); del left[k]
    if not left: break
    time.sleep(15)
print('left',left)
