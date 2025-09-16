
function handleFormSubmit(e) {
    e.preventDefault();

    const nameInput = document.getElementById('customerName');
    const emailInput = document.getElementById('customerEmail');
    const phoneInput = document.getElementById('customerPhone');

    // Clear previous error messages
    document.querySelectorAll('.error-message').forEach(span => span.textContent = '');

    let isValid = true;

    // --- Validation Logic ---
    
    // 1. Validate Name: Must not be empty
    if (nameInput.value.trim() === '') {
        nameInput.nextElementSibling.textContent = 'El nombre es obligatorio.';
        isValid = false;
    }

    // 2. Validate Email: Must be a valid format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailInput.value.trim())) {
        emailInput.nextElementSibling.textContent = 'Por favor, introduce un email válido.';
        isValid = false;
    }

    // 3. Validate Phone: Must be between 6 and 12 digits
    const phoneRegex = /^\d{6,12}$/;
    if (!phoneRegex.test(phoneInput.value.trim())) {
        phoneInput.nextElementSibling.textContent = 'El teléfono debe tener entre 6 y 12 dígitos.';
        isValid = false;
    }

    // --- If validation fails, stop the function ---
    if (!isValid) {
        return;
    }
    
    // --- If validation passes, continue with original logic ---

    const formData = new FormData(contactForm);
    const orderData = {
        name: formData.get('customerName'),
        email: formData.get('customerEmail'),
        phone: formData.get('customerPhone'),
        message: formData.get('customerMessage'),
        cart: cart,
        total: cart.reduce((sum, item) => sum + (item.price * item.quantity), 0)
    };

    console.log('Order submitted:', orderData);

    // Show success message
    contactForm.style.display = 'none';
    successMessage.style.display = 'block';

    // Clear cart and close modal after a delay
    setTimeout(() => {
        cart = [];
        updateCartDisplay();
        closeContactForm();
        if (sideCart.classList.contains('open')) {
            toggleCart(); // Close cart if it's open
        }
    }, 2500);
}