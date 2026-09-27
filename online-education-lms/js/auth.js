document.addEventListener('DOMContentLoaded', () => {
  const loginForm = document.getElementById('loginForm');
  const registerForm = document.getElementById('registerForm');
  const contactForm = document.getElementById('contactForm');

  const passwordToggles = document.querySelectorAll('[data-toggle-password]');
  passwordToggles.forEach((toggle) => {
    toggle.addEventListener('click', () => {
      const targetId = toggle.getAttribute('data-toggle-password');
      const passwordInput = document.getElementById(targetId);
      if (!passwordInput) return;

      const isPassword = passwordInput.type === 'password';
      passwordInput.type = isPassword ? 'text' : 'password';
      const icon = toggle.querySelector('i');
      if (icon) {
        icon.classList.toggle('fa-eye', !isPassword);
        icon.classList.toggle('fa-eye-slash', isPassword);
      }
    });
  });

  if (loginForm) {
    loginForm.addEventListener('submit', (event) => {
      event.preventDefault();

      const email = document.getElementById('loginEmail')?.value.trim();
      const password = document.getElementById('loginPassword')?.value;

      if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || !password) {
        window.showToast?.('Please enter a valid email and password.');
        return;
      }

      const user = {
        name: 'Amina Shah',
        email,
        loggedIn: true,
      };

      localStorage.setItem('onlineEducationUser', JSON.stringify(user));
      window.showToast?.('Login successful. Redirecting...');
      setTimeout(() => {
        window.location.href = 'dashboard.html';
      }, 900);
    });
  }

  if (registerForm) {
    registerForm.addEventListener('submit', (event) => {
      event.preventDefault();

      const fullName = document.getElementById('registerName')?.value.trim();
      const email = document.getElementById('registerEmail')?.value.trim();
      const phone = document.getElementById('registerPhone')?.value.trim();
      const password = document.getElementById('registerPassword')?.value;
      const confirmPassword = document.getElementById('confirmPassword')?.value;
      const termsCheck = document.getElementById('termsCheck');

      if (!fullName || !email || !phone || !password || !confirmPassword) {
        window.showToast?.('Please complete all fields before continuing.');
        return;
      }

      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        window.showToast?.('Please enter a valid email address.');
        return;
      }

      if (password.length < 8) {
        window.showToast?.('Password must be at least 8 characters long.');
        return;
      }

      if (password !== confirmPassword) {
        window.showToast?.('Passwords do not match. Please try again.');
        return;
      }

      if (!termsCheck || !termsCheck.checked) {
        window.showToast?.('Please accept the terms and conditions to continue.');
        return;
      }

      const user = {
        name: fullName,
        email,
        phone,
        loggedIn: true,
      };

      localStorage.setItem('onlineEducationUser', JSON.stringify(user));
      window.showToast?.('Account created successfully. Welcome!');
      setTimeout(() => {
        window.location.href = 'dashboard.html';
      }, 900);
    });
  }

  if (contactForm) {
    contactForm.addEventListener('submit', (event) => {
      event.preventDefault();

      const fullName = document.getElementById('contactName')?.value.trim();
      const email = document.getElementById('contactEmail')?.value.trim();
      const subject = document.getElementById('contactSubject')?.value.trim();
      const message = document.getElementById('contactMessage')?.value.trim();

      if (!fullName || !email || !subject || !message) {
        window.showToast?.('Please fill in all contact form fields.');
        return;
      }

      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        window.showToast?.('Please enter a valid email address.');
        return;
      }

      contactForm.reset();
      window.showToast?.('Your message has been sent successfully.');
    });
  }
});
