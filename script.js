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
  interestForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    const error = document.getElementById('formError');
    const success = document.getElementById('formSuccess');
    const button = interestForm.querySelector('button[type="submit"]');
    const data = new FormData(interestForm);
    const phone = (data.get('telefon') || '').trim();
    const email = (data.get('epost') || '').trim();

    error.classList.remove('show');
    success.classList.remove('show');

    if (!phone && !email) {
      error.textContent = 'Fyll i minst telefon eller e-post så att vi kan återkomma.';
      error.classList.add('show');
      return;
    }

    const payload = Object.fromEntries(data.entries());
    payload._subject = `Ny Blippvero-förfrågan – ${payload.foretag || 'webbplatsen'}`;
    payload._template = 'table';
    payload._url = window.location.href;

    button.disabled = true;
    button.textContent = 'Skickar…';

    try {
      const response = await fetch('https://formsubmit.co/ajax/kontakt@blippvero.se', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      if (!response.ok) throw new Error('Form submission failed');

      success.textContent = 'Tack! Din förfrågan är skickad. Blippvero återkommer via telefon eller e-post.';
      success.classList.add('show');
      interestForm.reset();
    } catch (err) {
      error.textContent = 'Förfrågan kunde inte skickas just nu. Försök igen om en stund.';
      error.classList.add('show');
    } finally {
      button.disabled = false;
      button.textContent = 'Skicka förfrågan';
    }
  });
}
