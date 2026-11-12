// Giọng cô Mai / MC trên web: phát bằng Web Audio để chỉ cần MỞ KHOÁ MỘT LẦN khi bé chạm màn hình,
// sau đó cô nói liên tục ở mọi màn (Safari iPhone, trình duyệt trong Zalo/Facebook chặn phát tiếng
// với từng thẻ <audio> mới nếu không có cú chạm → trước đây cô chỉ nói được câu đầu tiên).
(function () {
  var AC = window.AudioContext || window.webkitAudioContext;
  if (!AC) return;
  var ctx = null, cur = null, cache = {}, order = [];
  function ensure() {
    if (!ctx) { try { ctx = new AC(); } catch (e) { ctx = null; } }
    return ctx;
  }
  function unlock() {
    var c = ensure();
    if (!c) return;
    if (c.state !== 'running' && c.resume) { try { c.resume(); } catch (e) {} }
    try {
      var b = c.createBuffer(1, 1, 22050), s = c.createBufferSource();
      s.buffer = b; s.connect(c.destination); s.start(0);
    } catch (e) {}
  }
  ['pointerdown', 'touchstart', 'touchend', 'mousedown', 'keydown', 'click'].forEach(function (n) {
    window.addEventListener(n, unlock, { capture: true, passive: true });
  });
  function load(url) {
    if (!cache[url]) {
      cache[url] = fetch(url).then(function (r) {
        if (!r.ok) throw new Error('HTTP ' + r.status);
        return r.arrayBuffer();
      }).then(function (a) {
        return new Promise(function (res, rej) { ensure().decodeAudioData(a, res, rej); });
      });
      cache[url].catch(function () { delete cache[url]; });
      order.push(url);
      while (order.length > 60) { delete cache[order.shift()]; }
    }
    return cache[url];
  }
  function stopCur() {
    var c = cur;
    cur = null;
    if (c) { try { c.src.stop(0); } catch (e) {} c.done(false); }
  }
  window.ongVoice = {
    // true khi trình duyệt đã cho phát tiếng (bé đã chạm màn hình ít nhất một lần).
    ready: function () { return !!ctx && ctx.state === 'running'; },
    preload: function (url) { if (ensure()) load(url).catch(function () {}); },
    // Phát [url]; xong (hoặc bị ngắt / lỗi) thì trả về true / false. [owner]: ai đang nói.
    play: function (url, owner) {
      stopCur();
      var c = ensure();
      if (!c || c.state !== 'running') return Promise.resolve(false);
      var me = { owner: owner, src: null, done: null };
      var p = new Promise(function (res) { me.done = res; });
      cur = me;
      load(url).then(function (buf) {
        if (cur !== me) return;
        var s = c.createBufferSource();
        s.buffer = buf;
        s.connect(c.destination);
        s.onended = function () { if (cur === me) cur = null; me.done(true); };
        me.src = s;
        s.start(0);
      }).catch(function () { if (cur === me) cur = null; me.done(false); });
      return p;
    },
    // Dừng câu đang nói — chỉ khi đúng người đang nói (màn cũ đóng lại không làm tắt tiếng màn mới).
    stop: function (owner) {
      if (cur && (owner == null || cur.owner === owner)) {
        var c = cur;
        cur = null;
        try { if (c.src) c.src.stop(0); } catch (e) {}
        c.done(false);
      }
    }
  };
})();
