// ============================================
// HMG LAB WEBSITE - MAIN.JS
// DOM Initialization and Core Functions
// ============================================

// Initialization on DOM load
document.addEventListener('DOMContentLoaded', function() {
  initializeNavigation();
  initializeScrollBehavior();
  initializeSectionToggle();
});

// ===== NAVIGATION FUNCTIONS =====
function initializeNavigation() {
  const navLinks = document.querySelectorAll('.nav-link');

  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href && href.startsWith('#')) {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
          target.scrollIntoView({ behavior: 'smooth' });
        }
      }
    });
  });
}

// ===== SCROLL BEHAVIOR =====
function initializeScrollBehavior() {
  let scrollTimeout;

  window.addEventListener('scroll', function() {
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(function() {
      updateActiveNavigation();
    }, 100);
  });
}

// Update active navigation based on scroll position
function updateActiveNavigation() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  let currentSection = '';

  sections.forEach(section => {
    const sectionTop = section.offsetTop;
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

// ===== SECTION TOGGLE FUNCTIONS =====
function initializeSectionToggle() {
  const navLinks = document.querySelectorAll('.nav-link');

  navLinks.forEach(link => {
    link.addEventListener('click', function() {
      const href = this.getAttribute('href');
      if (href && href !== '#') {
        toggleSections(href.substring(1));
      }
    });
  });
}

function toggleSections(sectionId) {
  const allSections = document.querySelectorAll('section');

  allSections.forEach(section => {
    if (section.id === sectionId) {
      section.classList.remove('hidden');
    } else {
      section.classList.add('hidden');
    }
  });
}

// ===== FORM SUBMISSION =====
function initializeFormHandler() {
  const form = document.querySelector('.contact-form');

  if (form) {
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      handleFormSubmission(this);
    });
  }
}

function handleFormSubmission(form) {
  const formData = new FormData(form);

  // Log form data (replace with actual submission logic)
  console.log('Form submitted:', Object.fromEntries(formData));

  // Show success message
  alert('Thank you for your message! We will get back to you soon.');
  form.reset();
}

// Initialize form handler on load
document.addEventListener('DOMContentLoaded', initializeFormHandler);

// ===== UTILITY FUNCTIONS =====
function smoothScroll(target) {
  if (typeof target === 'string') {
    target = document.querySelector(target);
  }

  if (target) {
    target.scrollIntoView({ behavior: 'smooth' });
  }
}

// Expose to global scope for HTML onclick attributes
window.smoothScroll = smoothScroll;
