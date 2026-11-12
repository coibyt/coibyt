// FILE SINH TỰ ĐỘNG bởi tool/en_templates.py --dart (bản dịch ở tool/en_translations.py) — đừng sửa tay.
//
// Mẫu đề tiếng Việt → mẫu đề tiếng Anh. Chỗ trống: {N} số, {F} phân số, {P} tên, {W} số viết bằng chữ.
library;

const Map<String, String> kEnglishPromptTemplates = {
  '? + {F} = {F}':
      '? + {F} = {F}',
  '? + {N} = {N}':
      '? + {N} = {N}',
  '? - {N} = {N}':
      '? − {N} = {N}',
  '? × {F} = {F}':
      '? × {F} = {F}',
  '? × {N} = {F}':
      '? × {N} = {F}',
  'Ba lớp {N}A, {N}B, {N}C quyên góp được lần lượt {N}, {N}, {N} quyển sách. Hỏi trung bình mỗi lớp quyên góp được bao nhiêu quyển sách?':
      'Three classes, {N}A, {N}B and {N}C, donated {N}, {N} and {N} books. On average, how many books did each class donate?',
  'Biểu thức nào bằng {N} × {N}?':
      'Which expression equals {N} × {N}?',
  'Bác Ba thu hoạch được {N} yến cam và {N} yến bưởi. Hỏi bác Ba thu hoạch được tất cả bao nhiêu ki-lô-gam cam và bưởi?':
      'Uncle Ba harvested {N} yến of oranges and {N} yến of pomelos. How many kilograms of oranges and pomelos did he harvest altogether?',
  'Bạn {P} có nhiều hơn bạn {P} {N} nhãn vở. Số nhãn vở của {P} gấp {N} lần số nhãn vở của {P}. Hỏi bạn {P} có bao nhiêu nhãn vở?':
      '{0} has {2} more stickers than {1}. {3} has {4} times as many stickers as {5}. How many stickers does {6} have?',
  'Bạn {P} đọc thuộc một bài thơ hết {N} phút {N} giây. Hỏi {P} đọc bài thơ hết bao nhiêu giây?':
      '{0} recited a poem in {1} minutes {2} seconds. How many seconds did it take {3}?',
  'Bể thứ nhất có {N} l nước. Bể thứ hai có nhiều hơn bể thứ nhất {N} l. Bể thứ ba có ít hơn bể thứ hai {N} l. Hỏi cả ba bể có bao nhiêu lít nước?':
      'Tank one has {N} l of water. Tank two has {N} l more than tank one. Tank three has {N} l less than tank two. How many liters of water are in the three tanks?',
  'Chiều cao (cm) của các bạn trong tổ {N}:\n{P}: {N}, {P}: {N}, {P}: {N}, {P}: {N}, {P}: {N}.\nAi (hoặc nhóm nào) có số liệu lớn nhất?':
      'Heights (cm) of the children in group {N}:\n{P}: {N}, {P}: {N}, {P}: {N}, {P}: {N}, {P}: {N}.\nWho has the largest number?',
  'Chiều cao (cm) của các bạn trong tổ {N}: {N}, {N}, {N}, {N}, {N}.\nDãy số liệu có mấy số? Số thứ {N} là số nào?':
      'Heights (cm) of the children in group {N}: {N}, {N}, {N}, {N}, {N}.\nHow many numbers are in the data? What is number {N}?',
  'Chiều cao của {N} bạn lần lượt là {N}, {N}, {N} cm. Hỏi trung bình mỗi bạn cao bao nhiêu xăng-ti-mét?':
      'The heights of {N} children are {N}, {N} and {N} cm. What is their average height in centimeters?',
  'Chiều cao của {N} bạn lần lượt là {N}, {N}, {N}, {N} cm. Hỏi trung bình mỗi bạn cao bao nhiêu xăng-ti-mét?':
      'The heights of {N} children are {N}, {N}, {N} and {N} cm. What is their average height in centimeters?',
  'Chu vi P của hình chữ nhật có chiều dài a, chiều rộng b là P = (a + b) × {N}. Tính P với a = {N} cm, b = {N} cm.':
      'The perimeter P of a rectangle with length a and width b is P = (a + b) × {N}. Find P when a = {N} cm and b = {N} cm.',
  'Chu vi P của hình vuông có cạnh a được tính theo công thức P = a × {N}. Tính chu vi hình vuông có cạnh a = {N} cm.':
      'The perimeter P of a square with side a is P = a × {N}. Find the perimeter of a square with side a = {N} cm.',
  'Chạm vào một phép tính, rồi chạm vào kết quả đúng của nó.':
      'Tap a calculation, then tap its correct answer.',
  'Chữ số thứ {N} tính từ trái của số {N} là chữ số {N}. Giá trị của nó là bao nhiêu?':
      'Digit number {N} from the left of {N} is {N}. What is its value?',
  'Con trâu nặng {N} tạ {N} kg. Hỏi con trâu nặng bao nhiêu ki-lô-gam?':
      'A buffalo weighs {N} quintals {N} kg. How many kilograms does it weigh?',
  'Con đường thứ nhất dài {N} m, con đường thứ hai ngắn hơn con đường thứ nhất {N} m. Hỏi con đường thứ hai dài bao nhiêu mét?':
      'Road one is {N} m long. Road two is {N} m shorter than road one. How long is road two in meters?',
  'Cách tính thuận tiện nhất cho {N} + {N} + {N} là:':
      'The easiest way to calculate {N} + {N} + {N} is:',
  'Cách tính thuận tiện nhất cho {N} × {N} × {N} là:':
      'The easiest way to calculate {N} × {N} × {N} is:',
  'Cân nặng (kg) của các bạn trong nhóm:\n{P}: {N}, {P}: {N}, {P}: {N}, {P}: {N}, {P}: {N}.\nAi (hoặc nhóm nào) có số liệu lớn nhất?':
      'Weights (kg) of the children in the group:\n{P}: {N}, {P}: {N}, {P}: {N}, {P}: {N}, {P}: {N}.\nWho has the largest number?',
  'Cân nặng (kg) của các bạn trong nhóm: {N}, {N}, {N}, {N}, {N}.\nDãy số liệu có mấy số? Số thứ {N} là số nào?':
      'Weights (kg) of the children in the group: {N}, {N}, {N}, {N}, {N}.\nHow many numbers are in the data? What is number {N}?',
  'Cây cầu nào dài nhất?\nCầu Sông Hồng: dài {N} m\nCầu Sông Mã: dài {N} m\nCầu Sông Lam: dài {N} m':
      'Which bridge is the longest?\nSong Hong Bridge: {N} m long\nSong Ma Bridge: {N} m long\nSong Lam Bridge: {N} m long',
  'Có bao nhiêu số tự nhiên lớn hơn {N} và bé hơn {N}?':
      'How many whole numbers are greater than {N} and less than {N}?',
  'Có {F} kg kẹo chia đều vào {N} túi. Hỏi mỗi túi có bao nhiêu ki-lô-gam kẹo?':
      '{F} kg of sweets are shared equally into {N} bags. How many kilograms of sweets are in each bag?',
  'Có {N} cái bánh chia đều cho {N} bạn. Hỏi mỗi bạn được bao nhiêu phần của cái bánh?':
      '{N} cakes are shared equally among {N} children. What fraction of a cake does each child get?',
  'Có {N} học sinh đi tham quan. Mỗi xe chở được {N} học sinh. Hỏi cần ít nhất bao nhiêu xe để chở hết số học sinh?':
      '{N} pupils go on a trip. Each bus carries {N} pupils. What is the smallest number of buses needed for all the pupils?',
  'Có {N} quyển sách chia đều cho {N} thư viện. Sau đó mỗi thư viện được tặng thêm {N} quyển. Hỏi lúc này mỗi thư viện có bao nhiêu quyển sách?':
      '{N} books are shared equally among {N} libraries. Then each library gets {N} more books. How many books does each library have now?',
  'Có {N} quyển vở được chia đều cho {N} bạn. Hỏi mỗi bạn được bao nhiêu quyển vở?':
      '{N} notebooks are shared equally among {N} children. How many notebooks does each child get?',
  'Cửa hàng có {N} hộp bút, mỗi hộp {N} chiếc. Buổi sáng cửa hàng bán được {N} hộp và thêm {N} chiếc lẻ. Hỏi cửa hàng còn lại bao nhiêu chiếc bút?':
      'A shop has {N} boxes of pens, {N} pens in each box. In the morning it sells {N} boxes and {N} single pens. How many pens are left?',
  'Diện tích mặt bàn học của em khoảng:':
      'The area of your school desk top is about:',
  'Diện tích mặt một chiếc tem thư khoảng:':
      'The area of a postage stamp is about:',
  'Dân số của một tỉnh năm {N} là {W} người. Viết số đó.':
      'In {N}, the population of a province was {W}. Write this number in digits.',
  'Dãy phố có các nhà mang số chẵn liên tiếp từ số {N} đến số {N}. Hỏi dãy phố đó có bao nhiêu nhà?':
      'A street has houses with consecutive even numbers from {N} to {N}. How many houses are there?',
  'Dùng cả {N} chữ số {N}, {N}, {N}, {N}, {N}, mỗi chữ số một lần, để viết số có {N} chữ số.':
      'Use all {N} digits {N}, {N}, {N}, {N}, {N}, each once, to write {N}-digit numbers.',
  'Dùng cả {N} chữ số {N}, {N}, {N}, {N}, {N}, {N}, mỗi chữ số một lần, để viết số có {N} chữ số.':
      'Use all {N} digits {N}, {N}, {N}, {N}, {N}, {N}, each once, to write {N}-digit numbers.',
  'Dùng cả {N} chữ số {N}, {N}, {N}, {N}, {N}, {N}, {N}, mỗi chữ số một lần, để viết số có {N} chữ số.':
      'Use all {N} digits {N}, {N}, {N}, {N}, {N}, {N}, {N}, each once, to write {N}-digit numbers.',
  'Dùng cả {N} chữ số {N}, {N}, {N}, {N}, {N}, {N}, {N}, {N}, mỗi chữ số một lần, để viết số có {N} chữ số.':
      'Use all {N} digits {N}, {N}, {N}, {N}, {N}, {N}, {N}, {N}, each once, to write {N}-digit numbers.',
  'Gieo xúc xắc {N} lần, kết quả: mặt {N} chấm xuất hiện {N} lần, mặt {N} chấm xuất hiện {N} lần, mặt {N} chấm xuất hiện {N} lần. Kéo số lần vào đúng chỗ.':
      'A dice was rolled {N} times: {N} dots came up {N} times, {N} dots came up {N} times, {N} dots came up {N} times. Drag each number of times to the right place.',
  'Giá sách thứ nhất có {N} quyển sách, giá sách thứ hai có {N} quyển sách. Phải chuyển bao nhiêu quyển sách từ giá sách thứ nhất sang giá sách thứ hai để số quyển sách ở hai giá sách bằng nhau?':
      'Shelf one has {N} books and shelf two has {N} books. How many books must move from shelf one to shelf two so both shelves have the same number?',
  'Giá trị của biểu thức (a + b) × {N} với a = {N}, b = {N} là:':
      'The value of the expression (a + b) × {N} when a = {N} and b = {N} is:',
  'Giá trị của biểu thức (a - b) × c với a = {N}, b = {N}, c = {N} là:':
      'The value of the expression (a − b) × c when a = {N}, b = {N} and c = {N} is:',
  'Giá trị của biểu thức ({N} + {N}) × {N} là:':
      'The value of the expression ({N} + {N}) × {N} is:',
  'Giá trị của biểu thức a × b - c với a = {N}, b = {N}, c = {N} là:':
      'The value of the expression a × b − c when a = {N}, b = {N} and c = {N} is:',
  'Giá trị của chữ số {N} (chữ số thứ {N} tính từ trái) trong số {N} là:':
      'The value of the digit {N} (digit number {N} from the left) in {N} is:',
  'Góc có số đo {N}° là:':
      'An angle of {N}° is:',
  'Góc nào lớn nhất?\ngóc A: {N}°, góc B: {N}°, góc C: {N}°, góc D: {N}°':
      'Which angle is the largest?\nangle A: {N}°, angle B: {N}°, angle C: {N}°, angle D: {N}°',
  'Hai bạn {P} và {P} có tất cả {N} viên bi. Số bi của {P} gấp {N} lần số bi của {P}. Hỏi {P} có bao nhiêu viên bi?':
      '{P} and {P} have {N} marbles altogether. {P} has {N} times as many marbles as {P}. How many marbles does {P} have?',
  'Hai kho có tất cả {N} kg gạo. Số gạo ở kho thứ hai gấp {N} lần số gạo ở kho thứ nhất. Hỏi kho thứ hai có bao nhiêu ki-lô-gam gạo?':
      'Two storehouses have {N} kg of rice altogether. Storehouse two has {N} times as much rice as storehouse one. How many kilograms of rice are in storehouse two?',
  'Hai lớp {N}A và {N}B trồng được {N} cây. Lớp {N}A trồng được nhiều hơn lớp {N}B {N} cây. Hỏi mỗi lớp trồng được bao nhiêu cây?':
      'Classes {0}A and {1}B planted {2} trees. Class {3}A planted {5} more trees than class {4}B. How many trees did each class plant?',
  'Hai số có tổng là {N}, hiệu là {N}. Hai số đó là:':
      'Two numbers have a sum of {N} and a difference of {N}. The two numbers are:',
  'Hai số tự nhiên liên tiếp hơn kém nhau mấy đơn vị?':
      'Two consecutive whole numbers differ by how many units?',
  'Hai thùng có tất cả {N} l nước. Thùng to có số nước gấp {N} lần thùng nhỏ. Hỏi thùng to có bao nhiêu lít nước?':
      'Two barrels hold {N} l of water altogether. The big barrel holds {N} times as much as the small one. How many liters are in the big barrel?',
  'Hai đường thẳng vuông góc tạo thành mấy góc vuông chung đỉnh? Hình chữ nhật có mấy cặp cạnh song song?':
      'Two perpendicular lines make how many right angles at their crossing point? How many pairs of parallel sides does a rectangle have?',
  'Hai đường thẳng vuông góc với nhau tạo thành mấy góc vuông?':
      'How many right angles do two perpendicular lines make?',
  'Hiện nay tổng số tuổi của mẹ và con là {N} tuổi, mẹ hơn con {N} tuổi. Hỏi {N} năm nữa con bao nhiêu tuổi?':
      'Now, mother and child are {N} years old altogether, and mother is {N} years older. How old will the child be in {N} years?',
  'Hình bình hành ABCD có AB = {N} cm, BC = {N} cm. Tính chu vi hình bình hành đó.':
      'Parallelogram ABCD has AB = {N} cm and BC = {N} cm. Find its perimeter.',
  'Hình chữ nhật ABCD: nối mỗi câu với cạnh đúng.':
      'Rectangle ABCD: match each sentence with the correct side.',
  'Hình chữ nhật EGHK: nối mỗi câu với cạnh đúng.':
      'Rectangle EGHK: match each sentence with the correct side.',
  'Hình chữ nhật MNPQ: nối mỗi câu với cạnh đúng.':
      'Rectangle MNPQ: match each sentence with the correct side.',
  'Hình chữ nhật OEBK có chiều dài {N} cm, chiều rộng {N} cm. Tính diện tích hình chữ nhật đó.':
      'Rectangle OEBK is {N} cm long and {N} cm wide. Find its area.',
  'Hình chữ nhật có bao nhiêu góc vuông?':
      'How many right angles does a rectangle have?',
  'Hình nào có hai cặp cạnh đối diện song song?':
      'Which shape has two pairs of parallel opposite sides?',
  'Hình thoi MNPQ có cạnh MN = {N} cm. Tính chu vi hình thoi đó.':
      'Rhombus MNPQ has side MN = {N} cm. Find its perimeter.',
  'Hình thoi có đặc điểm nào sau đây?':
      'Which of these is true about a rhombus?',
  'Hình vuông có bao nhiêu góc vuông?':
      'How many right angles does a square have?',
  'Hình vuông có phải là hình thoi không?':
      'Is a square a rhombus?',
  'Khi đo góc, tâm của thước đo góc đặt trùng với:':
      'When you measure an angle, the center of the protractor goes on:',
  'Kho thứ nhất có {N} kg gạo, kho thứ hai có nhiều hơn kho thứ nhất {N} kg gạo. Hỏi cả hai kho có bao nhiêu ki-lô-gam gạo?':
      'Storehouse one has {N} kg of rice. Storehouse two has {N} kg more than storehouse one. How many kilograms of rice are in both storehouses?',
  'Kho thứ nhất có {N} kg thóc. Kho thứ hai có nhiều hơn kho thứ nhất {N} kg. Kho thứ ba có ít hơn kho thứ hai {N} kg. Hỏi cả ba kho có bao nhiêu ki-lô-gam thóc?':
      'Storehouse one has {N} kg of paddy. Storehouse two has {N} kg more than storehouse one. Storehouse three has {N} kg less than storehouse two. How many kilograms of paddy are in the three storehouses?',
  'Kéo các số vào ô trống theo thứ tự từ bé đến lớn: {N}, {N}, {N}, {N}.':
      'Drag the numbers into the boxes from smallest to largest: {N}, {N}, {N}, {N}.',
  'Kéo các số đo vào ô trống theo thứ tự từ bé đến lớn: {N} dm², {N} cm², {N} dm², {N} cm².':
      'Drag the measurements into the boxes from smallest to largest: {N} dm², {N} cm², {N} dm², {N} cm².',
  'Kéo các số đo vào ô trống theo thứ tự từ bé đến lớn: {N} giây, {N} giây, {N} giây, {N} giây.':
      'Drag the measurements into the boxes from smallest to largest: {N} seconds, {N} seconds, {N} seconds, {N} seconds.',
  'Kéo các số đo vào ô trống theo thứ tự từ bé đến lớn: {N} kg, {N} kg, {N} kg, {N} kg.':
      'Drag the measurements into the boxes from smallest to largest: {N} kg, {N} kg, {N} kg, {N} kg.',
  'Kéo các số đo vào ô trống theo thứ tự từ bé đến lớn: {N} kg, {N} kg, {N} kg, {N} tấn.':
      'Drag the measurements into the boxes from smallest to largest: {N} kg, {N} kg, {N} kg, {N} tonnes.',
  'Kéo các số đo vào ô trống theo thứ tự từ bé đến lớn: {N} kg, {N} kg, {N} tấn, {N} kg.':
      'Drag the measurements into the boxes from smallest to largest: {N} kg, {N} kg, {N} tonnes, {N} kg.',
  'Kéo các số đo vào ô trống theo thứ tự từ bé đến lớn: {N} m², {N} dm², {N} m², {N} m².':
      'Drag the measurements into the boxes from smallest to largest: {N} m², {N} dm², {N} m², {N} m².',
  'Kéo các số đo vào ô trống theo thứ tự từ bé đến lớn: {N} tạ, {N} kg, {N} kg, {N} kg.':
      'Drag the measurements into the boxes from smallest to largest: {N} quintals, {N} kg, {N} kg, {N} kg.',
  'Kéo giá trị đúng của biểu thức vào mỗi ô trống.':
      'Drag the correct value of each expression into the box.',
  'Kéo giá trị đúng vào sau mỗi biểu thức.':
      'Drag the correct value after each expression.',
  'Kéo kết quả đúng (đã rút gọn) vào mỗi ô trống.':
      'Drag the correct simplified answer into each box.',
  'Kéo phân số thích hợp vào ô trống.':
      'Drag the correct fraction into the box.',
  'Kéo số làm tròn đúng vào mỗi ô trống.':
      'Drag the correct rounded number into each box.',
  'Kéo số thích hợp vào ô trống để tìm số lớn khi biết tổng {N} và hiệu {N}.':
      'Drag the numbers into the boxes to find the bigger number when the sum is {N} and the difference is {N}.',
  'Kéo số thích hợp vào ô trống để tìm số trung bình cộng.':
      'Drag the numbers into the boxes to find the average.',
  'Kéo số thích hợp vào ô trống để tính nhanh {N} × {N} × {N}.':
      'Drag the numbers into the boxes to work out {N} × {N} × {N} quickly.',
  'Kéo số thích hợp vào ô trống.':
      'Drag the correct numbers into the boxes.',
  'Kéo số vào ô trống để được các phân số bằng nhau.':
      'Drag the numbers into the boxes to make equal fractions.',
  'Kéo số vào ô trống để được cách tính thuận tiện.':
      'Drag the numbers into the boxes to find the easiest way to calculate.',
  'Kéo số vào ô trống: {N} × {N} = {N} × {N} + {N} × □ = □ + □ = □':
      'Drag the numbers into the boxes: {N} × {N} = {N} × {N} + {N} × □ = □ + □ = □',
  'Kéo số đo thích hợp vào mỗi ô trống.':
      'Drag the correct measurement into each box.',
  'Kéo thẻ số thích hợp vào chỗ trống trong dãy số:':
      'Drag the correct number cards into the gaps in the sequence:',
  'Kéo thẻ số đúng vào mỗi ô trống.':
      'Drag the correct number card into each box.',
  'Kết quả của phép tính {N} + {N} là:':
      'The result of {N} + {N} is:',
  'Kết quả của phép tính {N} - {N} là:':
      'The result of {N} − {N} is:',
  'Kết quả của phép tính {N} : {N} là:':
      'The result of {N} ÷ {N} is:',
  'Kết quả của phép tính {N} × {N} là:':
      'The result of {N} × {N} is:',
  'Kết quả của {N} + {N} khoảng bao nhiêu?':
      'About how much is {N} + {N}?',
  'Làm tròn các thừa số đến hàng chục để ước lượng tích {N} × {N}.':
      'Round the factors to the nearest ten to estimate the product {N} × {N}.',
  'Làm tròn số {N} đến hàng chục nghìn ta được số:':
      '{N} rounded to the nearest ten thousand is:',
  'Làm tròn số {N} đến hàng nghìn ta được số:':
      '{N} rounded to the nearest thousand is:',
  'Làm tròn số {N} đến hàng trăm nghìn ta được số:':
      '{N} rounded to the nearest hundred thousand is:',
  'Làm tròn số {N} đến hàng trăm nghìn.':
      'Round {N} to the nearest hundred thousand.',
  'Lúc {N} giờ đúng, kim giờ và kim phút của đồng hồ tạo thành:':
      'At exactly {N} o\'clock, the hour hand and the minute hand make:',
  'Lớp {N}A có {N} học sinh, trong đó {F} số học sinh thích đọc truyện tranh. Hỏi lớp {N}A có bao nhiêu học sinh thích đọc truyện tranh?':
      'Class {N}A has {N} pupils, and {F} of them like reading comics. How many pupils in class {N}A like reading comics?',
  'Mua {N} quyển vở hết {N} đồng. Hỏi mua {N} quyển vở như thế hết bao nhiêu tiền?':
      '{N} notebooks cost {N} dong. How much do {N} notebooks like these cost?',
  'Mẹ cắt một chiếc bánh thành {N} phần bằng nhau. Cả nhà đã ăn {N} phần. Phân số chỉ phần bánh còn lại là bao nhiêu?':
      'Mum cuts a cake into {N} equal pieces. The family has eaten {N} pieces. What fraction of the cake is left?',
  'Mẹ đưa {P} {N} đồng đi mua đồ dùng học tập. {P} mua {N} quyển vở, mỗi quyển giá {N} đồng và {N} chiếc bút, mỗi chiếc giá {N} đồng. Hỏi {P} còn lại bao nhiêu tiền?':
      'Mum gives {P} {N} dong for school things. {P} buys {N} notebooks at {N} dong each and {N} pens at {N} dong each. How much money does {P} have left?',
  'Mỗi bao gạo nặng {N} kg. Hỏi {N} bao gạo như thế nặng bao nhiêu ki-lô-gam?':
      'A bag of rice weighs {N} kg. How many kilograms do {N} bags like this weigh?',
  'Mỗi bạn tung đồng xu {N} lần. Nối số lần mặt sấp với số lần mặt ngửa tương ứng.':
      'Each child tosses a coin {N} times. Match the number of heads with the matching number of tails.',
  'Mỗi chai chứa {F} l nước cam. Hỏi {N} chai như thế chứa bao nhiêu lít nước cam?':
      'Each bottle holds {F} l of orange juice. How many liters do {N} bottles like this hold?',
  'Mỗi cuốn truyện giá {N} đồng. {P} muốn mua {N} cuốn và mang theo {N} đồng. Ước lượng xem {P} có đủ tiền không?':
      'Each storybook costs {N} dong. {P} wants to buy {N} books and has {N} dong. Estimate: does {P} have enough money?',
  'Mỗi kho có {N} kg gạo nếp và {N} kg gạo tẻ. Hỏi {N} kho như thế có tất cả bao nhiêu ki-lô-gam gạo?':
      'Each storehouse has {N} kg of sticky rice and {N} kg of plain rice. How many kilograms of rice are in {N} storehouses like this?',
  'Mỗi ngày một nhà máy may được {N} chiếc áo. Hỏi trong {N} ngày nhà máy đó may được bao nhiêu chiếc áo?':
      'A factory sews {N} shirts each day. How many shirts does it sew in {N} days?',
  'Mỗi thùng có {N} hộp sữa. Hỏi {N} thùng như thế có bao nhiêu hộp sữa?':
      'Each crate has {N} boxes of milk. How many boxes of milk are in {N} crates like this?',
  'Mỗi xe tải chở {N} kg xi măng. Hỏi {N} xe tải như thế chở được bao nhiêu ki-lô-gam xi măng?':
      'Each truck carries {N} kg of cement. How many kilograms of cement do {N} trucks like this carry?',
  'Một bể nước đang chứa {F} bể. Người ta dùng hết {F} bể. Hỏi trong bể còn lại bao nhiêu phần bể nước?':
      'A water tank is {F} full. People use {F} of the tank. What fraction of the tank is left?',
  'Một chiếc bánh được chia thành {N} phần bằng nhau, đã tô màu {N} phần. Viết phân số chỉ phần đã tô màu.':
      'A cake is cut into {N} equal parts and {N} parts are colored. Write the fraction for the colored part.',
  'Một chiếc xe khách có {N} chỗ ngồi. Hỏi {N} chiếc xe như thế có bao nhiêu chỗ ngồi?':
      'A coach has {N} seats. How many seats do {N} coaches like this have?',
  'Một con voi trưởng thành nặng khoảng:':
      'An adult elephant weighs about:',
  'Một con đường dài {N} m được chia thành {N} đoạn dài bằng nhau để sửa. Hỏi mỗi đoạn đường dài bao nhiêu mét?':
      'A road {N} m long is divided into {N} equal parts for repair. How long is each part in meters?',
  'Một công ty cần làm {N} chiếc khẩu trang, đã làm được {N} chiếc. Hỏi công ty còn phải làm bao nhiêu chiếc khẩu trang nữa?':
      'A company needs to make {N} face masks and has made {N}. How many more masks must it make?',
  'Một cửa hàng có {N} kg gạo, đã bán {F} số gạo đó. Hỏi cửa hàng còn lại bao nhiêu ki-lô-gam gạo?':
      'A shop has {N} kg of rice and has sold {F} of it. How many kilograms of rice are left?',
  'Một cửa hàng có {N} kg gạo. Ngày thứ nhất bán {F} số gạo. Ngày thứ hai bán {F} số gạo còn lại. Hỏi cửa hàng còn lại bao nhiêu ki-lô-gam gạo?':
      'A shop has {N} kg of rice. On day one it sells {F} of the rice. On day two it sells {F} of the rice that is left. How many kilograms of rice are left?',
  'Một góc bẹt được chia thành ba góc. Góc thứ nhất bằng {N}°, góc thứ hai gấp {N} lần góc thứ nhất. Hỏi góc thứ ba bằng bao nhiêu độ và là góc gì?':
      'A straight angle is split into three angles. Angle one is {N}° and angle two is {N} times angle one. How many degrees is angle three, and what kind of angle is it?',
  'Một góc bẹt được chia thành hai góc. Một góc có số đo {N}°. Hỏi góc còn lại có số đo bao nhiêu độ?':
      'A straight angle is split into two angles. One angle is {N}°. How many degrees is the other angle?',
  'Một góc vuông được chia thành hai góc. Một góc có số đo {N}°. Hỏi góc còn lại có số đo bao nhiêu độ?':
      'A right angle is split into two angles. One angle is {N}°. How many degrees is the other angle?',
  'Một hình chữ nhật có chu vi {N} cm, chiều dài hơn chiều rộng {N} cm. Tính diện tích hình chữ nhật đó.':
      'A rectangle has a perimeter of {N} cm, and its length is {N} cm more than its width. Find its area.',
  'Một hình tròn được chia thành {N} phần bằng nhau, đã tô màu {N} phần. Viết phân số chỉ phần đã tô màu.':
      'A circle is cut into {N} equal parts and {N} parts are colored. Write the fraction for the colored part.',
  'Một kho có {N} kg thóc. Người ta đã chở đi {N} xe, mỗi xe chở {N} kg thóc. Hỏi trong kho còn lại bao nhiêu ki-lô-gam thóc?':
      'A storehouse has {N} kg of paddy. {N} trucks took some away, {N} kg each. How many kilograms of paddy are left?',
  'Một khung ảnh hình bình hành có chu vi {N} cm, một cạnh dài {N} cm. Tính độ dài cạnh còn lại.':
      'A parallelogram photo frame has a perimeter of {N} cm. One side is {N} cm long. Find the length of the other side.',
  'Một miếng bìa gồm một hình chữ nhật dài {N} cm, rộng {N} cm và một hình vuông cạnh {N} cm ghép sát nhau (không chồng lên nhau). Tính diện tích miếng bìa.':
      'A card is made of a rectangle {N} cm long and {N} cm wide and a square with side {N} cm, placed side by side (not overlapping). Find the area of the card.',
  'Một mảnh vườn hình chữ nhật có chiều dài {N} m, chiều rộng {N} m. Hỏi diện tích mảnh vườn bằng bao nhiêu đề-xi-mét vuông?':
      'A rectangular garden is {N} m long and {N} m wide. What is its area in square decimeters?',
  'Một mảnh vườn hình chữ nhật có chu vi {N} m, chiều dài hơn chiều rộng {N} m. Tính diện tích mảnh vườn.':
      'A rectangular garden has a perimeter of {N} m, and its length is {N} m more than its width. Find the area of the garden.',
  'Một ngôi trường được xây dựng năm {N}. Đến năm {N} thì ngôi trường đó đã được xây dựng bao nhiêu năm?':
      'A school was built in {N}. By {N}, how many years had it been since the school was built?',
  'Một nhà máy có {N} xưởng, mỗi xưởng làm được {N} chiếc bút. Nhà máy còn nhập thêm {N} chiếc bút. Hỏi nhà máy có tất cả bao nhiêu chiếc bút?':
      'A factory has {N} workshops, each making {N} pens. The factory also buys {N} more pens. How many pens does the factory have altogether?',
  'Một nhà máy may được {N} chiếc áo trong {N} ngày, số áo may được mỗi ngày như nhau. Hỏi mỗi ngày nhà máy may được bao nhiêu chiếc áo?':
      'A factory sews {N} shirts in {N} days, the same number each day. How many shirts does it sew each day?',
  'Một thửa ruộng thu hoạch được {N} kg thóc gồm thóc nếp và thóc tẻ. Số thóc tẻ nhiều hơn thóc nếp {N} kg. Hỏi mỗi loại có bao nhiêu ki-lô-gam?':
      'A rice field gives {N} kg of paddy, sticky and plain. There are {N} kg more plain paddy than sticky paddy. How many kilograms of each kind are there?',
  'Một trang trại nuôi {N} con gà. Làm tròn số đó đến hàng trăm nghìn thì trang trại nuôi khoảng bao nhiêu con gà?':
      'A farm keeps {N} chickens. Rounded to the nearest hundred thousand, about how many chickens does the farm keep?',
  'Một tỉnh có {N} người, trong đó có {N} người sống ở thành thị. Hỏi tỉnh đó có bao nhiêu người sống ở nông thôn?':
      'A province has {N} people, and {N} of them live in towns. How many people live in the countryside?',
  'Một vòng quay có ba ô: Gấu, Thỏ, Mèo. Quay {N} lần, kim dừng ở ô Gấu {N} lần, ô Thỏ {N} lần. Hỏi kim dừng ở ô Mèo bao nhiêu lần?':
      'A spinner has three parts: Bear, Rabbit and Cat. It is spun {N} times. It stops on Bear {N} times and on Rabbit {N} times. How many times does it stop on Cat?',
  'Một xe tải chở được khoảng:':
      'A truck can carry about:',
  'Một xe tải chở được {N} tấn hàng. Trên xe đã có {N} bao gạo, mỗi bao nặng {N} kg. Hỏi xe còn chở thêm được bao nhiêu ki-lô-gam hàng?':
      'A truck can carry {N} tonnes. There are already {N} bags of rice on it, {N} kg each. How many more kilograms can the truck carry?',
  'Ngày thứ nhất bác Tư sơn được {F} bức tường, ngày thứ hai sơn được {F} bức tường. Hỏi cả hai ngày bác sơn được bao nhiêu phần bức tường?':
      'On day one, Uncle Tu painted {F} of a wall. On day two, he painted {F} of the wall. What fraction of the wall did he paint in the two days?',
  'Ngày thứ nhất cửa hàng bán được {N} kg gạo. Ngày thứ hai bán được nhiều hơn ngày thứ nhất {N} kg. Ngày thứ ba bán được gấp {N} lần ngày thứ hai. Hỏi cả ba ngày cửa hàng bán được bao nhiêu ki-lô-gam gạo?':
      'On day one, a shop sells {N} kg of rice. On day two it sells {N} kg more than on day one. On day three it sells {N} times as much as on day two. How many kilograms of rice does it sell in the three days?',
  'Người ta lát nền một căn phòng bằng {N} viên gạch hình vuông cạnh {N} cm. Hỏi căn phòng có diện tích bao nhiêu đề-xi-mét vuông?':
      'A room floor is covered with {N} square tiles, each with sides of {N} cm. What is the area of the room in square decimeters?',
  'Người ta xếp {N} quả trứng vào các khay, mỗi khay {N} quả. Hỏi xếp được bao nhiêu khay?':
      '{N} eggs are put into trays, {N} eggs in each tray. How many trays are filled?',
  'Nhà trường mua {N} bộ bàn ghế, mỗi bộ giá {N} đồng và {N} bảng tên, mỗi chiếc giá {N} đồng. Hỏi nhà trường phải trả tất cả bao nhiêu tiền?':
      'A school buys {N} desk sets at {N} dong each and {N} name boards at {N} dong each. How much does the school pay altogether?',
  'Năm nay một nhà máy làm được {N} viên gạch. Năm ngoái làm được ít hơn năm nay {N} viên gạch. Hỏi năm ngoái nhà máy làm được bao nhiêu viên gạch?':
      'This year a factory made {N} bricks. Last year it made {N} fewer bricks than this year. How many bricks did it make last year?',
  'Năm ngoái một tỉnh trồng được {N} cây xanh, năm nay trồng được {N} cây xanh. Hỏi cả hai năm tỉnh đó trồng được bao nhiêu cây xanh?':
      'Last year a province planted {N} trees, and this year it planted {N} trees. How many trees did it plant in the two years?',
  'Năm thứ nhất một nông trường thu hoạch được {N} kg cà phê. Năm thứ hai thu hoạch được nhiều hơn năm thứ nhất {N} kg. Hỏi năm thứ hai thu hoạch được bao nhiêu ki-lô-gam cà phê?':
      'In year one, a farm harvested {N} kg of coffee. In year two it harvested {N} kg more than in year one. How many kilograms of coffee did it harvest in year two?',
  'Năm vừa qua một nhà máy sản xuất được {W} viên gạch. Viết số đó.':
      'Last year a factory made {W} bricks. Write this number in digits.',
  'Năm {N} thuộc thế kỉ nào?':
      'Which century is the year {N} in?',
  'Nối hai phân số bằng nhau.':
      'Match the equal fractions.',
  'Nối mỗi biểu thức với giá trị của nó.':
      'Match each expression with its value.',
  'Nối mỗi câu với kết quả đúng (rút về đơn vị).':
      'Match each sentence with the correct answer (find the value of one part first).',
  'Nối mỗi câu với kết quả đúng.':
      'Match each sentence with the correct answer.',
  'Nối mỗi câu với số đúng.':
      'Match each sentence with the correct number.',
  'Nối mỗi câu với tổng của các số đó.':
      'Match each sentence with the total of those numbers.',
  'Nối mỗi cặp số với dấu >, < hoặc = thích hợp.':
      'Match each pair of numbers with the correct sign >, < or =.',
  'Nối mỗi cặp số với số trung bình cộng của chúng.':
      'Match each pair of numbers with its average.',
  'Nối mỗi cặp tổng – hiệu với số lớn tương ứng.':
      'Match each sum and difference with the bigger number.',
  'Nối mỗi giá trị của a với giá trị của biểu thức (a + {N}) × {N}.':
      'Match each value of a with the value of the expression (a + {N}) × {N}.',
  'Nối mỗi giá trị của a với giá trị của biểu thức a + {N}.':
      'Match each value of a with the value of the expression a + {N}.',
  'Nối mỗi giá trị của a với giá trị của biểu thức a × {N} + {N}.':
      'Match each value of a with the value of the expression a × {N} + {N}.',
  'Nối mỗi giá trị của a với giá trị của biểu thức a × {N}.':
      'Match each value of a with the value of the expression a × {N}.',
  'Nối mỗi phân số với nhận xét đúng.':
      'Match each fraction with the correct description.',
  'Nối mỗi phân số với phân số tối giản bằng nó.':
      'Match each fraction with its simplest equal fraction.',
  'Nối mỗi phân số với tử số và mẫu số của nó.':
      'Match each fraction with its numerator and denominator.',
  'Nối mỗi phép chia với phân số bằng thương của nó.':
      'Match each division with the fraction equal to its quotient.',
  'Nối mỗi phép tính với kết quả (đã rút gọn).':
      'Match each calculation with its simplified answer.',
  'Nối mỗi phép tính với kết quả ước lượng (làm tròn đến hàng trăm).':
      'Match each calculation with its estimate (rounded to the nearest hundred).',
  'Nối mỗi phép tính với kết quả.':
      'Match each calculation with its answer.',
  'Nối mỗi số với cách đọc đúng của số đó.':
      'Match each number with the way it is read.',
  'Nối mỗi số với số làm tròn của nó.':
      'Match each number with its rounded number.',
  'Nối mỗi số đo bên trái với số đo bằng nó.':
      'Match each measurement on the left with the equal measurement.',
  'Nối mỗi số đo với tên góc.':
      'Match each measurement with the name of the angle.',
  'Nối mỗi tích với tích bằng nó.':
      'Match each product with the equal product.',
  'Nối mỗi đặc điểm với tên hình.':
      'Match each description with the name of the shape.',
  'Nửa chu vi một hình chữ nhật là {N} m, chiều dài hơn chiều rộng {N} m. Tính chiều dài và chiều rộng.':
      'Half the perimeter of a rectangle is {N} m, and its length is {N} m more than its width. Find the length and the width.',
  'Phân số nào bằng phân số {F}?':
      'Which fraction is equal to {F}?',
  'Phân số nào bằng thương của phép chia {N} : {N}?':
      'Which fraction is equal to the quotient of {N} ÷ {N}?',
  'Phân số nào dưới đây là phân số tối giản?':
      'Which fraction below is in simplest form?',
  'Phân số {F} rút gọn thành phân số tối giản là:':
      '{F} simplified to its simplest form is:',
  'Phân số {W} viết là:':
      'The fraction “{W}” is written as:',
  'Phép tính nào có kết quả lớn nhất?':
      'Which calculation has the largest result?',
  'Quan sát biểu đồ cột “Số cây các tổ trồng được”. Kéo tên vào ô trống theo thứ tự từ cột cao nhất đến cột thấp nhất.':
      'Look at the bar chart “Trees planted by each group”. Drag the names into the boxes from the tallest bar to the shortest bar.',
  'Quan sát biểu đồ cột “Số cây các tổ trồng được”. Tất cả có bao nhiêu cây?':
      'Look at the bar chart “Trees planted by each group”. How many trees are there altogether?',
  'Quan sát biểu đồ cột “Số cây các tổ trồng được”. Tổ {N} có bao nhiêu cây?':
      'Look at the bar chart “Trees planted by each group”. How many trees did group {N} plant?',
  'Quan sát biểu đồ cột “Số học sinh thích mỗi môn thể thao”. Nối mỗi cột với số liệu của nó.':
      'Look at the bar chart “Pupils who like each sport”. Match each bar with its number.',
  'Quan sát biểu đồ cột “Số lượt mượn sách mỗi ngày”. Cột nào cao nhất?':
      'Look at the bar chart “Library books borrowed each day”. Which bar is the tallest?',
  'Quan sát biểu đồ cột “Số lượt mượn sách mỗi ngày”. Nối mỗi cột với số liệu của nó.':
      'Look at the bar chart “Library books borrowed each day”. Match each bar with its number.',
  'Quan sát biểu đồ cột “Số lượt mượn sách mỗi ngày”. Thứ Ba có bao nhiêu lượt?':
      'Look at the bar chart “Library books borrowed each day”. How many books were borrowed on Tuesday?',
  'Quan sát biểu đồ cột “Số lượt mượn sách mỗi ngày”. Thứ Tư có bao nhiêu lượt?':
      'Look at the bar chart “Library books borrowed each day”. How many books were borrowed on Wednesday?',
  'Quan sát biểu đồ cột “Số lượt mượn sách mỗi ngày”. Tất cả có bao nhiêu lượt?':
      'Look at the bar chart “Library books borrowed each day”. How many books were borrowed altogether?',
  'Quan sát biểu đồ cột “Số sách các lớp quyên góp”. Cột nào thấp nhất?':
      'Look at the bar chart “Books donated by each class”. Which bar is the shortest?',
  'Quan sát biểu đồ cột “Số sách các lớp quyên góp”. Kéo tên vào ô trống theo thứ tự từ cột cao nhất đến cột thấp nhất.':
      'Look at the bar chart “Books donated by each class”. Drag the names into the boxes from the tallest bar to the shortest bar.',
  'Quan sát biểu đồ cột “Số sách các lớp quyên góp”. {N}D có bao nhiêu quyển?':
      'Look at the bar chart “Books donated by each class”. How many books did class {N}D donate?',
  'Quy đồng mẫu số hai phân số {F} và {F} (mẫu số chung là {N}).':
      'Give the fractions {F} and {F} a common denominator (the common denominator is {N}).',
  'Quy đồng mẫu số hai phân số {F} và {F} ta được:':
      'Giving {F} and {F} a common denominator, we get:',
  'Quy đồng mẫu số hai phân số {F} và {F}.':
      'Give the fractions {F} and {F} a common denominator.',
  'Quãng đường từ nhà bác Ba đến thị trấn dài {N} m. Làm tròn số đo đó đến hàng trăm nghìn thì quãng đường dài khoảng bao nhiêu mét?':
      'The road from Uncle Ba\'s house to the town is {N} m long. Rounded to the nearest hundred thousand, about how many meters is it?',
  'Rút gọn phân số {F} thành phân số tối giản.':
      'Simplify the fraction {F} to its simplest form.',
  'Rút gọn rồi tính, nối mỗi phép tính với kết quả tối giản.':
      'Simplify, then calculate, and match each calculation with its simplest answer.',
  'Rổ thứ nhất có {N} quả cam, rổ thứ hai có {N} quả cam. Phải chuyển bao nhiêu quả cam từ rổ thứ nhất sang rổ thứ hai để số quả cam ở hai rổ bằng nhau?':
      'Basket one has {N} oranges and basket two has {N} oranges. How many oranges must move from basket one to basket two so both baskets have the same number?',
  'Sân vận động có {N} khán giả đến xem bóng đá. Làm tròn số đó đến hàng trăm nghìn thì có khoảng bao nhiêu khán giả?':
      '{N} fans came to watch a football match. Rounded to the nearest hundred thousand, about how many fans were there?',
  'Sắp xếp các bước vẽ đường thẳng đi qua điểm E và song song với đường thẳng AB:':
      'Put the steps in order to draw a line through point E that is parallel to line AB:',
  'Sắp xếp các bước vẽ đường thẳng đi qua điểm E và vuông góc với đường thẳng AB:':
      'Put the steps in order to draw a line through point E that is perpendicular to line AB:',
  'Số bé nhất trong các số {N}, {N}, {N}, {N} là:':
      'The smallest of the numbers {N}, {N}, {N}, {N} is:',
  'Số cây mỗi lớp trồng được:\n{N}A: {N}, {N}B: {N}, {N}C: {N}, {N}D: {N}, {N}E: {N}.\nAi (hoặc nhóm nào) có số liệu lớn nhất?':
      'Trees planted by each class:\n{N}A: {N}, {N}B: {N}, {N}C: {N}, {N}D: {N}, {N}E: {N}.\nWhich class has the largest number?',
  'Số cây mỗi lớp trồng được: {N}, {N}, {N}, {N}, {N}.\nDãy số liệu có mấy số? Số thứ {N} là số nào?':
      'Trees planted by each class: {N}, {N}, {N}, {N}, {N}.\nHow many numbers are in the data? What is number {N}?',
  'Số cây mỗi lớp trồng được: {N}, {N}, {N}, {N}, {N}.\nSố lớn nhất hơn số bé nhất bao nhiêu cây?':
      'Trees planted by each class: {N}, {N}, {N}, {N}, {N}.\nHow many more trees is the largest number than the smallest?',
  'Số gồm {N} triệu, {N} trăm nghìn, {N} chục nghìn, {N} nghìn, {N} trăm, {N} chục và {N} đơn vị viết là:':
      'The number with {N} millions, {N} hundred thousands, {N} ten thousands, {N} thousands, {N} hundreds, {N} tens and {N} ones is written as:',
  'Số lớn nhất trong các số {N}, {N}, {N}, {N} là:':
      'The largest of the numbers {N}, {N}, {N}, {N} is:',
  'Số nào dưới đây là số chẵn?':
      'Which number below is even?',
  'Số nào dưới đây là số lẻ?':
      'Which number below is odd?',
  'Số tiền xây một ngôi trường là {W} đồng. Viết số đó.':
      'A school cost {W} dong to build. Write this number in digits.',
  'Số trung bình cộng của các số {N}, {N}, {N}, {N} là:':
      'The average of the numbers {N}, {N}, {N}, {N} is:',
  'Số tự nhiên bé nhất là số nào?':
      'What is the smallest whole number?',
  'Số {N} gồm các lớp nào? Viết số ở mỗi lớp.':
      'Which classes make up the number {N}? Write the number in each class.',
  'Số {N} gồm mấy chục nghìn, mấy nghìn, ...?':
      'How many ten thousands, thousands, … are in {N}?',
  'Số {N} gồm mấy trăm nghìn, mấy chục nghìn, ...?':
      'How many hundred thousands, ten thousands, … are in {N}?',
  'Số {N} viết thành tổng là:':
      '{N} written as a sum is:',
  'Số {N} đọc là:':
      'The number {N} is read as:',
  'Số {W} viết là:':
      'The number “{W}” is written as:',
  'Số điểm {N} mỗi tổ đạt được trong tháng: {N}, {N}, {N}, {N}.\nSố lớn nhất hơn số bé nhất bao nhiêu điểm {N}?':
      'Number of perfect scores ({0}) each group got this month: {1}, {2}, {3}, {4}.\nHow many more perfect scores ({5}) is the largest number than the smallest?',
  'Tháng Một nhà máy may được {N} chiếc áo, tháng Hai may được ít hơn tháng Một {N} chiếc áo. Hỏi cả hai tháng nhà máy may được bao nhiêu chiếc áo?':
      'In January a factory sewed {N} shirts. In February it sewed {N} fewer shirts than in January. How many shirts did it sew in the two months?',
  'Tháng Một nhà máy sản xuất được {N} chiếc bút, tháng Hai sản xuất được {N} chiếc bút. Hỏi cả hai tháng nhà máy sản xuất được bao nhiêu chiếc bút?':
      'In January a factory made {N} pens, and in February it made {N} pens. How many pens did it make in the two months?',
  'Tháng Năm một sân bay đón {N} lượt khách, tháng Sáu đón {N} lượt khách. Hỏi cả hai tháng sân bay đón bao nhiêu lượt khách?':
      'In May an airport welcomed {N} passengers, and in June {N} passengers. How many passengers did it welcome in the two months?',
  'Thời gian em chạy {N} m khoảng:':
      'The time it takes you to run {N} m is about:',
  'Trong buổi chào cờ, khối lớp Bốn xếp thành {N} hàng, mỗi hàng {N} bạn. Trong đó có {N} bạn nam. Hỏi số bạn nam nhiều hơn nữ bao nhiêu bạn?':
      'At the flag ceremony, grade four stands in {N} rows of {N} pupils. {N} of them are boys. How many more boys are there than girls?',
  'Trong buổi chào cờ, khối lớp Bốn xếp thành {N} hàng, mỗi hàng {N} bạn. Trong đó có {N} bạn nam. Hỏi số bạn nữ nhiều hơn nam bao nhiêu bạn?':
      'At the flag ceremony, grade four stands in {N} rows of {N} pupils. {N} of them are boys. How many more girls are there than boys?',
  'Trong cuộc thi chạy, {P} chạy hết {N} giây, {P} chạy nhanh hơn {P} {N} giây. Hỏi {P} chạy hết bao nhiêu giây?':
      'In a race, {0} ran in {1} seconds. {2} was {4} seconds faster than {3}. How many seconds did {5} take?',
  'Trong hai phân số {F} và {F}, phân số nào lớn hơn?':
      'Which fraction is greater, {F} or {F}?',
  'Trong hình chữ nhật ABCD, cạnh AB song song với cạnh nào?':
      'In rectangle ABCD, side AB is parallel to which side?',
  'Trong hình chữ nhật ABCD, cạnh AB vuông góc với cạnh nào?':
      'In rectangle ABCD, side AB is perpendicular to which side?',
  'Trong hộp có các quả bóng xanh, đỏ, vàng. {P} lấy ra một quả, xem màu rồi trả lại, làm {N} lần: bóng xanh {N} lần, bóng đỏ {N} lần, bóng vàng {N} lần. Màu bóng nào xuất hiện nhiều lần nhất?':
      'A box has blue, red and yellow balls. {P} takes one ball, looks at its color and puts it back, {N} times: blue {N} times, red {N} times, yellow {N} times. Which color came up most often?',
  'Trong số {N}, giá trị của chữ số {N} đầu tiên (từ trái) gấp bao nhiêu lần giá trị của chữ số {N} thứ hai?':
      'In the number {N}, how many times greater is the value of the first digit {N} (from the left) than the value of the second digit {N}?',
  'Trong số {N}, nối mỗi chữ số với hàng của nó.':
      'In the number {N}, match each digit with its place.',
  'Trong {N} ngày, một cửa hàng bán được lần lượt {N}, {N}, {N}, {N} kg gạo. Hỏi trung bình mỗi ngày cửa hàng bán được bao nhiêu ki-lô-gam gạo?':
      'In {N} days, a shop sold {N}, {N}, {N} and {N} kg of rice. On average, how many kilograms of rice did it sell each day?',
  'Trung bình cộng của {N} số là {N}. Biết {N} số trong đó là {N}, {N}, {N}. Tìm số còn lại.':
      'The average of {N} numbers is {N}. {N} of them are {N}, {N} and {N}. Find the last number.',
  'Trung bình cộng của {N} số là {N}. Biết {N} số trong đó là {N}, {N}. Tìm số còn lại.':
      'The average of {N} numbers is {N}. {N} of them are {N} and {N}. Find the last number.',
  'Tuổi bố và tuổi con cộng lại là {N} tuổi. Bố hơn con {N} tuổi. Hỏi bố bao nhiêu tuổi, con bao nhiêu tuổi?':
      'Father and child are {N} years old altogether. Father is {N} years older. How old is father, and how old is the child?',
  'Tìm chữ số thích hợp thay cho mỗi ô trống trong phép tính sau:':
      'Find the missing digit in each box in this calculation:',
  'Tìm hai số biết tổng của chúng là {N} và hiệu của chúng là {N}.':
      'Find two numbers whose sum is {N} and whose difference is {N}.',
  'Tìm quy luật rồi kéo thẻ số thích hợp vào ô trống:':
      'Find the pattern, then drag the correct number cards into the boxes:',
  'Tìm số chẵn và số lẻ liền sau số {N}.':
      'Find the even number and the odd number that come right after {N}.',
  'Tìm số liền trước và số liền sau của số {N}.':
      'Find the numbers just before and just after {N}.',
  'Tìm số lớn nhất và số bé nhất có {N} chữ số.':
      'Find the largest and the smallest {N}-digit numbers.',
  'Tìm số trung bình cộng của các số: {N}; {N}.':
      'Find the average of the numbers: {N}; {N}.',
  'Tìm số trung bình cộng của các số: {N}; {N}; {N}.':
      'Find the average of the numbers: {N}; {N}; {N}.',
  'Tìm {F} của {N} cây.':
      'Find {F} of {N} trees.',
  'Tìm {F} của {N} kg gạo.':
      'Find {F} of {N} kg of rice.',
  'Tìm {F} của {N} quả cam.':
      'Find {F} of {N} oranges.',
  'Tính bằng cách thuận tiện: {N} + {N} + {N}':
      'Calculate in the easiest way: {N} + {N} + {N}',
  'Tính bằng cách thuận tiện: {N} × {N} × {N}':
      'Calculate in the easiest way: {N} × {N} × {N}',
  'Tính bằng hai cách: {N} × ({N} + {N})':
      'Calculate in two ways: {N} × ({N} + {N})',
  'Tính giá trị của biểu thức a + b + c với a = {N}, b = {N}, c = {N}.':
      'Find the value of the expression a + b + c when a = {N}, b = {N} and c = {N}.',
  'Tính giá trị của biểu thức a - b với a = {N}, b = {N}.':
      'Find the value of the expression a − b when a = {N} and b = {N}.',
  'Tính nhẩm:':
      'Work it out in your head:',
  'Tổng của hai số là số lớn nhất có ba chữ số, hiệu của chúng là số bé nhất có hai chữ số có hai chữ số giống nhau. Tìm số lớn.':
      'The sum of two numbers is the largest 3-digit number. Their difference is the smallest 2-digit number with two equal digits. Find the bigger number.',
  'Tổng của hai số là số lớn nhất có ba chữ số, hiệu của chúng là số lớn nhất có ba chữ số mà chữ số hàng trăm là {N}. Tìm số lớn.':
      'The sum of two numbers is the largest 3-digit number. Their difference is the largest 3-digit number whose hundreds digit is {N}. Find the bigger number.',
  'Tổng của hai số là số lớn nhất có ba chữ số, hiệu của chúng là số lớn nhất có hai chữ số. Tìm số lớn.':
      'The sum of two numbers is the largest 3-digit number. Their difference is the largest 2-digit number. Find the bigger number.',
  'Từ các chữ số {N}, {N}, {N}, {N}, {N}, hãy lập số lớn nhất và số bé nhất có {N} chữ số khác nhau.':
      'Using the digits {N}, {N}, {N}, {N}, {N}, make the largest and the smallest {N}-digit numbers with different digits.',
  'Từ các chữ số {N}, {N}, {N}, {N}, {N}, {N}, hãy lập số lớn nhất và số bé nhất có {N} chữ số khác nhau.':
      'Using the digits {N}, {N}, {N}, {N}, {N}, {N}, make the largest and the smallest {N}-digit numbers with different digits.',
  'Từ các chữ số {N}, {N}, {N}, {N}, {N}, {N}, {N}, hãy lập số lớn nhất và số bé nhất có {N} chữ số khác nhau.':
      'Using the digits {N}, {N}, {N}, {N}, {N}, {N}, {N}, make the largest and the smallest {N}-digit numbers with different digits.',
  'Viết số thích hợp vào chỗ trống.':
      'Write the correct numbers in the boxes.',
  'Viết số thích hợp vào chỗ trống:':
      'Write the correct numbers in the boxes:',
  'Viết số thích hợp vào chỗ trống: {F} = ?/{N}':
      'Write the correct number in the box: {F} = ?/{N}',
  'Viết số tự nhiên dưới dạng phân số có mẫu số là {N}, và viết số {N} dưới dạng phân số.':
      'Write a whole number as a fraction with denominator {N}, and write the number {N} as a fraction.',
  'Viết số đo thích hợp vào chỗ trống.':
      'Write the correct measurements in the boxes.',
  'Viết thương dưới dạng phân số: {N} : {N} và {N} : {N}.':
      'Write each quotient as a fraction: {N} ÷ {N} and {N} ÷ {N}.',
  'Xếp các phân số theo thứ tự từ bé đến lớn: {F}, {F}, {F}, {F}.':
      'Put the fractions in order from smallest to largest: {F}, {F}, {F}, {F}.',
  '{F} + {F} = ?':
      '{F} + {F} = ?',
  '{F} - {F} = ?':
      '{F} − {F} = ?',
  '{F} ... {F}':
      '{F} ... {F}',
  '{F} : {F} = ?':
      '{F} ÷ {F} = ?',
  '{F} : {N} = ?':
      '{F} ÷ {N} = ?',
  '{F} số bi trong hộp là {N} viên. Hỏi trong hộp có tất cả bao nhiêu viên bi?':
      '{F} of the marbles in a box is {N} marbles. How many marbles are in the box altogether?',
  '{F} × {F} = ?':
      '{F} × {F} = ?',
  '{F} × {N} = ?':
      '{F} × {N} = ?',
  '{N} + {N} = ?':
      '{N} + {N} = ?',
  '{N} + {N} × {N} = ?':
      '{N} + {N} × {N} = ?',
  '{N} - {N} = ?':
      '{N} − {N} = ?',
  '{N} ... {N}':
      '{N} ... {N}',
  '{N} : {N} = ?':
      '{N} ÷ {N} = ?',
  '{N} : {N} = ? (dư ?)':
      '{N} ÷ {N} = ? (remainder ?)',
  '{N} can như nhau chứa {N} l dầu. Hỏi {N} can như thế chứa bao nhiêu lít dầu?':
      '{N} identical cans hold {N} l of oil. How many liters of oil do {N} cans like this hold?',
  '{N} can như nhau chứa {N} l dầu. Kéo số vào ô trống để tìm số dầu trong {N} can.':
      '{N} identical cans hold {N} l of oil. Drag the numbers into the boxes to find the oil in {N} cans.',
  '{N} cm² ... {N} dm²':
      '{N} cm² ... {N} dm²',
  '{N} dm² ... {N} m²':
      '{N} dm² ... {N} m²',
  '{N} hộp bút có tất cả {N} chiếc bút. Hỏi {N} hộp bút như thế có bao nhiêu chiếc bút?':
      '{N} boxes have {N} pens altogether. How many pens are in {N} boxes like this?',
  '{N} m² {N} dm² = ? dm²':
      '{N} m² {N} dm² = ? dm²',
  '{N} phút ... {N} giây':
      '{N} minutes ... {N} seconds',
  '{N} tạ {N} kg = ? kg':
      '{N} quintals {N} kg = ? kg',
  '{N} tấn ... {N} kg':
      '{N} tonnes ... {N} kg',
  '{N} tấn {N} kg = ? kg':
      '{N} tonnes {N} kg = ? kg',
  '{N} xe tải như nhau chở được {N} kg hàng. Hỏi {N} xe như thế chở được bao nhiêu ki-lô-gam hàng?':
      '{N} identical trucks carry {N} kg of goods. How many kilograms do {N} trucks like this carry?',
  '{N} × {N} = ?':
      '{N} × {N} = ?',
  '{P} tung một đồng xu {N} lần, thấy mặt sấp xuất hiện {N} lần. Hỏi mặt ngửa xuất hiện bao nhiêu lần?':
      '{P} tosses a coin {N} times and gets tails {N} times. How many times does heads come up?',
  '{P} ăn {F} cái bánh, {P} ăn {F} cái bánh như thế. Ai ăn nhiều bánh hơn?':
      '{P} eats {F} of a cake and {P} eats {F} of the same kind of cake. Who eats more cake?',
  'Đây là dãy các số chẵn liên tiếp. Kéo số thích hợp vào chỗ trống:':
      'This is a sequence of consecutive even numbers. Drag the correct numbers into the gaps:',
  'Đơn vị đo góc là:':
      'The unit for measuring angles is:',
  'Để kiểm tra hai đường thẳng có vuông góc với nhau không, ta dùng:':
      'To check whether two lines are perpendicular, we use:',
};
