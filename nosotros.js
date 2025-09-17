  // Mobile Menu Toggle Functionality
        const toggleBar = document.getElementById('toggleBar');
        const navMenu = document.getElementById('navMenu');

        toggleBar.addEventListener('click', () => {
            toggleBar.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Close mobile menu when clicking on a link
        const navLinks = document.querySelectorAll('nav ul li a');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                toggleBar.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });

        // Close mobile menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!toggleBar.contains(e.target) && !navMenu.contains(e.target)) {
                toggleBar.classList.remove('active');
                navMenu.classList.remove('active');
            }
        });

        // Header scroll effect
        window.addEventListener('scroll', () => {
            const header = document.querySelector('header');
            if (window.scrollY > 100) {
                header.style.background = 'rgba(44, 24, 16, 0.98)';
            } else {
                header.style.background = 'rgba(44, 24, 16, 0.95)';
            }
        });

        // Smooth scrolling for anchor links
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

        // Cart functionality placeholder
        let cartCount = 0;
        const cartCountElement = document.getElementById('cart-count');
        
        function updateCartCount() {
            cartCountElement.textContent = cartCount;
            if (cartCount > 0) {
                cartCountElement.style.display = 'flex';
            } else {
                cartCountElement.style.display = 'none';
            }
        }

        // Initialize cart
        updateCartCount();

        // Add loading animation
        window.addEventListener('load', () => {
            document.body.style.opacity = '0';
            document.body.style.transition = 'opacity 0.3s ease';
            
            setTimeout(() => {
                document.body.style.opacity = '1';
            }, 100);
        });