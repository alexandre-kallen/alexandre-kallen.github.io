// Profil : un clic sur un domaine change le fond et le texte
(function () {
  var root = document.getElementById('profileExplorer');
  if (!root) return;
  var tabs = root.querySelectorAll('.pe-tab');
  var panels = root.querySelectorAll('.pe-panel');
  var layers = root.querySelectorAll('.pe-bg-layer');

  function select(i) {
    tabs.forEach(function (t, k) {
      var on = k === i;
      t.classList.toggle('is-active', on);
      t.setAttribute('aria-selected', on ? 'true' : 'false');
      t.tabIndex = on ? 0 : -1;
    });
    panels.forEach(function (p, k) {
      p.classList.toggle('is-active', k === i);
      p.hidden = k !== i;
    });
    layers.forEach(function (l, k) { l.classList.toggle('is-active', k === i); });
  }

  tabs.forEach(function (t, i) {
    t.addEventListener('click', function () { select(i); });
    t.addEventListener('keydown', function (e) {   // flèches gauche/droite
      if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return;
      var n = (i + (e.key === 'ArrowRight' ? 1 : tabs.length - 1)) % tabs.length;
      select(n); tabs[n].focus();
    });
  });
  select(0);
})();