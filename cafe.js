
  

  
  let cart = [];
    let cartTotal = 0;

    function addToCart(name, price, image) {
      const existingItem = cart.find(item => item.name === name);
      
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        cart.push({
          name: name,
          price: price,
          image: image, 
          quantity: 1
        });
      }
      
      updateCartUI();
      showAddedToCartMessage(name);
    }

    function removeFromCart(name) {
      cart = cart.filter(item => item.name !== name);
      updateCartUI();
    }

    function updateQuantity(name, change) {
      const item = cart.find(item => item.name === name);
      if (item) {
        item.quantity += change;
        if (item.quantity <= 0) {
          removeFromCart(name);
        } else {
          updateCartUI();
        }
      }
    }

    function updateCartUI() {
      const cartCount = document.getElementById('cart-count');
      const cartItems = document.getElementById('cart-items');
      const cartTotal = document.getElementById('cart-total');


      const addCart = document.getElementById("add-cart")
      addCart.addEventListener("click", addToCart)

      const btnOpen = document.getElementById("btn-Open")
      btnOpen.addEventListener("click", openContactForm)
      let totalItems = 0;
      let totalPrice = 0;
      
      cart.forEach(item => {
        totalItems += item.quantity;
        totalPrice += item.price * item.quantity;
      });
      
      cartCount.textContent = totalItems;
      
      if (cart.length === 0) {
        cartItems.innerHTML = '<div class="empty-cart">Tu carrito está vacío</div>';
      } else {
        cartItems.innerHTML = cart.map(item => `
          <div class="cart-item">
            <div style="display: flex; align-items: center; gap: 1rem;">
              <img src="${item.image}" alt="${item.name}" style="width: 50px; height: 50px; object-fit: cover; border-radius: 5px;">
              <div>
                <h4>${item.name}</h4>
                <p>€${item.price.toFixed(2)}</p>
              </div>
            </div>
            <div style="display: flex; align-items: center; gap: 1rem;">
              <div class="quantity-controls">
                <button class="quantity-btn" onclick="updateQuantity('${item.name}', -1)">-</button>
                <span>${item.quantity}</span>
                <button class="quantity-btn" onclick="updateQuantity('${item.name}', 1)">+</button>
              </div>
              <button class="quantity-btn" onclick="removeFromCart('${item.name}')" style="background: #e74c3c; width: auto; padding: 0 8px;">
                <i class="fa-solid fa-trash"></i>
              </button>
            </div>
          </div>
        `).join('');
      }
      
      cartTotal.textContent = `Total: €${totalPrice.toFixed(2)}`;
    }

    function showAddedToCartMessage(itemName) {
      // Create a temporary notification
      const notification = document.createElement('div');
      notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #27ae60;
        color: white;
        padding: 1rem;
        border-radius: 5px;
        z-index: 1001;
        animation: slideIn 0.3s ease;
      `;
      notification.textContent = `${itemName} agregado al carrito!`;
      document.body.appendChild(notification);
      
      setTimeout(() => {
        notification.remove();
      }, 3000);
    }
    const cartOpen = document.getElementById("cartOpen").addEventListener('click', openCart)
    function openCart() {
      document.getElementById('cartModal').style.display = 'block';
    }
    const closeCart = document.getElementById("closeCart")
    function closeCart() {
      document.getElementById('cartModal').style.display = 'none';
    }

    function openContactForm() {
      if (cart.length === 0) {
        alert('Tu carrito está vacío. Agrega algunos productos primero.');
        return;
      }
      
      document.getElementById('cartModal').style.display = 'none';
      document.getElementById('contactModal').style.display = 'block';
      
      // Pre-fill the message with cart contents
      const cartDetails = cart.map(item => 
        `${item.name} x${item.quantity} - €${(item.price * item.quantity).toFixed(2)}`
      ).join('\n');
      
      const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
      
      document.getElementById('customerMessage').value = 
        `Mi pedido:\n\n${cartDetails}\n\nTotal: €${totalPrice.toFixed(2)}\n\nInstrucciones adicionales:`;
    }

    function closeContactForm() {
      document.getElementById('contactModal').style.display = 'none';
    }

    // Handle form submission
    document.getElementById('contactForm').addEventListener('submit', function(e) {
      e.preventDefault();
      
      const formData = new FormData(this);
      const customerName = formData.get('customerName');
      const customerEmail = formData.get('customerEmail');
      const customerPhone = formData.get('customerPhone');
      const customerMessage = formData.get('customerMessage');
      
      // Simulate sending the order
      console.log('Order Details:', {
        customer: {
          name: customerName,
          email: customerEmail,
          phone: customerPhone
        },
        cart: cart,
        message: customerMessage,
        total: cart.reduce((sum, item) => sum + (item.price * item.quantity), 0)
      });
      
      // Show success message
      document.getElementById('success-message').style.display = 'block';
      this.style.display = 'none';
      
      // Clear cart after successful order
      setTimeout(() => {
        cart = [];
        updateCartUI();
        closeContactForm();
        document.getElementById('success-message').style.display = 'none';
        document.getElementById('contactForm').style.display = 'block';
        document.getElementById('contactForm').reset();
      }, 3000);
    });

    // Close modals when clicking outside
    window.onclick = function(event) {
      const cartModal = document.getElementById('cartModal');
      const contactModal = document.getElementById('contactModal');
      
      if (event.target === cartModal) {
        closeCart();
      }
      if (event.target === contactModal) {
        closeContactForm();
      }
    }

    // Initialize cart UI
    updateCartUI();