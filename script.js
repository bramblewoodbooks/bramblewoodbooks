/* Progressive enhancement: navigation and full-size artwork also work without JS. */
const toggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('#main-nav');
if (toggle && nav) {
  toggle.hidden = false;
  nav.dataset.enhanced = '';
  const closeMenu = () => { nav.classList.remove('is-open'); toggle.setAttribute('aria-expanded', 'false'); };
  toggle.addEventListener('click', () => {
    const open = toggle.getAttribute('aria-expanded') !== 'true';
    toggle.setAttribute('aria-expanded', String(open)); nav.classList.toggle('is-open', open);
  });
  document.addEventListener('keydown', e => { if (e.key === 'Escape' && nav.classList.contains('is-open')) { closeMenu(); toggle.focus(); } });
  nav.addEventListener('click', e => { if (e.target.closest('a')) closeMenu(); });
  matchMedia('(min-width:1180px)').addEventListener('change', closeMenu);
}
const viewport = document.querySelector('.map-viewport');
if (viewport) {
  const image = viewport.querySelector('img');
  const toolbar = document.querySelector('.map-toolbar');
  const status = document.querySelector('#map-status');
  toolbar.hidden = false;
  let width = Math.max(1200, viewport.clientWidth), fit = false;
  function render(next, whole = false) {
    const previous = image.getBoundingClientRect().width;
    const x = (viewport.scrollLeft + viewport.clientWidth / 2) / previous;
    const y = (viewport.scrollTop + viewport.clientHeight / 2) / (previous / 2);
    fit = whole;
    width = Math.max(viewport.clientWidth, Math.min(3548, next));
    image.style.width = width + 'px';
    viewport.style.height = Math.min(width / 2, Math.max(320, Math.min(innerHeight * .6, 650))) + 'px';
    viewport.scrollLeft = x * width - viewport.clientWidth / 2;
    viewport.scrollTop = y * width / 2 - viewport.clientHeight / 2;
    status.textContent = whole ? 'Whole map' : Math.round(width / 1774 * 100) + '%';
    toolbar.querySelector('[data-zoom="out"]').disabled = width <= viewport.clientWidth;
    toolbar.querySelector('[data-zoom="in"]').disabled = width >= 3548;
  }
  toolbar.addEventListener('click', e => {
    const action = e.target.closest('button')?.dataset.zoom;
    if (action === 'in') render(width * 1.3);
    if (action === 'out') render(width / 1.3);
    if (action === 'fit') render(viewport.clientWidth, true);
    if (action === 'detail') render(1774);
  });
  render(width); viewport.scrollLeft = 0; viewport.scrollTop = 0;
  new ResizeObserver(() => render(fit ? viewport.clientWidth : width, fit)).observe(viewport.parentElement);
}
