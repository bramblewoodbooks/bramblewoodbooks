/* Optional Google Analytics: no Google script or request until consent. */
(() => {
  const ID = 'G-TPLTMXRJF9';
  const KEY = 'bramblewood-analytics-v1';
  const TTL = 180 * 24 * 60 * 60 * 1000;
  const panel = document.querySelector('#analytics-choice');
  if (!panel) return;
  const settings = document.querySelectorAll('[data-analytics-settings]');
  let started = false;
  let returnFocus = null;
  function savedChoice() {
    try {
      const saved = JSON.parse(localStorage.getItem(KEY));
      return saved && saved.expires > Date.now() && ['accept', 'decline'].includes(saved.choice) ? saved.choice : null;
    } catch { return null; }
  }
  function remember(choice) {
    try { localStorage.setItem(KEY, JSON.stringify({choice, expires: Date.now() + TTL})); } catch { /* Ask again on the next page if storage is unavailable. */ }
  }
  function clearAnalyticsCookies() {
    const names = document.cookie.split(';').map(c => c.trim().split('=')[0]).filter(n => n === '_ga' || n.startsWith('_ga_'));
    for (const name of names) {
      for (const domain of ['', location.hostname, '.' + location.hostname]) {
        document.cookie = name + '=; Max-Age=0; Path=/; SameSite=Lax' + (domain ? '; Domain=' + domain : '');
      }
    }
  }
  function start() {
    // Do not record previews on local files or other hosts.
    if (started || location.protocol !== 'https:' || !['bramblewoodbooks.com', 'www.bramblewoodbooks.com'].includes(location.hostname)) return;
    started = true;
    window['ga-disable-' + ID] = false;
    window.dataLayer = window.dataLayer || [];
    window.gtag = function () { window.dataLayer.push(arguments); };
    window.gtag('consent', 'default', {analytics_storage: 'granted', ad_storage: 'denied', ad_user_data: 'denied', ad_personalization: 'denied'});
    window.gtag('js', new Date());
    let referrer = '';
    try { referrer = new URL(document.referrer).origin; } catch { /* Direct visit. */ }
    window.gtag('config', ID, {
      allow_google_signals: false,
      allow_ad_personalization_signals: false,
      cookie_expires: TTL / 1000,
      cookie_update: false,
      page_location: location.origin + location.pathname,
      page_referrer: referrer
    });
    const tag = document.createElement('script');
    tag.async = true;
    tag.src = 'https://www.googletagmanager.com/gtag/js?id=' + ID;
    document.head.appendChild(tag);
  }
  function decline() {
    window['ga-disable-' + ID] = true;
    clearAnalyticsCookies();
    // Unload any previously accepted tag so it cannot send subsequent events.
    if (started) location.reload();
  }
  settings.forEach(button => {
    button.hidden = false;
    button.addEventListener('click', () => {
      returnFocus = button;
      panel.hidden = false;
      panel.querySelector('[data-analytics-choice="decline"]').focus();
    });
  });
  panel.querySelectorAll('[data-analytics-choice]').forEach(button => {
    button.addEventListener('click', () => {
      const choice = button.dataset.analyticsChoice;
      remember(choice);
      panel.hidden = true;
      if (choice === 'accept') start(); else decline();
      if (returnFocus) returnFocus.focus();
    });
  });
  window.addEventListener('storage', event => {
    if (event.key !== KEY) return;
    const choice = savedChoice();
    if (choice === 'accept') { panel.hidden = true; start(); }
    else { decline(); panel.hidden = choice === 'decline'; }
  });
  const choice = savedChoice();
  if (choice === 'accept') start();
  else { window['ga-disable-' + ID] = true; clearAnalyticsCookies(); panel.hidden = choice === 'decline'; }
})();
