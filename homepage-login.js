// Homepage-only enhancement: keep Login visibly available even if the shared nav changes.
(function () {
  function addLogin() {
    const nav = document.querySelector('#main-nav');
    if (nav && !nav.querySelector('a[href="login.html"]')) {
      const a = document.createElement('a');
      a.className = 'cta';
      a.href = 'login.html';
      a.textContent = '🔐 Login';
      nav.appendChild(a);
    }
    const actions = document.querySelector('.hero .actions');
    if (actions && !actions.querySelector('a[href="login.html"]')) {
      const a = document.createElement('a');
      a.className = 'btn secondary';
      a.href = 'login.html';
      a.textContent = '🔐 Login';
      actions.appendChild(a);
    }
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', addLogin);
  else addLogin();
  setTimeout(addLogin, 100);
})();
