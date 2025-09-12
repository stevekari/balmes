document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('contactForm');
    const notification = document.getElementById('notification');
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Simulate form submission
        setTimeout(() => {
            // Show notification
            notification.classList.add('show');
            
            // Hide notification after 3 seconds
            setTimeout(() => {
                notification.classList.remove('show');
            }, 3000);
            
            // Reset form
            form.reset();
            
            // Reset labels position
            const labels = document.querySelectorAll('.form-group label');
            labels.forEach(label => {
                label.style.top = '15px';
                label.style.left = '10px';
                label.style.fontSize = '16px';
                label.style.color = '#999';
            });
            
            // Reset focus borders
            const borders = document.querySelectorAll('.focus-border');
            borders.forEach(border => {
                border.style.width = '0';
            });
            
        }, 1000);
    });
    
    // Add focus effects to form elements
    const inputs = document.querySelectorAll('.form-group input, .form-group textarea');
    inputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.parentElement.querySelector('.focus-border').style.width = '100%';
            const label = this.parentElement.querySelector('label');
            label.style.top = '-20px';
            label.style.left = '0';
            label.style.fontSize = '12px';
            label.style.color = '#4a6cf7';
        });
        
        input.addEventListener('blur', function() {
            if (!this.value) {
                this.parentElement.querySelector('.focus-border').style.width = '0';
                const label = this.parentElement.querySelector('label');
                label.style.top = '15px';
                label.style.left = '10px';
                label.style.fontSize = '16px';
                label.style.color = '#999';
            }
        });
    });
    
    // Add shake animation if form is submitted with empty fields
    form.addEventListener('submit', function(e) {
        let hasEmptyFields = false;
        inputs.forEach(input => {
            if (!input.value.trim()) {
                hasEmptyFields = true;
                input.parentElement.classList.add('shake');
                setTimeout(() => {
                    input.parentElement.classList.remove('shake');
                }, 500);
            }
        });
        
        if (hasEmptyFields) {
            e.preventDefault();
        }
    });
});