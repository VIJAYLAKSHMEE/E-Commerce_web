// Product Data
const products = [
    {
        id: 1,
        name: "Wireless Headphones",
        price: 99.99,
        description: "High-quality wireless headphones with noise cancellation",
        icon: "fa-headphones"
    },
    {
        id: 2,
        name: "Smart Watch",
        price: 299.99,
        description: "Feature-rich smartwatch with health monitoring",
        icon: "fa-clock"
    },
    {
        id: 3,
        name: "Laptop Stand",
        price: 49.99,
        description: "Ergonomic laptop stand for better posture",
        icon: "fa-laptop"
    },
    {
        id: 4,
        name: "Bluetooth Speaker",
        price: 79.99,
        description: "Portable Bluetooth speaker with premium sound",
        icon: "fa-volume-up"
    },
    {
        id: 5,
        name: "USB-C Hub",
        price: 39.99,
        description: "Multi-port USB-C hub for all your devices",
        icon: "fa-usb"
    },
    {
        id: 6,
        name: "Webcam HD",
        price: 89.99,
        description: "HD webcam for video calls and streaming",
        icon: "fa-video"
    }
];

// Cart
let cart = [];

// Initialize the app
document.addEventListener('DOMContentLoaded', () => {
    renderProducts();
    updateCartCount();
});

// Render products to the grid
function renderProducts() {
    const productsGrid = document.getElementById('products-grid');
    productsGrid.innerHTML = products.map(product => `
        <div class="product-card">
            <div class="product-image">
                <i class="fas ${product.icon}"></i>
            </div>
            <div class="product-info">
                <h3>${product.name}</h3>
                <p class="price">$${product.price.toFixed(2)}</p>
                <p class="description">${product.description}</p>
                <button class="add-to-cart" onclick="addToCart(${product.id})">
                    Add to Cart
                </button>
            </div>
        </div>
    `).join('');
}

// Add item to cart
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const existingItem = cart.find(item => item.id === productId);

    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({
            ...product,
            quantity: 1
        });
    }

    updateCartCount();
    renderCartItems();
    showToast(`${product.name} added to cart!`, 'success');
}

// Remove item from cart
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCartCount();
    renderCartItems();
    showToast('Item removed from cart', 'error');
}

// Update cart count
function updateCartCount() {
    const count = cart.reduce((sum, item) => sum + item.quantity, 0);
    document.getElementById('cart-count').textContent = count;
}

// Toggle cart sidebar
function toggleCart() {
    const cartSidebar = document.getElementById('cart-sidebar');
    cartSidebar.classList.toggle('active');
}

// Render cart items
function renderCartItems() {
    const cartItemsContainer = document.getElementById('cart-items');
    const cartTotalElement = document.getElementById('cart-total');

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p style="text-align: center; color: #6b7280;">Your cart is empty</p>';
        cartTotalElement.textContent = '$0.00';
        return;
    }

    cartItemsContainer.innerHTML = cart.map(item => `
        <div class="cart-item">
            <div class="cart-item-info">
                <h4>${item.name}</h4>
                <p>$${item.price.toFixed(2)} x ${item.quantity}</p>
            </div>
            <button class="remove-item" onclick="removeFromCart(${item.id})">
                <i class="fas fa-trash"></i>
            </button>
        </div>
    `).join('');

    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    cartTotalElement.textContent = `$${total.toFixed(2)}`;
}

// Checkout function
function checkout() {
    if (cart.length === 0) {
        showToast('Your cart is empty!', 'error');
        return;
    }
    toggleCart();
    document.getElementById('checkout-modal').classList.add('active');
}

// Close checkout modal
function closeCheckout() {
    document.getElementById('checkout-modal').classList.remove('active');
}

// Handle checkout form submission
function handleCheckout(event) {
    event.preventDefault();

    // Simulate order processing
    const orderData = {
        name: document.getElementById('checkout-name').value,
        email: document.getElementById('checkout-email').value,
        address: document.getElementById('checkout-address').value,
        card: document.getElementById('checkout-card').value,
        items: cart,
        total: cart.reduce((sum, item) => sum + (item.price * item.quantity), 0)
    };

    console.log('Order placed:', orderData);

    // Close checkout modal
    closeCheckout();

    // Clear cart
    cart = [];
    updateCartCount();
    renderCartItems();

    // Show success modal
    document.getElementById('success-modal').classList.add('active');
}

// Close success modal
function closeSuccess() {
    document.getElementById('success-modal').classList.remove('active');
}

// Handle contact form
function handleContact(event) {
    event.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;

    console.log('Contact form submitted:', { name, email, message });

    showToast('Message sent successfully!', 'success');
    document.getElementById('contact-form').reset();
}

// Show toast notification
function showToast(message, type = 'success') {
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.textContent = message;
    document.body.appendChild(toast);

    setTimeout(() => {
        toast.remove();
    }, 3000);
}

// Smooth scrolling for navigation
document.querySelectorAll('nav a').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        targetSection.scrollIntoView({ behavior: 'smooth' });
    });
});

// Log DevOps info to console
console.log('%c🛒 ShopEasy - E-commerce Platform', 'font-size: 20px; font-weight: bold; color: #2563eb;');
console.log('%cDevOps Features:', 'font-size: 16px; font-weight: bold;');
console.log('- Docker Containerization');
console.log('- CI/CD Pipeline');
console.log('- Automated Deployment');
console.log('%cVersion: 1.0.0', 'color: #10b981;');
