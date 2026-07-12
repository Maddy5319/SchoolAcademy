// NEW ADDITION: Stop href="#" from jumping or crashing Live Server
document.addEventListener('click', function(e) {
  const target = e.target.closest('a');
  if(target && target.getAttribute('href') === '#') {
    e.preventDefault();
  }
});

// 1. Highlight "Home" tab on initial load
document.addEventListener('DOMContentLoaded', () => {
  const initialLink = document.querySelector(`.nav-links a[onclick*="'home'"]`);
  if(initialLink) initialLink.classList.add('active');
});

// 2. Page Navigation & Tab Highlighting
function showPage(id) {
  // Hide all pages & reset animations to replay them
  document.querySelectorAll('.page').forEach(p => {
    p.classList.remove('active');
    p.style.animation = 'none'; 
    p.offsetHeight; // Trigger reflow 
    p.style.animation = null; 
  });
  
  // Show Target Page safely
  const targetPage = document.getElementById('page-' + id);
  if(targetPage) {
      targetPage.classList.add('active');
      window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // Highlight Desktop Nav
  document.querySelectorAll('.nav-links a').forEach(link => link.classList.remove('active'));
  const activeDesktopLink = document.querySelector(`.nav-links a[onclick*="'${id}'"]`);
  if(activeDesktopLink) activeDesktopLink.classList.add('active');

  // Highlight Mobile Nav
  document.querySelectorAll('.mobile-menu a').forEach(link => link.classList.remove('active'));
  const activeMobileLink = document.querySelector(`.mobile-menu a[onclick*="'${id}'"]`);
  if(activeMobileLink) activeMobileLink.classList.add('active');
}

// 3. Mobile Menu Toggle
function toggleMenu() {
  document.getElementById('mobMenu').classList.toggle('open');
}

// 4. FAQ Accordion Toggle
function toggleFaq(element) {
  const item = element.parentElement;
  const isOpen = item.classList.contains('open');
  document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
  if (!isOpen) item.classList.add('open');
}

// 5. Listings Filter
function filterCards(btn, type) {
  document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  document.querySelectorAll('.listing-card').forEach(card => {
    if (type === 'all' || card.dataset.type === type) {
      card.style.display = 'flex';
      card.style.animation = 'fadeSlideUp 0.5s ease forwards';
    } else {
      card.style.display = 'none';
    }
  });
}

// 6. Form Submission Mock
function handleSubmit() {
  const name = document.getElementById('fname').value.trim();
  if (!name) return;
  alert('Thank you, ' + name + '! Your request for consultation has been securely received by the School Academy team. We will call you within 24 hours.');
  document.querySelector('form').reset();
}