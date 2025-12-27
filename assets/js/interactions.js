// ============================================
// HMG LAB WEBSITE - INTERACTIONS.JS
// Form Handling, User Interactions, Events
// ============================================

// ===== FORM VALIDATION =====
function validateForm(form) {
  const inputs = form.querySelectorAll('input, textarea');
  let isValid = true;

  inputs.forEach(input => {
    if (!input.value.trim()) {
      isValid = false;
      input.style.borderColor = 'var(--accent)';
      input.style.boxShadow = '0 0 0 3px rgba(139, 69, 19, 0.2)';
    } else {
      input.style.borderColor = 'var(--border-color)';
      input.style.boxShadow = 'none';
    }
  });

  return isValid;
}

// ===== FORM SUBMISSION HANDLER =====
function handleFormSubmit(e) {
  e.preventDefault();
  const form = e.target;

  if (!validateForm(form)) {
    showNotification('Please fill in all fields', 'error');
    return;
  }

  // Collect form data
  const formData = new FormData(form);
  const data = Object.fromEntries(formData);

  // Log data (replace with actual API call)
  console.log('Form data:', data);

  // Show success message
  showNotification('Thank you! Your message has been sent.', 'success');

  // Reset form
  setTimeout(() => {
    form.reset();
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
  `;

  notification.textContent = message;
  document.body.appendChild(notification);

  setTimeout(() => {
    notification.style.animation = 'slideOutRight 0.4s ease-out';
    setTimeout(() => notification.remove(), 400);
  }, 3000);
}

// ===== DROPDOWN TOGGLE =====
function initializeDropdownHandlers() {
  const navItems = document.querySelectorAll('.nav-item');

  navItems.forEach(item => {
    const dropdown = item.querySelector('.dropdown');

    if (dropdown) {
      item.addEventListener('mouseenter', function() {
        dropdown.style.opacity = '1';
        dropdown.style.visibility = 'visible';
      });

      item.addEventListener('mouseleave', function() {
        dropdown.style.opacity = '0';
        dropdown.style.visibility = 'hidden';
      });
    }
  });
}

// ===== MODAL/POPUP HANDLERS =====
function openModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
  }
}

function closeModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
  }
}

// ===== BUTTON RIPPLE EFFECT =====
function initializeRippleEffect() {
  const buttons = document.querySelectorAll('.submit-btn, .pub-btn, .back-btn');

  buttons.forEach(button => {
    button.addEventListener('click', function(e) {
      const ripple = document.createElement('span');
      const rect = this.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      const x = e.clientX - rect.left - size / 2;
      const y = e.clientY - rect.top - size / 2;

      ripple.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.5);
        left: ${x}px;
        top: ${y}px;
        pointer-events: none;
        animation: ripple 0.6s ease-out;
      `;

      if (!this.style.position || this.style.position === 'static') {
        this.style.position = 'relative';
      }

      this.appendChild(ripple);

      setTimeout(() => ripple.remove(), 600);
    });
  });
}

// ===== COPY TO CLIPBOARD =====
function copyToClipboard(text) {
  navigator.clipboard.writeText(text).then(() => {
    showNotification('Copied to clipboard!', 'success');
  }).catch(err => {
    showNotification('Failed to copy', 'error');
  });
}

// ===== EXPORT TO CLIPBOARD HANDLER =====
function initializeClipboardHandlers() {
  const copyButtons = document.querySelectorAll('[data-copy]');

  copyButtons.forEach(button => {
    button.addEventListener('click', function() {
      const text = this.getAttribute('data-copy');
      copyToClipboard(text);
    });
  });
}

// ===== KEYBOARD SHORTCUTS =====
function initializeKeyboardShortcuts() {
  document.addEventListener('keydown', function(e) {
    // Escape to close modals
    if (e.key === 'Escape') {
      const openModals = document.querySelectorAll('[role="dialog"]');
      openModals.forEach(modal => {
        if (modal.style.display === 'flex') {
          modal.style.display = 'none';
        }
      });
    }

    // Ctrl/Cmd + K to focus search
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
      e.preventDefault();
      const searchInput = document.querySelector('input[type="search"]');
      if (searchInput) searchInput.focus();
    }
  });
}

// ===== INITIALIZE ALL ON LOAD =====
document.addEventListener('DOMContentLoaded', function() {
  const form = document.querySelector('.contact-form');
  if (form) {
    form.addEventListener('submit', handleFormSubmit);
  }

  initializeDropdownHandlers();
  initializeRippleEffect();
  initializeClipboardHandlers();
  initializeKeyboardShortcuts();
});

// Expose functions to global scope
window.openModal = openModal;
window.closeModal = closeModal;
window.copyToClipboard = copyToClipboard;
