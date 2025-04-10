// Theme switching functionality
document.addEventListener('DOMContentLoaded', () => {
  // Check for saved theme preference or use preferred color scheme
  const savedTheme = localStorage.getItem('theme');
  // Set initial theme
  if (savedTheme) {
    document.documentElement.setAttribute('data-theme', savedTheme);
    updateThemeToggle(savedTheme);
  }
  
  // Theme toggle button functionality
  const themeToggle = document.getElementById('theme-toggle');
  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
      const newTheme = currentTheme === 'light' ? 'dark' : 'light';
      
      document.documentElement.setAttribute('data-theme', newTheme);
      localStorage.setItem('theme', newTheme);
      updateThemeToggle(newTheme);
    });
  }
  
  // Mobile menu toggle - fixed to prevent clicking links behind
  const menuToggle = document.getElementById('mobile-menu-toggle');
  const navMenu = document.querySelector('nav');
  
  if (menuToggle && navMenu) {
    menuToggle.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      navMenu.classList.toggle('active');
    });
    
    // Close menu when clicking a link
    const navLinks = navMenu.querySelectorAll('a');
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('active');
      });
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
      if (!navMenu.contains(e.target) && !menuToggle.contains(e.target) && navMenu.classList.contains('active')) {
        navMenu.classList.remove('active');
      }
    });
  }
  
  // Close page button functionality (preserving original functionality)
  const closePageButton = document.getElementById('closePageButton');
  if (closePageButton) {
    closePageButton.addEventListener('click', () => {
      const voornaam = localStorage.getItem('voornaam') || '';
      const achternaam = localStorage.getItem('achternaam') || '';
      
      if (confirm(`Bedankt voor het bezoeken van mijn pagina ${voornaam} ${achternaam}!`)) {
        window.close();
      }
    });
  }
});

// Update theme toggle button appearance
function updateThemeToggle(theme) {
  const themeToggle = document.getElementById('theme-toggle');
  if (!themeToggle) return;
  
  const themeIcon = themeToggle.querySelector('.theme-toggle-icon');
  if (!themeIcon) return;
  
  if (theme === 'dark') {
    themeIcon.innerHTML = '☀️';
    themeToggle.querySelector('span').textContent = 'Light Mode';
  } else {
    themeIcon.innerHTML = '🌙';
    themeToggle.querySelector('span').textContent = 'Dark Mode';
  }
} 