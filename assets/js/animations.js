// ============================================
// HMG LAB WEBSITE - ANIMATIONS.JS (FINAL VERSION)
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

// ===== SMOOTH SCROLL FOR NAVIGATION =====
function initializeSmoothScroll() {
  // Handle all anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      
      // Skip if href is just "#"
      if (href === '#') return;
      
      e.preventDefault();
      const target = document.querySelector(href);
      
      if (target) {
        // Calculate offset for sticky header
        const headerOffset = 80; // Adjust based on your header height
        const elementPosition = target.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
}

// ===== NAVBAR STICKY EFFECT & SCROLL BEHAVIOR =====
function initializeStickyHeader() {
  const header = document.querySelector('header');
  if (!header) return;
  
  let lastScrollTop = 0;
  let isScrolling = false;

  window.addEventListener('scroll', function() {
    // Use requestAnimationFrame for better performance
    if (!isScrolling) {
      window.requestAnimationFrame(function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

        if (scrollTop > lastScrollTop && scrollTop > 100) {
          // Scrolling down - enhance shadow
          header.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.1)';
        } else {
          // Scrolling up - lighter shadow
          header.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.06)';
        }

        // Add background when scrolled
        if (scrollTop > 50) {
          header.style.background = 'rgba(255, 255, 255, 0.98)';
          header.style.backdropFilter = 'blur(10px)';
        } else {
          header.style.background = 'white';
          header.style.backdropFilter = 'none';
        }

        lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
        isScrolling = false;
      });

      isScrolling = true;
    }
  }, { passive: true });
}

// ===== ACTIVE NAVIGATION HIGHLIGHTING =====
function initializeActiveNavigation() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link[href^="#"]');

  if (sections.length === 0 || navLinks.length === 0) return;

  window.addEventListener('scroll', function() {
    let current = '';
    const scrollPosition = window.pageYOffset + 200; // Offset for better UX

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      
      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      const href = link.getAttribute('href');
      
      if (href === '#' + current) {
        link.classList.add('active');
      }
    });
  }, { passive: true });
}

// ===== PUBLICATION ABSTRACT TOGGLE =====
function toggleAbstract(abstractId, button) {
  const abstract = document.getElementById(abstractId);
  if (!abstract) return;
  
  const isCollapsed = abstract.classList.contains('collapsed');
  
  if (isCollapsed) {
    abstract.classList.remove('collapsed');
    button.textContent = 'Read Less';
    
    // Smooth scroll to show full abstract if needed
    setTimeout(() => {
      const rect = abstract.getBoundingClientRect();
      if (rect.bottom > window.innerHeight) {
        abstract.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
    }, 100);
  } else {
    abstract.classList.add('collapsed');
    button.textContent = 'Read More';
  }
}

// Make toggleAbstract available globally
window.toggleAbstract = toggleAbstract;

// ===== HOVER PARALLAX EFFECT (Optional) =====
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
  // Implement lightbox functionality here if needed
  // You can add a modal/overlay to display full-size images
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

// ===== SCROLL TO TOP BUTTON (Optional) =====
function initializeScrollToTop() {
  // Create scroll to top button if it doesn't exist
  let scrollBtn = document.getElementById('scrollToTop');
  
  if (!scrollBtn) {
    scrollBtn = document.createElement('button');
    scrollBtn.id = 'scrollToTop';
    scrollBtn.innerHTML = '↑';
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
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
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
  initializeSmoothScroll();
  initializeStickyHeader();
  initializeActiveNavigation();
  
  // Optional features
  initializeParallaxEffect();
  initializeGalleryLightbox();
  initializeScrollToTop();
  
  console.log('HMG Lab animations initialized successfully!');
});

// ===== PERFORMANCE: LAZY LOADING IMAGES =====
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

  // Observe all images with data-src attribute
  document.addEventListener('DOMContentLoaded', function() {
    const lazyImages = document.querySelectorAll('img[data-src]');
    lazyImages.forEach(img => imageObserver.observe(img));
  });
}