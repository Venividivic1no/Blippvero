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

// V5 image slider
document.addEventListener('DOMContentLoaded', function(){
  const slider = document.querySelector('.slider');
  if(!slider) return;
  const slides = Array.from(slider.querySelectorAll('.slide'));
  const dots = Array.from(slider.querySelectorAll('.dot'));
  const prev = slider.querySelector('.prev');
  const next = slider.querySelector('.next');
  let current = 0;

  function showSlide(index){
    current = (index + slides.length) % slides.length;
    slides.forEach((slide, i) => slide.classList.toggle('active', i === current));
    dots.forEach((dot, i) => dot.classList.toggle('active', i === current));
  }

  if(prev) prev.addEventListener('click', () => showSlide(current - 1));
  if(next) next.addEventListener('click', () => showSlide(current + 1));
  dots.forEach((dot, i) => dot.addEventListener('click', () => showSlide(i)));

  let autoplay = setInterval(() => showSlide(current + 1), 5000);
  slider.addEventListener('mouseenter', () => clearInterval(autoplay));
  slider.addEventListener('mouseleave', () => autoplay = setInterval(() => showSlide(current + 1), 5000));
  showSlide(0);
});
