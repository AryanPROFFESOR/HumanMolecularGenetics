// ============================================
// HMG LAB WEBSITE - MAIN.JS (MULTI-PAGE VERSION)
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
  
  // Close mobile menu when clicking nav links
  document.querySelectorAll('.nav-link, .dropdown-item').forEach(link => {
    link.addEventListener('click', function() {
      const nav = document.getElementById('mainNav');
      if (window.innerWidth <= 768 && nav.classList.contains('active')) {
        nav.classList.remove('active');
      }
    });
  });
  
  // Initialize scroll behavior for sticky header
  initializeScrollBehavior();
  
  console.log('HMG Lab Website Initialized Successfully!');
});

// ===== SCROLL BEHAVIOR FOR STICKY HEADER =====
function initializeScrollBehavior() {
  const header = document.querySelector('header');
  if (!header) return;
  
  let lastScrollTop = 0;

  window.addEventListener('scroll', function() {
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

// ===== FORM SUBMISSION HANDLER =====
function handleFormSubmit(e) {
  e.preventDefault();
  
  const formData = new FormData(e.target);
  const data = Object.fromEntries(formData);

  // Log form data (replace with actual API call)
  console.log('Form submitted:', data);

  // Show success message
  alert('Thank you for your message! We will get back to you soon.');
  
  // Reset form
  setTimeout(() => {
    e.target.reset();
  }, 1000);
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

// Expose functions to global scope for HTML onclick attributes
window.toggleMobileMenu = toggleMobileMenu;
window.handleFormSubmit = handleFormSubmit;
window.toggleAbstract = toggleAbstract;