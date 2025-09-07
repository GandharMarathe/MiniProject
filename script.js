const menuItems = [
    { id: 1, name: "Veg Thali", price: 45, image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=300&h=200&fit=crop", category: "Meals" },
    { id: 2, name: "Samosa (2 pcs)", price: 20, image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=300&h=200&fit=crop", category: "Snacks" },
    { id: 3, name: "Masala Dosa", price: 35, image: "https://imgs.search.brave.com/bDs7QegV1fpJQeKeT-wde4WZ6uYswYExyn2nB6RJF4Y/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly90My5m/dGNkbi5uZXQvanBn/LzAxLzg2LzcwLzM0/LzM2MF9GXzE4Njcw/MzQyMF9FZElCcHZw/dEhJSFlac25PZWFt/bjBYSGx2ZmJCTEl0/UC5qcGc", category: "South Indian" },
    { id: 4, name: "Pav Bhaji", price: 40, image: "https://imgs.search.brave.com/kwN6iePKCqH_gZck83IisNckRnj25elayw0zTeU_IHY/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93d3cu/c2h1dHRlcnN0b2Nr/LmNvbS9pbWFnZS1w/aG90by9wYXYtYmhh/amktZmFzdC1mb29k/LWRpc2gtMjYwbnct/MjA3OTk4NjM1Ni5q/cGc", category: "Street Food" },
    { id: 5, name: "Poha", price: 25, image: "https://imgs.search.brave.com/k-3f7PHtvXWv-c2zXJdf-r-XPD5s-Xixrlo-0rU_OWA/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWcu/ZnJlZXBpay5jb20v/cHJlbWl1bS1waG90/by90cmFkaXRpb25h/bC1pbmRpYW4tcG9o/YS1kaXNoLXdpdGgt/Y3VycnktbGVhdmVz/LXdvb2Rlbi1ib2Fy/ZF82MDQ5MjYtMjg4/LmpwZz9zZW10PWFp/c19oeWJyaWQmdz03/NDAmcT04MA", category: "Breakfast" },
    { id: 6, name: "Chai", price: 10, image: "https://imgs.search.brave.com/vVRL3BZPKaaxqTnnBDQOlzeoG0R3o29N57R-tp6nX-Y/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93d3cu/c2h1dHRlcnN0b2Nr/LmNvbS9pbWFnZS1w/aG90by9pbmRpYW4t/Y2hhaS1nbGFzcy1j/dXBzLW1ldGFsLTI2/MG53LTE4Nzg5MzIz/NzcuanBn", category: "Beverages" }
];

let cart = [];
let selectedPaymentMethod = '';
let filteredItems = menuItems;
let currentUser = { name: '', email: '' };
let pastOrders = [
    {
        id: 1,
        date: '2024-01-15',
        items: [{ name: 'Veg Thali', quantity: 1, price: 45 }, { name: 'Chai', quantity: 2, price: 10 }],
        total: 65,
        status: 'Completed'
    },
    {
        id: 2,
        date: '2024-01-12',
        items: [{ name: 'Samosa (2 pcs)', quantity: 1, price: 20 }, { name: 'Masala Dosa', quantity: 1, price: 35 }],
        total: 55,
        status: 'Completed'
    }
];

function showPage(pageId) {
    document.querySelectorAll('.page').forEach(page => page.classList.remove('active'));
    document.getElementById(pageId).classList.add('active');
}

function loadMenu() {
    const menuGrid = document.getElementById('menuGrid');
    menuGrid.innerHTML = filteredItems.map(item => `
        <div class="menu-item">
            <img src="${item.image}" alt="${item.name}">
            <div class="menu-item-content">
                <h3>${item.name}</h3>
                <p class="price">₹${item.price}</p>
                <div class="quantity-controls">
                    <button class="quantity-btn" onclick="changeQuantity(${item.id}, -1)">-</button>
                    <span id="qty-${item.id}">0</span>
                    <button class="quantity-btn" onclick="changeQuantity(${item.id}, 1)">+</button>
                </div>
                <button class="btn" onclick="addToCart(${item.id})">Add to Cart</button>
            </div>
        </div>
    `).join('');
}

function searchMenu() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    filteredItems = menuItems.filter(item => 
        item.name.toLowerCase().includes(searchTerm) || 
        item.category.toLowerCase().includes(searchTerm)
    );
    loadMenu();
    resizeImages();
}

function resizeImages() {
    const menuItems = document.querySelectorAll('.menu-item');
    const shouldEnlarge = filteredItems.length <= 3;
    
    menuItems.forEach(item => {
        if (shouldEnlarge) {
            item.classList.add('large-view');
        } else {
            item.classList.remove('large-view');
        }
    });
}

function changeQuantity(itemId, change) {
    const qtyElement = document.getElementById(`qty-${itemId}`);
    let currentQty = parseInt(qtyElement.textContent);
    currentQty = Math.max(0, currentQty + change);
    qtyElement.textContent = currentQty;
}

function addToCart(itemId) {
    const qty = parseInt(document.getElementById(`qty-${itemId}`).textContent);
    if (qty === 0) return;

    const item = menuItems.find(i => i.id === itemId);
    const existingItem = cart.find(i => i.id === itemId);

    if (existingItem) {
        existingItem.quantity += qty;
    } else {
        cart.push({ ...item, quantity: qty });
    }

    document.getElementById(`qty-${itemId}`).textContent = '0';
    updateCartDisplay();
    alert(`${item.name} added to cart!`);
}

function removeFromCart(itemId) {
    cart = cart.filter(item => item.id !== itemId);
    updateCartDisplay();
}

function updateCartQuantity(itemId, newQty) {
    if (newQty <= 0) {
        removeFromCart(itemId);
        return;
    }
    const item = cart.find(i => i.id === itemId);
    if (item) item.quantity = newQty;
    updateCartDisplay();
}

function updateCartDisplay() {
    const cartItems = document.getElementById('cartItems');
    const cartTotal = document.getElementById('cartTotal');
    const checkoutBtn = document.getElementById('checkoutBtn');

    if (cart.length === 0) {
        cartItems.innerHTML = '<p style="text-align: center; color: #666; padding: 40px;">Your cart is empty</p>';
        cartTotal.textContent = '0';
        const allBadges = ['cartBadge', 'cartBadge2', 'cartBadge3', 'cartBadge4'];
        allBadges.forEach(id => {
            const badge = document.getElementById(id);
            if (badge) badge.textContent = '0';
        });
        if (checkoutBtn) checkoutBtn.disabled = true;
        return;
    }

    cartItems.innerHTML = cart.map(item => `
        <div class="cart-item">
            <div>
                <h4>${item.name}</h4>
                <p style="color: #666;">₹${item.price} each</p>
            </div>
            <div style="display: flex; align-items: center; gap: 10px;">
                <button class="quantity-btn" onclick="updateCartQuantity(${item.id}, ${item.quantity - 1})">-</button>
                <span style="margin: 0 10px; font-weight: bold;">${item.quantity}</span>
                <button class="quantity-btn" onclick="updateCartQuantity(${item.id}, ${item.quantity + 1})">+</button>
                <button class="btn btn-danger" onclick="removeFromCart(${item.id})" style="margin-left: 10px; width: auto; padding: 8px 15px;">Remove</button>
            </div>
        </div>
    `).join('');

    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    
    cartTotal.textContent = total;
    const allBadges = ['cartBadge', 'cartBadge2', 'cartBadge3', 'cartBadge4'];
    allBadges.forEach(id => {
        const badge = document.getElementById(id);
        if (badge) badge.textContent = totalItems;
    });
    if (checkoutBtn) checkoutBtn.disabled = false;
    
    const paymentAmount = document.getElementById('paymentAmount');
    if (paymentAmount) paymentAmount.textContent = total;
    
    updateCheckoutDisplay();
}

function updateCheckoutDisplay() {
    const checkoutItems = document.getElementById('checkoutItems');
    const checkoutSubtotal = document.getElementById('checkoutSubtotal');
    const checkoutTotal = document.getElementById('checkoutTotal');
    const finalAmount = document.getElementById('finalAmount');
    
    if (cart.length === 0) {
        if (checkoutItems) checkoutItems.innerHTML = '<p style="text-align: center; color: #666; padding: 20px;">No items in cart</p>';
        return;
    }
    
    if (checkoutItems) {
        checkoutItems.innerHTML = cart.map(item => `
            <div class="checkout-item">
                <div class="item-info">
                    <h4>${item.name}</h4>
                    <p>Quantity: ${item.quantity}</p>
                </div>
                <div class="item-price">₹${item.price * item.quantity}</div>
            </div>
        `).join('');
    }
    
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const total = subtotal + 5; // Adding service fee
    
    if (checkoutSubtotal) checkoutSubtotal.textContent = subtotal;
    if (checkoutTotal) checkoutTotal.textContent = total;
    if (finalAmount) finalAmount.textContent = total;
}

function selectPayment(method) {
    selectedPaymentMethod = method;
    document.querySelectorAll('.modern-payment-option').forEach(el => el.classList.remove('selected'));
    event.target.closest('.modern-payment-option').classList.add('selected');
    
    const paymentForm = document.getElementById('modernPaymentForm');
    const cardDetails = document.getElementById('modernCardDetails');
    const upiDetails = document.getElementById('modernUpiDetails');
    
    paymentForm.style.display = 'block';
    cardDetails.style.display = method === 'card' ? 'block' : 'none';
    upiDetails.style.display = method === 'upi' ? 'block' : 'none';
    
    updateCheckoutDisplay();
}

function processPayment() {
    if (!selectedPaymentMethod) {
        alert('Please select a payment method');
        return;
    }

    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    
    // Add to past orders
    const newOrder = {
        id: pastOrders.length + 1,
        date: new Date().toISOString().split('T')[0],
        items: cart.map(item => ({ name: item.name, quantity: item.quantity, price: item.price })),
        total: total,
        status: 'Completed'
    };
    pastOrders.unshift(newOrder);
    
    alert(`Payment of ₹${total} processed successfully via ${selectedPaymentMethod.toUpperCase()}!\nPlease collect your order from the canteen counter in 10-15 minutes.`);
    
    cart = [];
    updateCartDisplay();
    showPage('menu');
}



function updateProfileDisplay() {
    const profileName = document.getElementById('profileName');
    const profileEmail = document.getElementById('profileEmail');
    if (profileName) profileName.textContent = currentUser.name || 'User';
    if (profileEmail) profileEmail.textContent = currentUser.email || 'user@apsit.edu.in';
}

function loadPastOrders() {
    const pastOrdersContainer = document.getElementById('pastOrders');
    if (pastOrders.length === 0) {
        pastOrdersContainer.innerHTML = '<p style="text-align: center; color: #666; padding: 20px;">No past orders found</p>';
        return;
    }
    
    pastOrdersContainer.innerHTML = pastOrders.map(order => `
        <div class="order-item">
            <div class="order-header">
                <div>
                    <h4>Order #${order.id}</h4>
                    <p style="color: #666; font-size: 14px;">${order.date}</p>
                </div>
                <span class="order-status status-completed">${order.status}</span>
            </div>
            <div>
                ${order.items.map(item => `<p style="margin: 5px 0;">${item.name} x${item.quantity} - ₹${item.price * item.quantity}</p>`).join('')}
                <p style="font-weight: bold; margin-top: 10px;">Total: ₹${order.total}</p>
            </div>
        </div>
    `).join('');
}

// Check if user is logged in
function checkAuth() {
    const userData = localStorage.getItem('currentUser');
    if (!userData) {
        window.location.href = 'auth.html';
        return;
    }
    currentUser = JSON.parse(userData);
    updateProfileDisplay();
}

function logout() {
    if (confirm('Are you sure you want to logout?')) {
        cart = [];
        currentUser = { name: '', email: '' };
        localStorage.removeItem('currentUser');
        updateCartDisplay();
        window.location.href = 'auth.html';
    }
}

document.addEventListener('DOMContentLoaded', function() {
    checkAuth();
    loadMenu();
    updateCartDisplay();
    loadPastOrders();
    updateProfileDisplay();
});