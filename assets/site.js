/* Dotyk Młodości — wspólny skrypt witryny */
(function () {
  'use strict';

  /* ---------- Nagłówek: tło przy przewijaniu ---------- */
  const header = document.getElementById('site-header');
  if (header) {
    const solid = document.body.dataset.solidHeader === 'true';
    const setSolid = () => {
      header.classList.add('bg-cream', 'shadow-sm');
      document.querySelectorAll('.header-nav a, .header-brand').forEach((e) => e.classList.add('text-ink'));
    };
    if (solid) {
      setSolid();
    } else {
      const onScroll = () => {
        if (window.scrollY > 40) setSolid();
        else {
          header.classList.remove('bg-cream', 'shadow-sm');
          document.querySelectorAll('.header-nav a, .header-brand').forEach((e) => e.classList.remove('text-ink'));
        }
      };
      window.addEventListener('scroll', onScroll, { passive: true });
      onScroll();
    }
  }

  /* ---------- Menu mobilne ---------- */
  const burger = document.getElementById('burger');
  const menu = document.getElementById('mobile-menu');
  if (burger && menu) {
    let open = false;
    const lines = document.querySelectorAll('.burger-line');
    const toggle = (force) => {
      open = typeof force === 'boolean' ? force : !open;
      menu.classList.toggle('opacity-0', !open);
      menu.classList.toggle('invisible', !open);
      if (lines.length === 3) {
        lines[0].style.transform = open ? 'translateY(7.5px) rotate(45deg)' : '';
        lines[1].style.opacity = open ? '0' : '1';
        lines[2].style.transform = open ? 'translateY(-7.5px) rotate(-45deg)' : '';
      }
      burger.setAttribute('aria-expanded', open ? 'true' : 'false');
      document.body.style.overflow = open ? 'hidden' : '';
    };
    burger.addEventListener('click', () => toggle());
    // Zamknij po kliknięciu w link
    menu.querySelectorAll('a').forEach((a) => a.addEventListener('click', () => toggle(false)));
    // Zamknij klawiszem Esc
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && open) toggle(false); });
  }

  /* ---------- Reveal przy przewijaniu ---------- */
  const reveals = document.querySelectorAll('.reveal:not(.in)');
  if (reveals.length) {
    if (!('IntersectionObserver' in window)) {
      reveals.forEach((el) => el.classList.add('in'));
    } else {
      const io = new IntersectionObserver((entries) => {
        entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
      }, { threshold: 0.15 });
      reveals.forEach((el) => io.observe(el));
    }
  }

  /* ---------- Animowane liczniki ---------- */
  const counters = document.querySelectorAll('[data-count]');
  if (counters.length && 'IntersectionObserver' in window) {
    const animate = (el) => {
      const raw = el.dataset.count;
      const num = parseFloat(raw.replace(',', '.'));
      const decimals = raw.includes(',') ? 1 : 0;
      const suffix = el.dataset.suffix || '';
      const dur = 1600; const start = performance.now();
      const step = (now) => {
        const p = Math.min((now - start) / dur, 1);
        const eased = 1 - Math.pow(1 - p, 3);
        const val = (num * eased).toFixed(decimals).replace('.', ',');
        el.textContent = val + suffix;
        if (p < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    };
    const cio = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) { animate(e.target); cio.unobserve(e.target); } });
    }, { threshold: 0.5 });
    counters.forEach((el) => cio.observe(el));
  }

  /* ---------- Parallax w hero ---------- */
  const parallax = document.querySelector('[data-parallax]');
  if (parallax && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    window.addEventListener('scroll', () => {
      const y = window.scrollY;
      if (y < window.innerHeight) parallax.style.transform = 'translateY(' + y * 0.18 + 'px)';
    }, { passive: true });
  }

  /* ---------- Lightbox galerii ---------- */
  const gallery = document.querySelector('[data-gallery]');
  if (gallery) {
    const box = document.createElement('div');
    box.id = 'lightbox';
    box.className = 'fixed inset-0 z-[100] bg-ink/90 flex items-center justify-center p-6 opacity-0 invisible transition-all duration-300';
    box.innerHTML = '<button aria-label="Zamknij" class="absolute top-6 right-8 text-cream text-4xl font-light">&times;</button><img alt="" class="max-h-[88vh] max-w-full object-contain shadow-2xl">';
    document.body.appendChild(box);
    const bimg = box.querySelector('img');
    const close = () => { box.classList.remove('lb-open'); document.body.style.overflow = ''; };
    box.addEventListener('click', (e) => { if (e.target === box || e.target.tagName === 'BUTTON') close(); });
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape') close(); });
    gallery.querySelectorAll('img').forEach((img) => {
      img.style.cursor = 'zoom-in';
      img.addEventListener('click', () => {
        bimg.src = img.currentSrc || img.src;
        bimg.alt = img.alt || '';
        box.classList.add('lb-open');
        document.body.style.overflow = 'hidden';
      });
    });
  }

  /* ---------- Aktualny rok w stopce ---------- */
  document.querySelectorAll('[data-year]').forEach((el) => { el.textContent = new Date().getFullYear(); });

  /* ---------- Informacja o cookies (RODO) ---------- */
  try {
    if (!localStorage.getItem('dm-cookies')) {
      const base = location.pathname.includes('/oferta/') ? '../' : '';
      const bar = document.createElement('div');
      bar.className = 'fixed bottom-0 inset-x-0 z-[90] bg-ink text-cream/85 px-5 py-4 lg:pb-4 pb-20 text-sm font-light flex flex-col sm:flex-row items-center gap-3 sm:gap-6 justify-center';
      bar.innerHTML = 'Ta strona używa niezbędnych plików cookies oraz map i wtyczek społecznościowych. ' +
        '<a href="' + base + 'polityka-prywatnosci.html" class="underline hover:text-cream whitespace-nowrap">Dowiedz się więcej</a>' +
        '<button type="button" class="bg-cream text-ink px-6 py-2 tracking-wide2 uppercase text-xs hover:bg-rose hover:text-cream transition whitespace-nowrap">Rozumiem</button>';
      const accept = () => { try { localStorage.setItem('dm-cookies', '1'); } catch (e) {} bar.remove(); };
      bar.querySelector('button').addEventListener('click', accept);
      document.addEventListener('DOMContentLoaded', () => document.body.appendChild(bar));
      if (document.readyState !== 'loading') document.body.appendChild(bar);
    }
  } catch (e) {}
})();
