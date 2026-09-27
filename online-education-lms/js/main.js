document.addEventListener('DOMContentLoaded', () => {
  const body = document.body;
  const themeToggle = document.querySelector('.theme-toggle');
  const nav = document.getElementById('mainNav');
  const mobileToggle = document.querySelector('.mobile-toggle');
  const toast = document.getElementById('toast');

  const applyTheme = (mode) => {
    const isLight = mode === 'light';
    body.classList.toggle('light-mode', isLight);
    localStorage.setItem('onlineEducationTheme', mode);
    if (themeToggle) {
      const icon = themeToggle.querySelector('i');
      if (icon) {
        icon.classList.toggle('fa-sun', isLight);
        icon.classList.toggle('fa-moon', !isLight);
      }
    }
  };

  const savedTheme = localStorage.getItem('onlineEducationTheme');
  if (savedTheme === 'light') {
    applyTheme('light');
  } else {
    applyTheme('dark');
  }

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const isLight = body.classList.contains('light-mode');
      applyTheme(isLight ? 'dark' : 'light');
    });
  }

  if (mobileToggle && nav) {
    mobileToggle.addEventListener('click', () => {
      nav.classList.toggle('open');
    });
  }

  const counters = document.querySelectorAll('[data-counter]');
  counters.forEach((counter) => {
    const target = Number(counter.dataset.counter || 0);
    const suffix = target >= 100 ? '+' : '';
    let start = 0;
    const step = Math.max(1, Math.ceil(target / 40));

    const timer = setInterval(() => {
      start += step;
      if (start >= target) {
        counter.textContent = `${target}${suffix}`;
        clearInterval(timer);
        return;
      }
      counter.textContent = `${start}${suffix}`;
    }, 30);
  });

  const track = document.getElementById('testimonialTrack');
  const dots = document.querySelectorAll('.slider-dot');

  if (track && dots.length) {
    let currentIndex = 0;
    const slides = Array.from(track.children);

    const updateSlider = () => {
      track.style.transform = `translateX(-${currentIndex * 100}%)`;
      dots.forEach((dot, index) => dot.classList.toggle('active', index === currentIndex));
    };

    setInterval(() => {
      currentIndex = (currentIndex + 1) % slides.length;
      updateSlider();
    }, 4500);

    dots.forEach((dot, index) => {
      dot.addEventListener('click', () => {
        currentIndex = index;
        updateSlider();
      });
    });
  }

  window.showToast = (message) => {
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add('show');
    clearTimeout(window.toastTimer);
    window.toastTimer = setTimeout(() => {
      toast.classList.remove('show');
    }, 2200);
  };

  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', (event) => {
      const targetId = anchor.getAttribute('href').slice(1);
      if (!targetId) return;

      const target = document.getElementById(targetId);
      if (target) {
        event.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
});
