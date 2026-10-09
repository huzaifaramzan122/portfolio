(() => {
  const menuToggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.main-nav');
  const navLinks = document.querySelectorAll('.nav-link');
  const year = document.getElementById('year');
  const form = document.getElementById('contact-form');
  const feedback = document.getElementById('form-feedback');

  if (year) year.textContent = new Date().getFullYear();

  if (menuToggle && nav) {
    menuToggle.addEventListener('click', () => {
      const isOpen = nav.classList.toggle('open');
      menuToggle.setAttribute('aria-expanded', String(isOpen));
      menuToggle.setAttribute('aria-label', isOpen ? 'Close navigation' : 'Open navigation');
    });
    navLinks.forEach((link) => link.addEventListener('click', () => {
      nav.classList.remove('open');
      menuToggle.setAttribute('aria-expanded', 'false');
      menuToggle.setAttribute('aria-label', 'Open navigation');
    }));
  }

  // Highlight the navigation item for the section currently in view.
  const sections = document.querySelectorAll('main section[id], header[id]');
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        navLinks.forEach((link) => {
          const active = link.getAttribute('href') === `#${entry.target.id}`;
          link.classList.toggle('active', active);
        });
      });
    }, { rootMargin: '-30% 0px -60% 0px' });
    sections.forEach((section) => observer.observe(section));
  }

  // GitHub Pages is static hosting, so the contact form prepares an email instead of storing submissions.
  if (form) {
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      const data = new FormData(form);
      const name = String(data.get('name') || '').trim();
      const email = String(data.get('email') || '').trim();
      const service = String(data.get('service') || '').trim();
      const message = String(data.get('message') || '').trim();
      const subject = encodeURIComponent(`Portfolio inquiry: ${service}`);
      const body = encodeURIComponent(`Hi Huzaifa,\n\nMy name is ${name}.\nMy email: ${email}\nService needed: ${service}\n\nProject details:\n${message}`);
      if (feedback) feedback.textContent = 'Opening your email app… If it does not open, email ramzanhuzaifa42@gmail.com directly.';
      window.location.href = `mailto:ramzanhuzaifa42@gmail.com?subject=${subject}&body=${body}`;
    });
  }
})();
