# Build be-tap-ve/index.html from _src/src_index.html + _src/assets.json (run from anywhere).
import json, re, os
H=os.path.dirname(os.path.abspath(__file__))
s=open(os.path.join(H,'src_index.html')).read(); a=json.load(open(os.path.join(H,'assets.json')))
blob=json.dumps(a,separators=(',',':'))
s=re.sub(r'/\*ASSETS:BEGIN\*/.*?/\*ASSETS:END\*/', lambda m:'/*ASSETS:BEGIN*/'+blob+'/*ASSETS:END*/', s, flags=re.S)
open(os.path.join(H,'..','index.html'),'w').write(s); print('index.html', len(s))
