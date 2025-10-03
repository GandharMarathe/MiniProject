import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Landing from './components/Landing';
import Menu from './components/Menu';
import Cart from './components/Cart';
import Profile from './components/Profile';
import Checkout from './components/Checkout';
import Auth from './components/Auth';
import Admin from './components/Admin';
import Toast from './components/Toast';

const initialMenuItems = [
  { id: 1, name: "Veg Thali", price: 45, image: "https://imgs.search.brave.com/mltDffD0z7KOhmh8glJNMiUQfu3EQAjYnccWhVSOmqE/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly91cy4x/MjNyZi5jb20vNDUw/d20vaW5kaWFuZm9v/ZGltYWdlcy9pbmRp/YW5mb29kaW1hZ2Vz/MTkwNi9pbmRpYW5m/b29kaW1hZ2VzMTkw/NjAxOTk3LzEyNTg1/OTQ1Ny1pbmRpYW4t/aGluZHUtdmVnLXRo/YWxpLWZvb2QtcGxh/dHRlci1zZWxlY3Rp/dmUtZm9jdXMuanBn/P3Zlcj02", category: "Meals" },
  { id: 2, name: "Samosa", price: 20, image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=300&h=200&fit=crop", category: "Snacks" },
  { id: 3, name: "Masala Dosa", price: 35, image: "https://imgs.search.brave.com/bDs7QegV1fpJQeKeT-wde4WZ6uYswYExyn2nB6RJF4Y/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly90My5m/dGNkbi5uZXQvanBn/LzAxLzg2LzcwLzM0/LzM2MF9GXzE4Njcw/MzQyMF9FZElCcHZw/dEhJSFlac25PZWFt/bjBYSGx2ZmJCTEl0/UC5qcGc", category: "South Indian" },
  { id: 4, name: "Pav Bhaji", price: 40, image: "https://imgs.search.brave.com/kwN6iePKCqH_gZck83IisNckRnj25elayw0zTeU_IHY/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93d3cu/c2h1dHRlcnN0b2Nr/LmNvbS9pbWFnZS1w/aG90by9wYXYtYmhh/amktZmFzdC1mb29k/LWRpc2gtMjYwbnct/MjA3OTk4NjM1Ni5q/cGc", category: "Street Food" },
  { id: 5, name: "Poha", price: 25, image: "https://imgs.search.brave.com/k-3f7PHtvXWv-c2zXJdf-r-XPD5s-Xixrlo-0rU_OWA/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWcu/ZnJlZXBpay5jb20v/cHJlbWl1bS1waG90/by90cmFkaXRpb25h/bC1pbmRpYW4tcG9o/YS1kaXNoLXdpdGgt/Y3VycnktbGVhdmVz/LXdvb2Rlbi1ib2Fy/ZF82MDQ5MjYtMjg4/LmpwZz9zZW10PWFp/c19oeWJyaWQmdz03/NDAmcT04MA", category: "Breakfast" },
  { id: 6, name: "Chai", price: 10, image: "https://imgs.search.brave.com/vVRL3BZPKaaxqTnnBDQOlzeoG0R3o29N57R-tp6nX-Y/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93d3cu/c2h1dHRlcnN0b2Nr/LmNvbS9pbWFnZS1w/aG90by9pbmRpYW4t/Y2hhaS1nbGFzcy1j/dXBzLW1ldGFsLTI2/MG53LTE4Nzg5MzIz/NzcuanBn", category: "Beverages" },
  { id: 7, name: "Veg Biryani", price: 55, image: "https://imgs.search.brave.com/gy3y0y-stpW5c3ALMTtLVAxtKn-2l6K1wnyaaUjMZwY/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pLnJl/ZGQuaXQvb3ZoN2Ez/Y2VlczNkMS5wbmc", category: "Meals" },
  { id: 8, name: "Paneer Butter Masala", price: 65, image: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=300&h=200&fit=crop", category: "Meals" },
  { id: 9, name: "Veg Sandwich", price: 30, image: "https://images.unsplash.com/photo-1539252554453-80ab65ce3586?w=300&h=200&fit=crop", category: "Snacks" },
  { id: 10, name: "Aloo Paratha", price: 35, image: "https://imgs.search.brave.com/gz7s6V6zuy_J_xt3SBnk4RDhvXTgyxDHkrYcoXNfJTQ/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly90aHVt/YnMuZHJlYW1zdGlt/ZS5jb20vYi9hbG9v/LXBhcmF0aGEtaW5k/aWFuLXBvdGF0by1z/dHVmZmVkLWZsYXRi/cmVhZC1idXR0ZXIt/dG9wLXNlcnZlZC1m/cmVzaC1zd2VldC1s/YXNzaS1jaHV0bmV5/LXBpY2tsZS1zZWxl/Y3RpdmUtZm9jdXMt/bGFzc2llLTE2NDIx/MzAzNS5qcGc", category: "Breakfast" },
  { id: 11, name: "Veg Fried Rice", price: 50, image: "https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=300&h=200&fit=crop", category: "Meals" },
  { id: 12, name: "coke", price: 20, image: "https://imgs.search.brave.com/OYRJyoUU3sF6o-v030h-utxdU67XB5lZ35Db5fFS2n8/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pLnBp/bmltZy5jb20vb3Jp/Z2luYWxzLzM5LzI2/L2ZmLzM5MjZmZjEx/MjJkMTk1N2EwZWM0/MmQ4NTA3MTdlNzRm/LmpwZw", category: "Beverages" }
];

const initialOrders = [
  {
    id: 1,
    date: '2025-01-15',
    items: [{ name: 'Veg Thali', quantity: 1, price: 45 }, { name: 'Chai', quantity: 2, price: 10 }],
    total: 65,
    status: 'Completed'
  },
  {
    id: 2,
    date: '2025-01-12',
    items: [{ name: 'Samosa (2 pcs)', quantity: 1, price: 20 }, { name: 'Masala Dosa', quantity: 1, price: 35 }],
    total: 55,
    status: 'Completed'
  }
];

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [currentPage, setCurrentPage] = useState('landing');
  const [cart, setCart] = useState([]);
  const [menuItems, setMenuItems] = useState(() => {
    const saved = localStorage.getItem('menuItems');
    return saved ? JSON.parse(saved) : initialMenuItems;
  });
  const [pastOrders, setPastOrders] = useState(() => {
    const saved = localStorage.getItem('pastOrders');
    return saved ? JSON.parse(saved) : initialOrders;
  });
  const [currentUser, setCurrentUser] = useState({ name: 'User', email: 'user@apsit.edu.in' });
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('');
  const [toast, setToast] = useState({ show: false, message: '' });

  const handleLogin = (userData) => {
    setCurrentUser(userData);
    setIsAuthenticated(true);
    if (userData.email === 'admin@apsit.edu.in') {
      setIsAdmin(true);
      setCurrentPage('admin');
    } else {
      setCurrentPage('landing');
      showToast(`Welcome ${userData.name}!`);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    setIsAuthenticated(false);
    setIsAdmin(false);
    setCurrentUser({ name: 'User', email: 'user@apsit.edu.in' });
    setCart([]);
    setCurrentPage('landing');
  };

  const showToast = (message) => {
    setToast({ show: true, message });
    setTimeout(() => setToast({ show: false, message: '' }), 3000);
  };

  const addToCart = (itemId, quantity) => {
    if (!isAuthenticated) {
      alert('Please login to add items to cart!');
      return;
    }
    const item = menuItems.find(i => i.id === itemId);
    const existingItem = cart.find(i => i.id === itemId);

    if (existingItem) {
      setCart(cart.map(i => i.id === itemId ? { ...i, quantity: i.quantity + quantity } : i));
    } else {
      setCart([...cart, { ...item, quantity }]);
    }
    showToast(`${item.name} added to cart!`);
  };

  const updateCartQuantity = (itemId, newQty) => {
    if (newQty < 1) {
      setCart(cart.filter(item => item.id !== itemId));
    } else {
      setCart(cart.map(item => item.id === itemId ? { ...item, quantity: newQty } : item));
    }
  };

  const updateOrderStatus = (orderId, newStatus) => {
    const updatedOrders = pastOrders.map(order => 
      order.id === orderId ? { ...order, status: newStatus } : order
    );
    setPastOrders(updatedOrders);
    localStorage.setItem('pastOrders', JSON.stringify(updatedOrders));
  };

  const processPayment = () => {
    if (!isAuthenticated) {
      alert('Please login to place an order!');
      return;
    }
    if (!selectedPaymentMethod) {
      alert('Please select a payment method');
      return;
    }

    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const newOrder = {
      id: pastOrders.length + 1,
      date: new Date().toISOString().split('T')[0],
      items: cart.map(item => ({ name: item.name, quantity: item.quantity, price: item.price })),
      total: total,
      status: 'Pending',
      userType: currentUser.isFaculty ? 'Faculty' : 'Student',
      userName: currentUser.name
    };
    
    const updatedOrders = [newOrder, ...pastOrders];
    setPastOrders(updatedOrders);
    localStorage.setItem('pastOrders', JSON.stringify(updatedOrders));
    alert(`Payment of ₹${total} processed successfully via ${selectedPaymentMethod.toUpperCase()}!\nPlease collect your order from the canteen counter in 10-15 minutes.`);
    setCart([]);
    setCurrentPage('menu');
  };

  const renderPage = () => {
    if (isAdmin && currentPage === 'admin') {
      return <Admin menuItems={menuItems} setMenuItems={setMenuItems} allOrders={pastOrders} updateOrderStatus={updateOrderStatus} />;
    }
    switch (currentPage) {
      case 'landing':
        return <Landing setCurrentPage={setCurrentPage} />;
      case 'menu':
        return <Menu menuItems={menuItems} addToCart={addToCart} />;
      case 'cart':
        return <Cart cart={cart} updateCartQuantity={updateCartQuantity} setCurrentPage={setCurrentPage} />;
      case 'profile':
        return <Profile currentUser={currentUser} pastOrders={pastOrders} />;
      case 'checkout':
        return <Checkout cart={cart} selectedPaymentMethod={selectedPaymentMethod} setSelectedPaymentMethod={setSelectedPaymentMethod} processPayment={processPayment} />;
      default:
        return <Landing setCurrentPage={setCurrentPage} />;
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="App">
        <Auth onLogin={handleLogin} />
        <Toast toast={toast} />
      </div>
    );
  }

  return (
    <div className="App">
      {currentPage === 'landing' ? (
        <Landing setCurrentPage={setCurrentPage} />
      ) : (
        <div className={`app-container ${currentPage === 'menu' ? 'menu-page' : ''}`}>
          <Navbar currentPage={currentPage} setCurrentPage={setCurrentPage} cartCount={cart.reduce((sum, item) => sum + item.quantity, 0)} onLogout={handleLogout} isAdmin={isAdmin} />
          <div className="container">
            {renderPage()}
          </div>
        </div>
      )}
      <Toast toast={toast} />
    </div>
  );
}

export default App;