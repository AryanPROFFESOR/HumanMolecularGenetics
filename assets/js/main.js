// ============================================
// HMG LAB WEBSITE - MAIN.JS
// DOM Initialization and Core Functions
// ============================================

// Mobile Menu Toggle
function toggleMobileMenu() {
  const nav = document.getElementById('mainNav');
  nav.classList.toggle('active');
}

// Initialization on DOM load
document.addEventListener('DOMContentLoaded', function() {
  console.log('HMG Lab Website Initializing...');
  
  initializeNavigation();
  initializeScrollBehavior();
  initializeFormHandler();
  
  console.log('HMG Lab Website Initialized Successfully!');
});

// ===== NAVIGATION FUNCTIONS =====
function initializeNavigation() {
  const navLinks = document.querySelectorAll('.nav-link, .dropdown-item');

  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href && href.startsWith('#')) {
        e.preventDefault();
        
        // Close mobile menu if open
        const nav = document.getElementById('mainNav');
        if (window.innerWidth <= 768) {
          nav.classList.remove('active');
        }
        
        // Scroll to target
        const target = document.querySelector(href);
        if (target) {
          const headerOffset = 100;
          const elementPosition = target.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
          
          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }
      }
    });
  });
}

// ===== SCROLL BEHAVIOR =====
function initializeScrollBehavior() {
  let scrollTimeout;
  let lastScrollTop = 0;
  const header = document.querySelector('header');

  window.addEventListener('scroll', function() {
    clearTimeout(scrollTimeout);
    
    scrollTimeout = setTimeout(function() {
      updateActiveNavigation();
    }, 100);
    
    // Header scroll effect
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (scrollTop > 50) {
      header.style.background = 'rgba(255, 255, 255, 0.98)';
      header.style.backdropFilter = 'blur(10px)';
      header.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.1)';
    } else {
      header.style.background = 'white';
      header.style.backdropFilter = 'none';
      header.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.06)';
    }
    
    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
  }, { passive: true });
}

// Update active navigation based on scroll position
function updateActiveNavigation() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link, .dropdown-item');

  let currentSection = '';

  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    if (window.scrollY >= sectionTop - 200) {
      currentSection = section.getAttribute('id');
    }
  });

  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === '#' + currentSection) {
      link.classList.add('active');
    }
  });
}

// ===== FORM SUBMISSION =====
function initializeFormHandler() {
  const form = document.querySelector('.contact-form');
  
  if (form) {
    form.addEventListener('submit', handleFormSubmit);
  }
}

function handleFormSubmit(e) {
  e.preventDefault();
  
  const formData = new FormData(e.target);
  const data = Object.fromEntries(formData);

  // Log form data (replace with actual submission logic)
  console.log('Form submitted:', data);

  // Show success message
  showNotification('Thank you for your message! We will get back to you soon.', 'success');
  
  // Reset form
  setTimeout(() => {
    e.target.reset();
  }, 1000);
}

// ===== NOTIFICATION SYSTEM =====
function showNotification(message, type = 'info') {
  const notification = document.createElement('div');
  notification.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    padding: 1rem 1.5rem;
    background: ${type === 'success' ? '#22c55e' : type === 'error' ? '#ef4444' : '#3b82f6'};
    color: white;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    z-index: 9999;
    animation: slideInRight 0.4s ease-out;
    font-weight: 500;
  `;

  notification.textContent = message;
  document.body.appendChild(notification);

  setTimeout(() => {
    notification.style.animation = 'slideOutRight 0.4s ease-out';
    setTimeout(() => notification.remove(), 400);
  }, 3000);
}

// ===== UTILITY FUNCTIONS =====
function smoothScroll(target) {
  if (typeof target === 'string') {
    target = document.querySelector(target);
  }

  if (target) {
    const headerOffset = 100;
    const elementPosition = target.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
    
    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    });
  }
}

// Publication Abstract Toggle
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

// Expose functions to global scope for HTML onclick attributes
window.smoothScroll = smoothScroll;
window.toggleMobileMenu = toggleMobileMenu;
window.toggleAbstract = toggleAbstract;
window.handleFormSubmit = handleFormSubmit;