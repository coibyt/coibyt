# Lớp học Ba lê – curriculum (also exported to JS)
LEVELS=[
 {'id':1,'name':'Làm quen','icon':'🌱','lessons':[
  {'id':'l1','title':'Chào lớp học','steps':[
    {'pose':'ready','say':'Chào bé! Cô là cô Vy, cô giáo dạy múa ba lê. Hôm nay mình cùng học những bước múa đầu tiên nhé!','t':'show'},
    {'pose':'ready','say':'Đầu tiên, bé đứng thật thẳng, kéo cao cổ như chú thiên nga, vai thả lỏng, bụng hóp nhẹ.','count':8},
    {'pose':'reverence','from':'ready','say':'Trong ba lê, mình luôn cúi chào trước và sau buổi học. Động tác này gọi là Rê-vê-răng, nghĩa là cúi chào.','term':['Révérence','Cúi chào'],'count':4}]},
  {'id':'l2','title':'Vị trí chân thứ nhất','steps':[
    {'pose':'ready','say':'Hai gót chân chạm nhau, mũi chân mở ra hai bên như chữ V. Đây là vị trí chân thứ nhất.','term':['Première position','Vị trí thứ nhất'],'count':8},
    {'pose':'ready','say':'Hai tay để thấp trước người, cong tròn như ôm một quả bóng nhỏ. Tư thế tay này gọi là Bra-ba.','term':['Bras bas','Tay thấp'],'count':4}]},
  {'id':'l3','title':'Tay thứ nhất và thứ hai','steps':[
    {'pose':'arm1','from':'ready','say':'Nâng tay lên trước bụng, tròn như ôm một quả bóng to. Đây là vị trí tay thứ nhất.','count':4},
    {'pose':'arm2','from':'arm1','say':'Bây giờ mở tay sang hai bên, khuỷu tay hơi cong thật mềm mại. Đây là vị trí tay thứ hai.','count':4},
    {'pose':'ready','from':'arm2','say':'Đưa tay về thấp thật chậm. Giỏi lắm!','count':4}]}]},
 {'id':2,'name':'Cơ bản','icon':'⭐','lessons':[
  {'id':'l4','title':'Tay thứ năm, chân thứ hai','steps':[
    {'pose':'arm5','from':'arm1','say':'Đưa hai tay lên cao trên đầu, tròn như một chiếc vương miện. Đây là vị trí tay thứ năm.','count':4},
    {'pose':'feet2','say':'Vị trí chân thứ hai: hai chân mở rộng bằng vai, mũi chân vẫn mở ra ngoài, tay mở sang hai bên.','term':['Seconde position','Vị trí thứ hai'],'count':8}]},
  {'id':'l5','title':'Plié – Nhún gối','steps':[
    {'pose':'plie','from':'ready','swing':1,'say':'Pli-ê nghĩa là nhún gối. Bé từ từ khuỵu gối ra hai bên, lưng vẫn thẳng, gót chân không nhấc lên.','term':['Plié','Nhún gối'],'count':8},
    {'pose':'ready','from':'plie','swing':1,'say':'Rồi đứng lên thật chậm. Nhún xuống hai nhịp, đứng lên hai nhịp nhé!','count':8}]},
  {'id':'l6','title':'Relevé – Kiễng chân','steps':[
    {'pose':'releve','from':'ready','swing':1,'say':'Rơ-lơ-vê nghĩa là nâng lên. Bé kiễng gót chân lên thật cao, tay đưa lên vị trí thứ năm.','term':['Relevé','Nâng lên'],'count':8},
    {'pose':'releve','say':'Giữ thăng bằng nhé! Mắt nhìn thẳng về phía trước, bụng hóp lại.','count':8}]}]},
 {'id':3,'name':'Trung cấp','icon':'🌸','lessons':[
  {'id':'l7','title':'Tendu – Duỗi chân','steps':[
    {'pose':'tendu','from':'ready','swing':1,'say':'Tăng-đuy nghĩa là duỗi. Bé trượt mũi chân sang bên, duỗi thật thẳng, mũi chân vẫn chạm sàn.','term':['Tendu','Duỗi chân'],'count':8},
    {'pose':'ready','from':'tendu','say':'Rồi kéo chân về vị trí thứ nhất. Làm thật chậm và đẹp nhé!','count':4}]},
  {'id':'l8','title':'Passé – Co chân','steps':[
    {'pose':'passe','from':'ready','say':'Pa-xê: bé co một chân lên, mũi chân chạm cạnh đầu gối chân kia, giống hình số bốn.','term':['Passé','Co chân'],'count':8}]},
  {'id':'l9','title':'Đưa tay & chân thứ năm','steps':[
    {'pose':'portbras','from':'arm2','say':'Pô-đơ-bra nghĩa là đưa tay. Bé đưa tay mềm mại qua đầu và nghiêng người nhẹ như cành liễu trong gió.','term':['Port de bras','Đưa tay'],'count':8},
    {'pose':'feet5','say':'Vị trí chân thứ năm: đặt gót chân trước sát mũi chân sau, hai chân bắt chéo khít nhau. Vị trí này khó, bé tập từ từ nhé.','term':['Cinquième position','Vị trí thứ năm'],'count':8}]}]},
 {'id':4,'name':'Nâng cao','icon':'👑','lessons':[
  {'id':'l10','title':'Arabesque & Attitude','steps':[
    {'pose':'arabesque','from':'ready','say':'A-ra-bét: đứng trên một chân, chân kia duỗi thẳng ra phía sau, hai tay vươn dài như cánh chim.','term':['Arabesque','Duỗi chân sau'],'count':8},
    {'pose':'attitude','from':'arabesque','say':'A-ti-tuýt: giống A-ra-bét nhưng chân sau co lại một chút thật duyên dáng, tay đưa lên cao.','term':['Attitude','Co chân sau'],'count':8}]},
  {'id':'l11','title':'Sauté – Bật nhảy','steps':[
    {'pose':'plie','from':'ready','say':'Mình chuẩn bị nhún gối thật mềm.','count':2},
    {'pose':'saute','from':'plie','swing':1,'anim':'jump','say':'Xô-tê nghĩa là nhảy. Bé bật nhảy lên thật nhẹ, mũi chân duỗi, rồi tiếp đất mềm bằng cách nhún gối.','term':['Sauté','Bật nhảy'],'count':8}]},
  {'id':'l12','title':'Pirouette – Xoay vòng','steps':[
    {'pose':'pirprep','from':'ready','say':'Chuẩn bị: chân thứ tư, nhún gối, tay ở vị trí thứ nhất.','count':4},
    {'pose':'pirouette','from':'pirprep','anim':'spin','say':'Pi-ru-ét là xoay tròn. Bé kiễng một chân, co chân kia lên đầu gối và xoay một vòng. Mắt nhìn một điểm để không chóng mặt nhé!','term':['Pirouette','Xoay tròn'],'count':8}]}]},
 {'id':5,'name':'Biểu diễn','icon':'🏆','lessons':[
  {'id':'l13','title':'Bài múa Thiên nga nhỏ','show':1,'steps':[
    {'pose':'reverence','say':'Chào khán giả!','count':4},{'pose':'releve','say':'Kiễng chân, tay lên cao!','count':4},
    {'pose':'tendu','say':'Duỗi chân!','count':4},{'pose':'passe','say':'Co chân!','count':4},
    {'pose':'arabesque','say':'A-ra-bét!','count':4},{'pose':'portbras','say':'Đưa tay mềm mại!','count':4},
    {'pose':'pirouette','anim':'spin','say':'Xoay tròn!','count':4},{'pose':'final','say':'Tạo dáng thật đẹp!','count':4},
    {'pose':'reverence','say':'Cúi chào nào!','count':4}]}]},
]
COUNTS=['Một','Hai','Ba','Bốn','Năm','Sáu','Bảy','Tám']
LINES=['Bé làm theo cô nhé!','Mình đếm nhịp nào!','Bé làm tốt lắm!','Hoàn thành bài học! Bé nhận được ba ngôi sao!','Bé đã mở khóa cấp độ mới!',
 'Chào mừng bé đến lớp học ba lê! Bé chọn một bài học nhé!','Phòng thay đồ đây! Bé chọn bộ váy múa thật đẹp nhé!','Mời bé lên sân khấu biểu diễn!',
 'Bé múa đẹp quá! Cả khán phòng vỗ tay kìa!','Bé bật gương tập để nhìn mình múa nhé!','Từ điển ba lê đây! Chạm vào để nghe cô đọc nhé!',
 'Bài này chưa mở, bé học xong bài trước nhé!','Bộ váy này đẹp quá!','Bé chọn màu cho chiếc váy nhé!',
 'Lớp học ba lê là nơi cô Vy dạy bé múa từng bước, từ dễ đến khó. Bé còn được mặc váy tutu và biểu diễn trên sân khấu nữa!',
 'Hôm nay cô gợi ý bé chơi Lớp học Ba lê nhé!']
def fnv(t):
    h=0x811c9dc5
    for b in t.encode('utf-8'):
        h^=b; h=(h*0x01000193)&0xffffffff
    return f'{h:08x}'
def all_lines():
    L=[]
    for lv in LEVELS:
        for ls in lv['lessons']:
            for st in ls['steps']:
                L.append(st['say'])
                if 'term' in st: L.append(f"{st['term'][0]}, nghĩa là {st['term'][1].lower()}.")
    return L+LINES
def jobs():
    J={}
    for t in all_lines(): J['t_'+fnv(t)]=(t,'vi','trang_slow')
    for i,c in enumerate(COUNTS): J[f'bc_{i+1}']=(c+'!','vi','trang_slow')
    return J
if __name__=='__main__': print(len(jobs()))
