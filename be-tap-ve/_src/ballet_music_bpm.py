import numpy as np, subprocess, sys, json
def load(f, sr=11025):
    raw=subprocess.run(['ffmpeg','-loglevel','error','-i',f,'-ac','1','-ar',str(sr),'-f','f32le','-'],capture_output=True).stdout
    return np.frombuffer(raw,np.float32), sr
def analyze(f, lo=55, hi=110):
    x,sr=load(f); hop=256; n=1024
    frames=np.lib.stride_tricks.sliding_window_view(x,n)[::hop]*np.hanning(n)
    S=np.abs(np.fft.rfft(frames,axis=1)); S=np.log1p(S*10)
    flux=np.maximum(0,np.diff(S,axis=0)).sum(1); flux=(flux-flux.mean())/ (flux.std()+1e-9)
    fps=sr/hop
    ac=np.correlate(flux,flux,'full')[len(flux)-1:]
    lags=np.arange(len(ac)); bpms=60*fps/np.maximum(lags,1)
    m=(bpms>=lo)&(bpms<=hi); best=lags[m][np.argmax(ac[m])]
    # refine
    bpm=60*fps/best
    # phase: beat offset maximizing flux sum
    period=fps*60/bpm; ph=np.arange(0,period,0.5)
    sc=[flux[np.round(np.arange(p,len(flux)-1,period)).astype(int)].sum() for p in ph]
    off=ph[int(np.argmax(sc))]/fps
    # beat strength regularity
    strength=max(sc)/ (np.mean(sc)+1e-9)
    return round(float(bpm),2), round(float(off),3), round(float(strength),2), round(len(x)/sr,1)
if __name__=="__main__":
    for f in sys.argv[1:]: print(f, analyze(f))
def refine(f, bpm0):
    x,sr=load(f); hop=128; n=1024
    frames=np.lib.stride_tricks.sliding_window_view(x,n)[::hop]*np.hanning(n)
    S=np.log1p(np.abs(np.fft.rfft(frames,axis=1))*10); flux=np.maximum(0,np.diff(S,axis=0)).sum(1)
    flux=np.convolve(flux,np.hanning(5),'same'); fps=sr/hop; best=(-1,0,0)
    for bpm in np.arange(bpm0-1.5,bpm0+1.5,0.02):
        per=fps*60/bpm
        for p in np.arange(0,per,1.0):
            idx=np.round(np.arange(p,len(flux)-1,per)).astype(int); sc=flux[idx].mean()
            if sc>best[0]: best=(sc,bpm,p/fps)
    return round(best[1],3), round(best[2],3), round(best[0]/flux.mean(),2)
