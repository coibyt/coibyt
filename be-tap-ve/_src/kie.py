# generic kie.ai runner: python kie.py jobs.json [keys...]; jobs: {key:{prompt, model?, refs?:[keys or urls], size?}}
import json, time, urllib.request, sys, os
API="https://api.kie.ai/api/v1/jobs"
H={"Authorization":"Bearer dummy","Content-Type":"application/json"}
URLS='urls_master.json'
urls=json.load(open(URLS)) if os.path.exists(URLS) else {}
def post(j):
    model=j.get('model','google/nano-banana')
    refs=[urls.get(r,r) for r in j.get('refs',[])]
    if any(not r.startswith('http') for r in refs): raise RuntimeError('missing ref '+str(j.get('refs')))
    inp={"prompt":j['prompt'],"output_format":"png"}
    if model=='nano-banana-pro':
        inp={"prompt":j['prompt'],"image_input":refs,"aspect_ratio":j.get('size','1:1'),"resolution":j.get('res','2K'),"output_format":"png"}
    elif refs:
        model='google/nano-banana-edit'; inp["image_urls"]=refs; inp["image_size"]=j.get('size','auto')
    else: inp["image_size"]=j.get('size','1:1')
    body=json.dumps({"model":model,"input":inp}).encode()
    r=json.load(urllib.request.urlopen(urllib.request.Request(API+"/createTask",body,H),timeout=60))
    if not r.get('data'): raise RuntimeError(str(r))
    return r["data"]["taskId"]
def info(t):
    return json.load(urllib.request.urlopen(urllib.request.Request(API+"/recordInfo?taskId="+t,headers=H),timeout=60))["data"]
jobs=json.load(open(sys.argv[1]))
only=sys.argv[2:] or [k for k in jobs if not os.path.exists(k+'.png')]
pending={}
for k in only:
    for a in range(8):
        try: pending[k]=post(jobs[k]); break
        except Exception as e:
            print('retry',k,str(e)[:80],flush=True)
            if 'missing ref' in str(e): break
            time.sleep(15)
    time.sleep(4)
print("submitted",len(pending),flush=True)
for _ in range(200):
    for k,t in list(pending.items()):
        try: d=info(t)
        except Exception as e: continue
        if d["state"]=="success":
            url=json.loads(d["resultJson"])["resultUrls"][0]
            urllib.request.urlretrieve(url,k+".png"); urls[k]=url
            import fcntl, os
            with open(URLS+'.lock','w') as lk:
                fcntl.flock(lk,fcntl.LOCK_EX)
                cur=json.load(open(URLS)) if os.path.exists(URLS) else {}
                cur[k]=url; json.dump(cur,open(URLS+'.tmp','w'),indent=1); os.replace(URLS+'.tmp',URLS)
                fh=json.load(open('urls.json')); fh[k]=url; json.dump(fh,open('urls.json','w'),indent=1)
            print("ok",k,flush=True); del pending[k]
        elif d["state"]=="fail":
            print("FAIL",k,d.get("failMsg"),flush=True); del pending[k]
    if not pending: break
    time.sleep(6)
print("left",list(pending))
