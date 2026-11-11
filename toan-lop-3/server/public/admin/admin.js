// CMS tối giản — JavaScript thuần, không cần build. Mọi nội dung hiển thị dùng textContent (chống XSS).
(() => {
  'use strict';
  const $ = (id) => document.getElementById(id);
  const TOKEN_KEY = 'ongvang.adminToken';

  const el = {
    token: $('token'), docs: $('docs'), docId: $('docId'), editor: $('editor'),
    status: $('status'), issues: $('issues'), preview: $('preview'),
    docTitle: $('docTitle'), docMeta: $('docMeta'),
  };
  let currentId = null;

  try { el.token.value = sessionStorage.getItem(TOKEN_KEY) || ''; } catch { /* trình duyệt chặn storage */ }
  el.token.addEventListener('change', () => {
    try { sessionStorage.setItem(TOKEN_KEY, el.token.value.trim()); } catch { /* bỏ qua */ }
  });

  function h(tag, attrs = {}, ...children) {
    const node = document.createElement(tag);
    for (const [k, v] of Object.entries(attrs)) {
      if (k === 'class') node.className = v;
      else if (k.startsWith('on')) node.addEventListener(k.slice(2), v);
      else node.setAttribute(k, v);
    }
    for (const c of children.flat()) {
      if (c === null || c === undefined || c === false) continue;
      node.append(c instanceof Node ? c : document.createTextNode(String(c)));
    }
    return node;
  }

  function setStatus(text, kind = '') {
    el.status.textContent = text;
    el.status.className = kind;
  }

  function showIssues(issues = []) {
    el.issues.replaceChildren(...issues.map((i) => h('li', {}, h('code', {}, i.path), ' — ', i.message)));
  }

  async function api(method, path, body) {
    const res = await fetch(path, {
      method,
      headers: {
        Authorization: `Bearer ${el.token.value.trim()}`,
        ...(body !== undefined ? { 'Content-Type': 'application/json' } : {}),
      },
      body: body !== undefined ? JSON.stringify(body) : undefined,
    });
    const data = res.status === 204 ? null : await res.json().catch(() => null);
    return { ok: res.ok, status: res.status, data };
  }

  function errorText(r) {
    return `Lỗi ${r.status}: ${r.data?.message || r.data?.error || 'không rõ'}`;
  }

  function parseEditor() {
    try {
      return { body: JSON.parse(el.editor.value) };
    } catch (err) {
      setStatus(`JSON sai cú pháp: ${err.message}`, 'bad');
      showIssues([]);
      return null;
    }
  }

  async function loadList() {
    const r = await api('GET', '/v1/admin/documents');
    if (!r.ok) { setStatus(errorText(r), 'bad'); return; }
    el.docs.replaceChildren(
      ...r.data.documents.map((d) =>
        h('li', { class: d.id === currentId ? 'active' : '', onclick: () => openDoc(d.id) },
          h('div', {}, d.title || d.id,
            d.access === 'vip' ? h('span', { class: 'tag vip' }, 'VIP') : null,
            d.published ? null : h('span', { class: 'tag draft' }, 'nháp')),
          h('div', { class: 'meta' }, `${d.kind} · ${d.id} · rev ${d.rev}`))),
    );
    setStatus(`Đã tải ${r.data.documents.length} tài liệu.`, 'good');
  }

  async function openDoc(id) {
    const r = await api('GET', `/v1/admin/documents/${encodeURIComponent(id)}`);
    if (!r.ok) { setStatus(errorText(r), 'bad'); return; }
    currentId = id;
    el.docId.value = id;
    el.editor.value = JSON.stringify(r.data.body, null, 2);
    el.docTitle.textContent = r.data.title || id;
    el.docMeta.textContent = `${r.data.kind} · rev ${r.data.rev} · ${r.data.published ? 'đã xuất bản' : 'có thay đổi chưa xuất bản'} · sửa lúc ${r.data.updatedAt}`;
    showIssues([]);
    setStatus('');
    renderPreview(r.data.body);
    [...el.docs.children].forEach((li) => li.classList.toggle('active', li.textContent.includes(` ${id} `)));
  }

  async function check() {
    const parsed = parseEditor();
    if (!parsed) return;
    renderPreview(parsed.body);
    const r = await api('POST', '/v1/admin/validate', { body: parsed.body });
    if (!r.ok) { setStatus(errorText(r), 'bad'); return; }
    showIssues(r.data.issues);
    setStatus(r.data.ok ? 'Hợp lệ ✔' : `Có ${r.data.issues.length} lỗi.`, r.data.ok ? 'good' : 'bad');
  }

  async function save() {
    const parsed = parseEditor();
    if (!parsed) return;
    const id = el.docId.value.trim() || parsed.body?.id || (parsed.body?.kind === 'catalog' ? 'catalog' : '');
    if (!id) { setStatus('Hãy nhập mã (id) tài liệu.', 'bad'); return; }
    const r = await api('PUT', `/v1/admin/documents/${encodeURIComponent(id)}`, { body: parsed.body });
    if (!r.ok) {
      showIssues(r.data?.issues || []);
      setStatus(errorText(r), 'bad');
      return;
    }
    showIssues([]);
    setStatus(`Đã lưu nháp "${id}". Bấm "Xuất bản" để app nhận được.`, 'good');
    currentId = id;
    await loadList();
    await openDoc(id);
  }

  async function publish() {
    const id = el.docId.value.trim() || currentId;
    if (!id) { setStatus('Chưa chọn tài liệu.', 'bad'); return; }
    if (!confirm(`Xuất bản bản nháp đã LƯU của "${id}"? (thay đổi chưa lưu trong ô soạn thảo sẽ không được xuất bản)`)) return;
    const r = await api('POST', `/v1/admin/documents/${encodeURIComponent(id)}/publish`);
    if (!r.ok) {
      showIssues(r.data?.issues || []);
      setStatus(errorText(r), 'bad');
      return;
    }
    setStatus(`Đã xuất bản "${r.data.id}" — rev ${r.data.rev}.`, 'good');
    await loadList();
    await openDoc(id);
  }

  function renderMath(container, tex) {
    if (!tex) return;
    const box = h('div', { class: 'math' });
    if (window.katex) {
      try {
        window.katex.render(tex, box, { throwOnError: false });
      } catch {
        box.textContent = tex;
      }
    } else {
      box.textContent = tex;
    }
    container.append(box);
  }

  function renderProblem(p, label) {
    const card = h('div', { class: 'problem' },
      h('div', { class: 'meta' }, `${label} · ${p.type} · mức ${p.level ?? '?'}${p.access === 'vip' ? ' · VIP' : ''}`),
      p.instruction ? h('div', {}, h('em', {}, p.instruction)) : null,
      h('div', {}, p.prompt?.text ?? '(thiếu prompt.text)'));
    renderMath(card, p.prompt?.math);
    const correct = new Set(p.correctChoiceIds || []);
    if (Array.isArray(p.choices)) {
      card.append(h('ol', { type: 'A' }, p.choices.map((c) => h('li', { class: correct.has(c.id) ? 'correct' : '' }, c.text))));
    }
    if (p.template) card.append(h('div', { class: 'meta' }, `Mẫu: ${p.template}`));
    if (Array.isArray(p.tokens)) card.append(h('div', { class: 'meta' }, `Thẻ: ${p.tokens.map((t) => t.text).join(' | ')}`));
    if (Array.isArray(p.left) && Array.isArray(p.right)) {
      card.append(h('div', { class: 'meta' }, `Nối: ${p.left.map((t) => t.text).join(', ')} ↔ ${p.right.map((t) => t.text).join(', ')}`));
    }
    return card;
  }

  function renderPreview(body) {
    const out = [];
    if (body?.kind === 'lesson') {
      (body.problems || []).forEach((p, i) => out.push(renderProblem(p, `Bài ${i + 1}`)));
    } else if (body?.kind === 'exam') {
      (body.sections || []).forEach((s) => {
        out.push(h('h4', {}, s.title || ''));
        (s.items || []).forEach((it, i) => out.push(renderProblem(it.problem || {}, `Câu ${i + 1} (${it.points} điểm)`)));
      });
    } else if (body?.kind === 'catalog') {
      (body.books || []).forEach((b) => {
        out.push(h('h4', {}, b.title || b.id));
        (b.chapters || []).forEach((c) =>
          out.push(h('div', {}, `${c.title} — ${(c.lessons || []).map((l) => l.title + (l.access === 'vip' ? ' (VIP)' : '')).join('; ')}`)));
      });
    }
    el.preview.replaceChildren(...(out.length ? out : [h('div', { class: 'meta' }, 'Không có gì để xem trước.')]));
  }

  $('btnLoad').addEventListener('click', () => {
    try { sessionStorage.setItem(TOKEN_KEY, el.token.value.trim()); } catch { /* bỏ qua */ }
    loadList();
  });
  $('btnCheck').addEventListener('click', check);
  $('btnSave').addEventListener('click', save);
  $('btnPublish').addEventListener('click', publish);
  $('btnFormat').addEventListener('click', () => {
    const parsed = parseEditor();
    if (parsed) el.editor.value = JSON.stringify(parsed.body, null, 2);
  });
  $('btnNew').addEventListener('click', () => {
    currentId = null;
    el.docId.value = '';
    el.docTitle.textContent = 'Tài liệu mới';
    el.docMeta.textContent = '';
    el.editor.value = '';
    showIssues([]);
    setStatus('Dán JSON vào ô soạn thảo, nhập mã rồi bấm "Kiểm tra" / "Lưu nháp".');
    renderPreview(null);
  });

  if (el.token.value) loadList();
})();
