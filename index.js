// Toggle Menu Functionality
document.addEventListener('DOMContentLoaded', function() {
    const toggleBar = document.getElementById('toggleBar');
    const navUl = document.querySelector('nav ul');
    
    // Toggle menu when hamburger is clicked
    toggleBar.addEventListener('click', function() {
        toggleBar.classList.toggle('active');
        navUl.classList.toggle('open');
        
        // Prevent scrolling when menu is open
        if (navUl.classList.contains('open')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    });
    
    // Close menu when clicking on a link
    const navLinks = document.querySelectorAll('nav ul li a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            toggleBar.classList.remove('active');
            navUl.classList.remove('open');
            document.body.style.overflow = '';
        });
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!toggleBar.contains(e.target) && !navUl.contains(e.target)) {
            toggleBar.classList.remove('active');
            navUl.classList.remove('open');
            document.body.style.overflow = '';
        }
    });
    
    // Close menu on window resize if it's large enough
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768) {
            toggleBar.classList.remove('active');
            navUl.classList.remove('open');
            document.body.style.overflow = '';
        }
    });
    
    // Handle escape key to close menu
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && navUl.classList.contains('open')) {
            toggleBar.classList.remove('active');
            navUl.classList.remove('open');
            document.body.style.overflow = '';
        }
    });
});