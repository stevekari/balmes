// Cookie consent state
        let cookieChoice = null;

        // Check if user has already made a choice (for this session)
        function checkCookieConsent() {
            // In a real implementation, you might check localStorage or a cookie here
            // For this demo, we'll show the banner on first visit
            if (cookieChoice === null) {
                showCookieBanner();
            } else {
                showWebsite();
            }
        }

        // Show cookie banner
        function showCookieBanner() {
            const banner = document.getElementById('cookieBanner');
            banner.classList.add('show');
        }

        // Hide cookie banner and show website
        function hideCookieBanner() {
            const banner = document.getElementById('cookieBanner');
            banner.classList.remove('show');
            showWebsite();
        }

        // Show main website content
        function showWebsite() {
            const content = document.getElementById('websiteContent');
            const status = document.getElementById('cookieStatus');
            
            // Add a small delay for smooth transition
            setTimeout(() => {
                content.classList.add('show');
                status.classList.add('show');
            }, 300);
        }

        // Accept cookies
        function acceptCookies() {
            cookieChoice = 'accepted';
            
            // Update status indicator
            const status = document.getElementById('cookieStatus');
            status.textContent = '✅ Cookies Accepted';
            status.classList.add('status-accepted');
            
            // In a real implementation, you would:
            // - Set cookies/localStorage to remember choice
            // - Enable analytics/tracking scripts
            // - Load additional functionality
            
            hideCookieBanner();
            
            // Simulate cookie being set (in real implementation, you'd actually set cookies)
            console.log('Cookies accepted - enabling full functionality');
        }

        // Reject cookies
        function rejectCookies() {
            cookieChoice = 'rejected';
            
            // Update status indicator
            const status = document.getElementById('cookieStatus');
            status.textContent = '❌ Cookies Rejected';
            status.classList.add('status-rejected');
            
            // In a real implementation, you would:
            // - Remember choice without using cookies (maybe sessionStorage)
            // - Disable analytics/tracking scripts
            // - Run in privacy mode
            
            hideCookieBanner();
            
            console.log('Cookies rejected - running in privacy mode');
        }

        // Reset cookie choice (for demo purposes)
        function resetCookieChoice() {
            cookieChoice = null;
            location.reload();
        }

        // Initialize when page loads
        document.addEventListener('DOMContentLoaded', function() {
            checkCookieConsent();
        });

        // Handle escape key to close banner (accessibility)
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && cookieChoice === null) {
                rejectCookies(); // Default to reject on escape
            }
        });