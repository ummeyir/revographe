// ===== Helpers =====
const $ = (sel, parent = document) => parent.querySelector(sel);
const $$ = (sel, parent = document) => Array.from(parent.querySelectorAll(sel));

function showToast(title, message) {
  const toast = $('#toast');
  if (!toast) return;

  toast.innerHTML = `<b>${title}</b><div style="margin-top:.25rem;opacity:.9">${message}</div>`;
  toast.classList.add('show');

  window.clearTimeout(window.__toastTimer);
  window.__toastTimer = window.setTimeout(() => {
    toast.classList.remove('show');
  }, 2800);
}

// ===== Navbar (mobile) =====
function initNavbar() {
  const burger = $('#burger');
  const links = $('#navLinks');
  if (!burger || !links) return;

  burger.addEventListener('click', () => {
    links.classList.toggle('open');
    burger.setAttribute('aria-expanded', links.classList.contains('open') ? 'true' : 'false');
  });

  // Close on link click (mobile)
  $$('#navLinks a').forEach(a => {
    a.addEventListener('click', () => links.classList.remove('open'));
  });
}

// ===== Forms (front only) =====
function initForms() {
  const dreamForm = $('#dreamForm');
  if (dreamForm) {
    dreamForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const text = $('#dreamText').value.trim();
      if (!text) {
        showToast("Oups", "Écris un petit bout de rêve avant d’envoyer ✨");
        return;
      }
      showToast("Rêve enregistré", "Pour l’instant c’est une démo (pas d’IA), mais c’est bien pris en compte !");
      dreamForm.reset();
    });
  }

  const contactForm = $('#contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      showToast("Message envoyé", "On te répondra dès que possible 💌 (démo front-end)");
      contactForm.reset();
    });
  }
}

// ===== Active link =====
function setActiveLink() {
  const path = window.location.pathname.split('/').pop() || 'index.html';
  $$('#navLinks a').forEach(a => {
    const href = a.getAttribute('href');
    if (href === path) a.classList.add('active');
  });
}

// ===== Home intro video =====
function initIntroVideo() {
  if (!document.body.classList.contains('home-page')) return;

  const introScreen = $('#introVideoScreen');
  const introVideo = $('#introVideo');
  const skipIntroBtn = $('#skipIntroBtn');
  if (!introScreen || !introVideo) return;

  const closeIntro = () => {
    introVideo.pause();
    introScreen.classList.add('is-hidden');
  };

  const fallbackTimer = window.setTimeout(closeIntro, 9000);

  introVideo.addEventListener('ended', () => {
    window.clearTimeout(fallbackTimer);
    closeIntro();
  });

  introVideo.play().catch(() => {
    window.clearTimeout(fallbackTimer);
    window.setTimeout(closeIntro, 600);
  });

  if (skipIntroBtn) {
    skipIntroBtn.addEventListener('click', () => {
      window.clearTimeout(fallbackTimer);
      closeIntro();
    });
  }
}

document.addEventListener('DOMContentLoaded', () => {
  initIntroVideo();
  initNavbar();
  initForms();
  setActiveLink();
});
