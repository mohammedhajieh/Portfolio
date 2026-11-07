const toggle = document.querySelector('.theme');
const system = window.matchMedia('(prefers-color-scheme: dark)');
function currentTheme() {
  return document.documentElement.dataset.theme || (system.matches ? 'dark' : 'light');
}
function renderToggle() {
  const next = currentTheme() === 'dark' ? 'Light' : 'Dark';
  toggle.querySelector('.themelabel').textContent = next;
  toggle.setAttribute('aria-label', 'Switch to ' + next.toLowerCase() + ' mode');
}
toggle.addEventListener('click', () => {
  const theme = currentTheme() === 'dark' ? 'light' : 'dark';
  document.documentElement.dataset.theme = theme;
  try { localStorage.setItem('portfolio-theme', theme); } catch {}
  renderToggle();
});
system.addEventListener('change', renderToggle);
renderToggle();
toggle.hidden = false;
