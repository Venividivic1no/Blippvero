const menuBtn = document.querySelector('.menu-btn');
const mobileNav = document.querySelector('.mobile-nav');
if (menuBtn && mobileNav) {
  menuBtn.addEventListener('click', () => {
    const open = mobileNav.classList.toggle('open');
    menuBtn.setAttribute('aria-expanded', String(open));
    menuBtn.textContent = open ? '×' : '☰';
  });
  mobileNav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
    mobileNav.classList.remove('open');
    menuBtn.setAttribute('aria-expanded', 'false');
    menuBtn.textContent = '☰';
  }));
}

const year = document.getElementById('year');
if (year) year.textContent = new Date().getFullYear();

const interestForm = document.getElementById('interestForm');
if (interestForm) {
  interestForm.addEventListener('submit', (event) => {
    const error = document.getElementById('formError');
    const data = new FormData(interestForm);
    const phone = (data.get('telefon') || '').trim();
    const email = (data.get('email') || '').trim();

    error.classList.remove('show');

    if (!phone && !email) {
      event.preventDefault();
      error.textContent = 'Fyll i minst telefon eller e-post så att vi kan återkomma.';
      error.classList.add('show');
      return;
    }

    const button = interestForm.querySelector('button[type="submit"]');
    if (button) {
      button.disabled = true;
      button.textContent = 'Skickar…';
    }
  });
}
