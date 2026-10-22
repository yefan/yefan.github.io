(() => {
  'use strict';
  const root = document.documentElement;
  const button = document.querySelector('.theme-toggle');
  const meta = document.querySelector('meta[name="theme-color"]');
  const update = () => {
    const light = root.dataset.theme === 'light';
    button.setAttribute('aria-label', `Switch to ${light ? 'dark' : 'light'} mode`);
    button.title = button.getAttribute('aria-label');
    meta.content = light ? '#fafafa' : '#09090b';
  };
  update();
  button.addEventListener('click', () => {
    root.dataset.theme = root.dataset.theme === 'light' ? 'dark' : 'light';
    try { localStorage.setItem('ye-fan-theme', root.dataset.theme); } catch {}
    update();
  });
})();
