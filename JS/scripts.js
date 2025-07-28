// Navbar background toggle on scroll
window.addEventListener('scroll', () => {
  const nav = document.querySelector('.navbar');
  nav.classList.toggle('solid', window.scrollY > 50);
});

// Sidebar toggle functionality
const hamburger = document.getElementById('hamburger-menu');
const sidebar = document.getElementById('sidebar');

if (hamburger && sidebar) {
  hamburger.addEventListener('click', () => {
    sidebar.classList.toggle('active');
  });

  // Close sidebar when clicking on any sidebar link
  sidebar.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      sidebar.classList.remove('active');
    });
  });

  // Close sidebar when clicking outside
  document.addEventListener('click', (e) => {
    if (!sidebar.contains(e.target) && !hamburger.contains(e.target)) {
      sidebar.classList.remove('active');
    }
  });
}

// Smooth scrolling for internal links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// Initialize AOS if available
document.addEventListener('DOMContentLoaded', function() {
  if (typeof AOS !== 'undefined') {
    AOS.init({
      once: true,
      duration: 850,
      easing: 'ease-out-cubic'
    });
  }
});

// Contact form validation (if you add a contact form later)
function validateContactForm(form) {
  const name = form.querySelector('input[name="name"]');
  const email = form.querySelector('input[name="email"]');
  const message = form.querySelector('textarea[name="message"]');
  
  let isValid = true;
  
  if (name && name.value.trim() === '') {
    showError(name, 'Name is required');
    isValid = false;
  }
  
  if (email && !isValidEmail(email.value)) {
    showError(email, 'Please enter a valid email');
    isValid = false;
  }
  
  if (message && message.value.trim() === '') {
    showError(message, 'Message is required');
    isValid = false;
  }
  
  return isValid;
}

function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function showError(field, message) {
  // Remove existing error
  const existingError = field.parentNode.querySelector('.error-message');
  if (existingError) {
    existingError.remove();
  }
  
  // Add new error
  const errorDiv = document.createElement('div');
  errorDiv.className = 'error-message';
  errorDiv.style.color = '#ff4444';
  errorDiv.style.fontSize = '0.9rem';
  errorDiv.style.marginTop = '0.5rem';
  errorDiv.textContent = message;
  
  field.parentNode.appendChild(errorDiv);
  field.style.borderColor = '#ff4444';
}

// Product search functionality (for products page)
function initProductSearch() {
  const searchInput = document.getElementById('search-input');
  if (searchInput) {
    searchInput.addEventListener('keyup', function() {
      const filter = this.value.toLowerCase();
      const categories = document.querySelectorAll('.category-block');
      
      categories.forEach(category => {
        let categoryHasMatch = false;
        const products = category.querySelectorAll('.product-list li');
        
        products.forEach(product => {
          if (product.textContent.toLowerCase().includes(filter)) {
            product.style.display = '';
            categoryHasMatch = true;
          } else {
            product.style.display = 'none';
          }
        });
        
        // Show/hide category based on matches
        if (categoryHasMatch || filter === '') {
          category.style.display = '';
        } else {
          category.style.display = 'none';
        }
      });
    });
  }
}

// Initialize product search on page load
document.addEventListener('DOMContentLoaded', initProductSearch);

// Lazy loading for images (optional optimization)
function initLazyLoading() {
  const images = document.querySelectorAll('img[data-src]');
  
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.classList.remove('lazy');
        imageObserver.unobserve(img);
      }
    });
  });
  
  images.forEach(img => imageObserver.observe(img));
}

// Initialize lazy loading if supported
if ('IntersectionObserver' in window) {
  document.addEventListener('DOMContentLoaded', initLazyLoading);
}

// Add loading animation
function showLoading() {
  const loader = document.createElement('div');
  loader.id = 'page-loader';
  loader.innerHTML = '<div class="spinner"></div>';
  loader.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(45, 62, 80, 0.9);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 9999;
  `;
  
  const spinner = loader.querySelector('.spinner');
  spinner.style.cssText = `
    width: 50px;
    height: 50px;
    border: 3px solid #E6E0D8;
    border-top: 3px solid #FF6F1E;
    border-radius: 50%;
    animation: spin 1s linear infinite;
  `;
  
  // Add spinner animation
  const style = document.createElement('style');
  style.textContent = `
    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
  `;
  document.head.appendChild(style);
  document.body.appendChild(loader);
  
  return loader;
}

function hideLoading() {
  const loader = document.getElementById('page-loader');
  if (loader) {
    loader.remove();
  }
}

// Show loading on page transitions
window.addEventListener('beforeunload', showLoading);
window.addEventListener('load', hideLoading);
