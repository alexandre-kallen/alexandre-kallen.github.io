// Formation : un clic sur une période affiche le détail correspondant
(function () {
  var root = document.getElementById('eduTimeline');
  if (!root) return;
  var tabs = Array.prototype.slice.call(root.querySelectorAll('.edu-seg[role="tab"]'));
  var panels = root.querySelectorAll('.edu-panel');
  var wrap = root.querySelector('.edu-panels');

  function placeCaret(tab) {
    var t = tab.getBoundingClientRect(), w = wrap.getBoundingClientRect();
    wrap.style.setProperty('--caret', (t.left + t.width / 2 - w.left) + 'px');
  }
  function select(id, focus) {
    var current;
    tabs.forEach(function (t) {
      var on = t.id === 'edu-tab-' + id;
      t.classList.toggle('is-active', on);
      t.setAttribute('aria-selected', on ? 'true' : 'false');
      t.tabIndex = on ? 0 : -1;
      if (on) current = t;
    });
    root.querySelector('#edu-tab-eeigm').classList.toggle('is-parent', id === 'ltu');
    panels.forEach(function (p) { var on = p.id === 'edu-' + id; p.classList.toggle('is-active', on); p.hidden = !on; });
    wrap.querySelectorAll('.edu-panel').forEach(function (p) { p.style.setProperty('--caret', 'inherit'); });
    placeCaret(current);
    if (focus) current.focus();
  }
  tabs.forEach(function (t, i) {
    t.addEventListener('click', function () { select(t.id.replace('edu-tab-', '')); });
    t.addEventListener('keydown', function (e) {
      if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return;
      var n = (i + (e.key === 'ArrowRight' ? 1 : tabs.length - 1)) % tabs.length;
      select(tabs[n].id.replace('edu-tab-', ''), true);
    });
  });
  root.querySelectorAll('[data-goto]').forEach(function (b) {
    b.addEventListener('click', function () { select(b.getAttribute('data-goto')); });
  });
  window.addEventListener('resize', function () {
    var a = root.querySelector('.edu-seg.is-active'); if (a) placeCaret(a);
  });
  select('m2');
})();

// Formation : les liens « Voir le stage » ouvrent le bon onglet de la section Expériences
document.querySelectorAll('[data-exp]').forEach(function (a) {
  a.addEventListener('click', function () {
    var tab = document.querySelector('[data-bs-target="#' + a.getAttribute('data-exp') + '"]');
    if (tab && window.bootstrap) bootstrap.Tab.getOrCreateInstance(tab).show();
  });
});
