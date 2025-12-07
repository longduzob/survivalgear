// ============================================
// SURVIVAL GEAR PRO - GLOBAL JAVASCRIPT
// ============================================

document.addEventListener('DOMContentLoaded', function() {
  
  // Dark mode toggle
  const themeToggle = document.querySelector('.theme-toggle');
  if (themeToggle) {
    themeToggle.addEventListener('click', function() {
      document.body.classList.toggle('dark-mode');
      localStorage.setItem('theme', 
        document.body.classList.contains('dark-mode') ? 'dark' : 'light'
      );
    });
    
    // Restore theme
    if (localStorage.getItem('theme') === 'dark') {
      document.body.classList.add('dark-mode');
    }
  }
  
  // Close topbar
  const closeTopbar = document.querySelector('.close-topbar');
  if (closeTopbar) {
    closeTopbar.addEventListener('click', function() {
      this.closest('.header-top-bar').style.display = 'none';
      localStorage.setItem('topbarClosed', 'true');
    });
    
    if (localStorage.getItem('topbarClosed') === 'true') {
      const topbar = document.querySelector('.header-top-bar');
      if (topbar) topbar.style.display = 'none';
    }
  }
  
  // Quick add to cart
  document.querySelectorAll('.quick-add-form').forEach(form => {
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      e.stopPropagation();
      
      const formData = new FormData(this);
      
      fetch('/cart/add.js', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          items: [{
            id: formData.get('id'),
            quantity: 1
          }]
        })
      })
      .then(response => response.json())
      .then(data => {
        const btn = this.querySelector('.quick-add-btn');
        const originalText = btn.textContent;
        btn.textContent = '✓ Ajouté !';
        btn.style.background = '#4CAF50';
        
        // Update cart count
        if (data.item_count) {
          document.querySelectorAll('.cart-count').forEach(el => {
            el.textContent = data.item_count;
          });
        }
        
        setTimeout(() => {
          btn.textContent = originalText;
          btn.style.background = '';
        }, 2000);
      })
      .catch(error => {
        console.error('Error:', error);
      });
    });
  });
  
  // Wishlist
  document.querySelectorAll('.wishlist-btn, .wishlist-toggle').forEach(btn => {
    btn.addEventListener('click', function(e) {
      e.preventDefault();
      e.stopPropagation();
      
      this.classList.toggle('active');
      
      const icon = this.querySelector('.wishlist-icon');
      if (icon) {
        icon.textContent = this.classList.contains('active') ? '♥' : '♡';
      }
    });
  });
  
  // Newsletter form
  const newsletterForm = document.querySelector('.newsletter-form');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', function(e) {
      e.preventDefault();
      const email = this.querySelector('input[type="email"]').value;
      
      if (email) {
        alert('Merci pour votre inscription !');
        this.reset();
      }
    });
  }
  
  // Contact form
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      alert('Message envoyé ! Nous vous répondrons dans les 24h.');
      this.reset();
    });
  }
  
});
