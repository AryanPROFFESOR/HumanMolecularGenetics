// ============================================
// HMG LAB WEBSITE - ANIMATIONS.JS
// Scroll Effects, Reveal Logic, Hover Animations
// ============================================

// ===== SCROLL REVEAL ANIMATION =====
function initializeScrollReveal() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
  };

  const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, observerOptions);

  // Observe all cards and sections
  const elementsToObserve = document.querySelectorAll(
    '.research-card, .member-card, .publication-item, .news-item, .gallery-item'
  );

  elementsToObserve.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'all 0.6s ease-out';
    observer.observe(el);
  });
}

// ===== HOVER PARALLAX EFFECT =====
function initializeParallaxEffect() {
  const parallaxElements = document.querySelectorAll('[data-parallax]');

  if (parallaxElements.length === 0) return;

  window.addEventListener('mousemove', function(e) {
    parallaxElements.forEach(el => {
      const speed = el.getAttribute('data-parallax');
      const x = (window.innerWidth - e.clientX * speed) / 100;
      const y = (window.innerHeight - e.clientY * speed) / 100;

      el.style.transform = `translate(${x}px, ${y}px)`;
    });
  });
}

// ===== GALLERY LIGHTBOX =====
function initializeGalleryLightbox() {
  const galleryItems = document.querySelectorAll('.gallery-item');

  galleryItems.forEach((item, index) => {
    item.addEventListener('click', function() {
      openLightbox(index);
    });
  });
}

function openLightbox(index) {
  console.log('Gallery item clicked:', index);
  // Implement lightbox functionality here
}

// ===== SMOOTH SCROLL ENHANCE =====
function initializeSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href !== '#') {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
          target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      }
    });
  });
}

// ===== NAVBAR STICKY EFFECT =====
function initializeStickyHeader() {
  const header = document.querySelector('header');
  let lastScrollTop = 0;

  window.addEventListener('scroll', function() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    if (scrollTop > lastScrollTop) {
      // Scroll down
      header.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.1)';
    } else {
      // Scroll up
      header.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.06)';
    }

    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
  });
}

// ===== CARD TILT EFFECT =====
function initializeCardTilt() {
  const cards = document.querySelectorAll('.research-card, .member-card, .publication-item');

  cards.forEach(card => {
    card.addEventListener('mousemove', function(e) {
      const rect = this.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = (y - centerY) / 10;
      const rotateY = (centerX - x) / 10;

      this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });

    card.addEventListener('mouseleave', function() {
      this.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
    });
  });
}

// ===== COUNTER ANIMATION =====
function animateCounter(element, target, duration = 2000) {
  const increment = target / (duration / 16);
  let current = 0;

  const updateCounter = () => {
    current += increment;
    if (current < target) {
      element.textContent = Math.ceil(current);
      requestAnimationFrame(updateCounter);
    } else {
      element.textContent = target;
    }
  };

  updateCounter();
}

// ===== INITIALIZE ALL ON LOAD =====
document.addEventListener('DOMContentLoaded', function() {
  initializeScrollReveal();
  initializeParallaxEffect();
  initializeGalleryLightbox();
  initializeSmoothScroll();
  initializeStickyHeader();
  initializeCardTilt();
});
