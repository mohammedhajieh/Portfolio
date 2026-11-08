const button = document.querySelector('.theme');
function renderTheme() {
  const dark = document.documentElement.dataset.theme === 'dark';
  button.innerHTML = (dark ? 'Light' : 'Dark') + ' <span aria-hidden="true"><svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="8" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M12 4a8 8 0 0 1 0 16Z" fill="currentColor"/></svg></span>';
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

const copyButton = document.querySelector('.copy-command');
const copyStatus = document.querySelector('.copy-status');
copyButton?.addEventListener('click', async () => {
  try {
    await navigator.clipboard.writeText('flutter pub add iconly_plus');
    copyStatus.textContent = 'Installation command copied.';
    copyButton.textContent = 'Copied';
    window.setTimeout(() => {
      copyButton.innerHTML = 'Copy <span aria-hidden="true">+</span>';
      copyStatus.textContent = '';
    }, 2500);
  } catch {
    copyStatus.textContent = 'Select the command to copy it manually.';
  }
});

// Start every visit at the introduction; section navigation stays on this page.
function startAtTop() {
  window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
}
startAtTop();
window.addEventListener('pageshow', startAtTop);
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
document.querySelectorAll('nav a[href^="#"], .hero-actions a[href^="#"], footer a[href="#top"], .logo[href="#top"]').forEach(link => {
  link.addEventListener('click', event => {
    const target = document.querySelector(link.getAttribute('href'));
    if (!target) return;
    event.preventDefault();
    target.scrollIntoView({ behavior: reduceMotion.matches ? 'instant' : 'smooth', block: 'start' });
  });
});

const progress = document.querySelector('.reading-progress');
let scrollFrame = false;
function updateProgress() {
  const range = document.documentElement.scrollHeight - window.innerHeight;
  progress.style.transform = `scaleX(${range > 0 ? Math.min(1, window.scrollY / range) : 0})`;
  scrollFrame = false;
}
window.addEventListener('scroll', () => {
  if (!scrollFrame) { scrollFrame = true; requestAnimationFrame(updateProgress); }
}, { passive: true });
window.addEventListener('resize', updateProgress);
updateProgress();
if ('IntersectionObserver' in window) {
  const sectionObserver = new IntersectionObserver(entries => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue;
      document.querySelectorAll('nav a').forEach(link => {
        if (link.getAttribute('href') === '#' + entry.target.id) link.setAttribute('aria-current', 'true');
        else link.removeAttribute('aria-current');
      });
    }
  }, { rootMargin: '-10% 0px -55% 0px', threshold: 0 });
  document.querySelectorAll('main section[id]').forEach(section => sectionObserver.observe(section));
}
