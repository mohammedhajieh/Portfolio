const button = document.querySelector('.theme');
function renderTheme() {
  const dark = document.documentElement.dataset.theme === 'dark';
  button.innerHTML = (dark ? 'Light' : 'Dark') + ' <span aria-hidden="true">◐</span>';
  button.setAttribute('aria-label', 'Switch to ' + (dark ? 'light' : 'dark') + ' mode');
}
button.addEventListener('click', () => {
  const next = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
  document.documentElement.dataset.theme = next;
  try { localStorage.setItem('portfolio-theme', next); } catch {}
  renderTheme();
});
renderTheme();
button.hidden = false;

if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const observer = new IntersectionObserver(entries => {
    for (const entry of entries) {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    }
  }, { threshold: 0.08 });
  document.documentElement.classList.add('js-motion');
  document.querySelectorAll('.reveal').forEach(element => observer.observe(element));
}
