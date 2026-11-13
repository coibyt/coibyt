# kie.ai video jobs (Kling 2.1 pro, start/end frame): python kie_video.py vjobs.json [keys]
# job: {key: {prompt, start: key-or-url, end?: key-or-url, duration?: "5"|"10", model?}}  → key.mp4 ; urls in urls_master.json
import json, time, urllib.request, sys, os
API="https://api.kie.ai/api/v1/jobs"; H={"Authorization":"Bearer dummy","Content-Type":"application/json"}
urls=json.load(open('urls_master.json')) if os.path.exists('urls_master.json') else {}
jobs=json.load(open(sys.argv[1])); only=sys.argv[2:] or [k for k in jobs if not os.path.exists(k+'.mp4')]
def post(j):
    inp={"prompt":j['prompt'],"image_url":urls.get(j['start'],j['start']),"duration":j.get('duration','5'),
         "negative_prompt":j.get('neg',"blur, distort, extra limbs, deformed hands, camera movement, zoom, cut, text"),"cfg_scale":j.get('cfg',0.5)}
    if j.get('end'): inp["tail_image_url"]=urls.get(j['end'],j['end'])
    r=json.load(urllib.request.urlopen(urllib.request.Request(API+"/createTask",json.dumps({"model":j.get('model','kling/v2-1-pro'),"input":inp}).encode(),H),timeout=60))
    if not r.get('data'): raise RuntimeError(str(r)[:300])
    return r["data"]["taskId"]
pend={}
for k in only:
    for a in range(5):
        try: pend[k]=post(jobs[k]); break
        except Exception as e: print('retry',k,str(e)[:200],flush=True); time.sleep(15)
    time.sleep(5)
print('submitted',len(pend),flush=True)
for _ in range(400):
    for k,t in list(pend.items()):
        try: d=json.load(urllib.request.urlopen(urllib.request.Request(API+"/recordInfo?taskId="+t,headers=H),timeout=60))["data"]
        except Exception: continue
        if d["state"]=="success":
            u=json.loads(d["resultJson"])["resultUrls"][0]; urllib.request.urlretrieve(u,k+'.mp4'); print('ok',k,flush=True); del pend[k]
        elif d["state"]=="fail": print('FAIL',k,d.get('failMsg'),flush=True); del pend[k]
    if not pend: break
    time.sleep(10)
print('left',list(pend))
