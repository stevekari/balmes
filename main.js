// Cart functionality
    let cart = [];
    
    // DOM Elements
    const cartToggle = document.getElementById('cartToggle');
    const sideCart = document.getElementById('sideCart');
    const closeCart = document.getElementById('closeCart');
    const cartCount = document.getElementById('cart-count');
    const cartItems = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    const openForm = document.getElementById('openForm');
    const contactModal = document.getElementById('contactModal');
    const closeForm = document.getElementById('closeForm');
    const contactForm = document.getElementById('contactForm');
    const successMessage = document.getElementById('success-message');

    // Add event listeners
    cartToggle.addEventListener('click', toggleCart);
    closeCart.addEventListener('click', toggleCart);
    openForm.addEventListener('click', openContactForm);
    closeForm.addEventListener('click', closeContactForm);
    contactForm.addEventListener('submit', handleFormSubmit);

    // Add event listeners to all add-to-cart buttons
    addToCartButtons.forEach(button => {
        button.addEventListener('click', addToCart);
    });

    // Close modal when clicking outside
    window.addEventListener('click', (e) => {
        if (e.target === contactModal) {
            closeContactForm();
        }
    });

    function toggleCart() {
        sideCart.classList.toggle('open');
    }

    function addToCart(e) {
        e.preventDefault();
        const name = e.target.getAttribute('data-name');
        const price = parseFloat(e.target.getAttribute('data-price'));

        // Check if item already exists in cart
        const existingItem = cart.find(item => item.name === name);
        
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({
                name: name,
                price: price,
                quantity: 1
            });
        }

        updateCartDisplay();
        
        // Show a brief animation or feedback
        e.target.style.transform = 'scale(0.95)';
        setTimeout(() => {
            e.target.style.transform = 'scale(1)';
        }, 150);
    }

    function removeFromCart(index) {
        cart.splice(index, 1);
        updateCartDisplay();
    }

    function updateQuantity(index, change) {
        cart[index].quantity += change;
        if (cart[index].quantity <= 0) {
            removeFromCart(index);
        } else {
            updateCartDisplay();
        }
    }

    function updateCartDisplay() {
        // Update cart count
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        cartCount.textContent = totalItems;

        // Update cart items
        if (cart.length === 0) {
            cartItems.innerHTML = `
                <div class="empty-cart">
                    <i class="fa-solid fa-shopping-cart" style="font-size: 3rem; color: #ccc; margin-bottom: 1rem;"></i>
                    <p>Tu carrito está vacío</p>
                </div>
            `;
        } else {
            cartItems.innerHTML = cart.map((item, index) => `
                <div class="cart-item">
                    <div class="cart-item-info">
                        <h4>${item.name}</h4>
                        <p>€${item.price.toFixed(2)} cada uno</p>
                    </div>
                    <div style="display: flex; flex-direction: column; align-items: flex-end; gap: 0.5rem;">
                        <div class="quantity-controls">
                            <button class="quantity-btn" onclick="updateQuantity(${index}, -1)">-</button>
                            <span style="min-width: 30px; text-align: center;">${item.quantity}</span>
                            <button class="quantity-btn" onclick="updateQuantity(${index}, 1)">+</button>
                        </div>
                        <button class="remove-btn" onclick="removeFromCart(${index})">Eliminar</button>
                    </div>
                </div>
            `).join('');
        }

        // Update cart total
        const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        cartTotal.textContent = `Total: €${total.toFixed(2)}`;
    }

    function openContactForm() {
        if (cart.length === 0) {
            alert('Tu carrito está vacío. Agrega algunos productos antes de enviar el pedido.');
            return;
        }
        contactModal.style.display = 'block';
        
        // Pre-fill the message with cart contents
        const cartSummary = cart.map(item => 
            `${item.name} x${item.quantity} = €${(item.price * item.quantity).toFixed(2)}`
        ).join('\n');
        const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        
        document.getElementById('customerMessage').value = 
            `Mi pedido:\n${cartSummary}\n\nTotal: €${total.toFixed(2)}\n\nInstrucciones adicionales:`;
    }

    function closeContactForm() {
        contactModal.style.display = 'none';
        successMessage.style.display = 'none';
        contactForm.style.display = 'block';
    }

    function handleFormSubmit(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(contactForm);
        const orderData = {
            name: formData.get('customerName'),
            email: formData.get('customerEmail'),
            phone: formData.get('customerPhone'),
            message: formData.get('customerMessage'),
            cart: cart,
            total: cart.reduce((sum, item) => sum + (item.price * item.quantity), 0)
        };

        // Here you would typically send the data to your server
        console.log('Order submitted:', orderData);

        // Show success message
        contactForm.style.display = 'none';
        successMessage.style.display = 'block';

        // Clear cart after successful order
        setTimeout(() => {
            cart = [];
            updateCartDisplay();
            closeContactForm();
            toggleCart(); // Close cart
        }, 2000);
    }

    // Initialize cart display
    updateCartDisplay();



 
