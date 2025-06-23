document.addEventListener('DOMContentLoaded', () => {
  // --- Element Selections ---
  const preloader = document.getElementById('preloader');
  const content = document.getElementById('content');
  const themeToggle = document.getElementById('theme-toggle');
  const body = document.body;
  const navbar = document.querySelector('.navbar');
  const logo = document.querySelector('.logo');
  const progress = document.querySelector('.loader-progress');
  const loaderTextContainer = document.getElementById('loader-text-container');
  const chatToggleButton = document.getElementById('chat-toggle-button');
  const chatPopup = document.getElementById('chat-popup');
  const chatCloseButton = document.getElementById('chat-close-button');
  const modalTriggers = document.querySelectorAll('.modal-trigger');
  const modal = document.getElementById('content-modal');
  const revealElements = document.querySelectorAll('.section h2, .card');
  const offlineIndicator = document.getElementById('offline-indicator');

  // --- Reload on Logo Click ---
  if (logo) {
    logo.addEventListener('click', (e) => {
      e.preventDefault();
      location.reload();
    });
  }

  // --- Show Random Word Logic ---
  const hueWords = ["Kinh thành", "Sông Hương", "Cung đình", "Di sản", "Ẩm thực", "Lịch sử", "Thơ mộng"];

  function showRandomWord() {
    if (!loaderTextContainer) return;
    const randomIndex = Math.floor(Math.random() * hueWords.length);
    const text = `Khám phá ${hueWords[randomIndex]}`;
    
    loaderTextContainer.innerHTML = '';
    text.split('').forEach((char, index) => {
      const charSpan = document.createElement('span');
      // Use non-breaking space for actual spaces to maintain layout
      charSpan.innerHTML = char === ' ' ? '&nbsp;' : char;
      charSpan.style.animationDelay = `${index * 0.05}s`;
      loaderTextContainer.appendChild(charSpan);
    });
  }

  // --- Preloader Logic ---
  if (preloader && progress) {
    document.body.style.overflow = 'hidden';
    showRandomWord(); // Show a single random word
    progress.addEventListener('animationend', () => {
      content.classList.remove('hidden');
      preloader.classList.add('preloader-hidden');
      preloader.addEventListener('transitionend', () => {
        document.body.style.overflow = 'auto';
        if (preloader) {
          preloader.style.display = 'none';
        }
      }, { once: true });
    });
  } else if (content) {
    content.classList.remove('hidden');
  }

  // --- Navbar Scroll Effect ---
  if (navbar) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    });
  }

  // --- Theme Switcher Logic ---
  if (themeToggle && body) {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      body.setAttribute('data-theme', savedTheme);
    }
    themeToggle.addEventListener('click', () => {
      if (body.getAttribute('data-theme') === 'dark') {
        body.removeAttribute('data-theme');
        localStorage.removeItem('theme');
      } else {
        body.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
      }
    });
  }

  // --- Scroll Reveal Animation ---
  if (revealElements.length > 0) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });
    revealElements.forEach(element => {
      revealObserver.observe(element);
    });
  }

  // --- Chatbox Popup Logic ---
  if (chatToggleButton && chatPopup && chatCloseButton) {
    chatToggleButton.addEventListener('click', () => {
      chatPopup.classList.toggle('is-visible');
    });
    chatCloseButton.addEventListener('click', () => {
      chatPopup.classList.remove('is-visible');
    });
  }

  // --- Content Modal Logic ---
  if (modal && modalTriggers.length > 0) {
    const modalCloseButton = document.getElementById('modal-close-button');
    const modalImage = document.getElementById('modal-image');
    const modalTitle = document.getElementById('modal-title');
    const modalDescription = document.getElementById('modal-description');
    const modalDetails = document.getElementById('modal-details');

    const openModal = (trigger) => {
      const title = trigger.dataset.title;
      const imgSrc = trigger.dataset.imgSrc;
      const description = trigger.dataset.description;
      const details = trigger.dataset.details;

      modalTitle.textContent = title;
      modalImage.src = imgSrc;
      modalImage.alt = title;
      modalDescription.textContent = description;

      if (details) {
        modalDetails.innerHTML = details;
        modalDetails.style.display = 'block';
      } else {
        modalDetails.innerHTML = '';
        modalDetails.style.display = 'none';
      }

      modal.classList.add('is-visible');
      document.body.style.overflow = 'hidden';
    };

    const closeModal = () => {
      modal.classList.remove('is-visible');
      document.body.style.overflow = 'auto';
    };

    modalTriggers.forEach(trigger => {
      trigger.addEventListener('click', () => openModal(trigger));
    });

    modalCloseButton.addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        closeModal();
      }
    });
  }

  // --- Offline/Online Status Indicator ---
  function updateOnlineStatus() {
    if (navigator.onLine) {
      offlineIndicator.classList.remove('is-visible');
    } else {
      offlineIndicator.classList.add('is-visible');
    }
  }

  window.addEventListener('online', updateOnlineStatus);
  window.addEventListener('offline', updateOnlineStatus);

  // Initial check
  updateOnlineStatus();
});
