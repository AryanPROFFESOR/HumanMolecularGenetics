// ============================================
// HMG LAB WEBSITE - ANIMATIONS.JS
// Scroll Effects, Reveal Logic, Navigation, Hover Animations
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

  // Observe all sections and cards
  const elementsToObserve = document.querySelectorAll(
    'section, .research-card, .member-card, .publication-item, .news-item, .alumni-card'
  );

  elementsToObserve.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
    observer.observe(el);
  });
}

// ===== SCROLL TO TOP BUTTON =====
function initializeScrollToTop() {
  // Create scroll to top button
  let scrollBtn = document.getElementById('scrollToTop');
  
  if (!scrollBtn) {
    scrollBtn = document.createElement('button');
    scrollBtn.id = 'scrollToTop';
    scrollBtn.innerHTML = '↑';
    scrollBtn.setAttribute('aria-label', 'Scroll to top');
    scrollBtn.style.cssText = `
      position: fixed;
      bottom: 30px;
      right: 30px;
      width: 50px;
      height: 50px;
      background: var(--accent);
      color: white;
      border: none;
      border-radius: 50%;
      cursor: pointer;
      font-size: 1.5rem;
      opacity: 0;
      visibility: hidden;
      transition: all 0.3s ease;
      z-index: 999;
      box-shadow: 0 4px 12px rgba(139, 69, 19, 0.3);
    `;
    document.body.appendChild(scrollBtn);
  }

  // Show/hide button based on scroll position
  window.addEventListener('scroll', function() {
    if (window.pageYOffset > 300) {
      scrollBtn.style.opacity = '1';
      scrollBtn.style.visibility = 'visible';
    } else {
      scrollBtn.style.opacity = '0';
      scrollBtn.style.visibility = 'hidden';
    }
  }, { passive: true });

  // Scroll to top on click
  scrollBtn.addEventListener('click', function() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

// ===== PARALLAX EFFECT (Optional) =====
function initializeParallaxEffect() {
  const parallaxElements = document.querySelectorAll('[data-parallax]');

  if (parallaxElements.length === 0) return;

  window.addEventListener('mousemove', function(e) {
    parallaxElements.forEach(el => {
      const speed = el.getAttribute('data-parallax') || 5;
      const x = (window.innerWidth - e.clientX * speed) / 100;
      const y = (window.innerHeight - e.clientY * speed) / 100;

      el.style.transform = `translate(${x}px, ${y}px)`;
    });
  });
}

// ===== IMAGE LAZY LOADING =====
function initializeLazyLoading() {
  if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          if (img.dataset.src) {
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
            observer.unobserve(img);
          }
        }
      });
    });

    const lazyImages = document.querySelectorAll('img[data-src]');
    lazyImages.forEach(img => imageObserver.observe(img));
  }
}

// ===== COUNTER ANIMATION (for stats/numbers) =====
function animateCounter(element, target, duration = 2000) {
  if (!element) return;
  
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

// ===== PERFORMANCE: DEBOUNCE FUNCTION =====
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// ===== INITIALIZE ALL ON DOM LOAD =====
document.addEventListener('DOMContentLoaded', function() {
  console.log('Initializing HMG Lab animations...');
  
  // Core animations
  initializeScrollReveal();
  initializeScrollToTop();
  
  // Optional features
  initializeParallaxEffect();
  initializeLazyLoading();
  
  console.log('HMG Lab animations initialized successfully!');
});

// Expose functions to global scope
window.animateCounter = animateCounter;