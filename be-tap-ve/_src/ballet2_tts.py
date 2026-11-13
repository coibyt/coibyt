import json,os,sys,subprocess,concurrent.futures as cf
sys.path.insert(0,'/home/user/coibyt/be-tap-ve/_src')
os.environ['MAX11_API_KEY']='proxy-injected'
import tts_models as T
miss=json.load(open('miss.json'))
J={'t_'+T.fnv(t):(t,'vi','trang_slow') for t in miss}
out='raw_voice'; os.makedirs(out,exist_ok=True)
V='/home/user/coibyt/be-tap-ve/be-tap-ve-voice/'
with cf.ThreadPoolExecutor(3) as ex:
    for k,res in ex.map(lambda k: T.one(k,J,out), list(J)):
        print(k,res,flush=True)
        if os.path.exists(f'{out}/{k}.mp3'):
            subprocess.run(['ffmpeg','-y','-loglevel','error','-i',f'{out}/{k}.mp3','-af','loudnorm','-ac','1','-ar','16000','-b:a','24k',V+k+'.mp3'])
