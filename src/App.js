import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Landing from './components/Landing';
import Menu from './components/Menu';
import Cart from './components/Cart';
import Profile from './components/Profile';
import Checkout from './components/Checkout';
import Auth from './components/Auth';
import Admin from './components/Admin';
import Toast from './components/Toast';
import { api } from './services/api';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [currentPage, setCurrentPage] = useState('landing');
  const [cart, setCart] = useState([]);
  const [menuItems, setMenuItems] = useState([]);
  const [pastOrders, setPastOrders] = useState([]);
  const [currentUser, setCurrentUser] = useState({ name: 'User', email: 'user@apsit.edu.in' });
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('');
  const [toast, setToast] = useState({ show: false, message: '' });

  useEffect(() => {
    loadMenuItems();
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      loadOrders();
    }
  }, [isAuthenticated, isAdmin]);

  const loadMenuItems = async () => {
    try {
      const items = await api.getMenuItems();
      setMenuItems(items);
    } catch (error) {
      console.error('Error loading menu:', error);
    }
  };

  const loadOrders = async () => {
    try {
      const orders = isAdmin ? await api.getAllOrders() : await api.getUserOrders(currentUser.email);
      setPastOrders(orders.map(o => ({ ...o, items: JSON.parse(o.items) })));
    } catch (error) {
      console.error('Error loading orders:', error);
    }
  };

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

  const updateOrderStatus = async (orderId, newStatus) => {
    try {
      await api.updateOrderStatus(orderId, newStatus);
      loadOrders();
    } catch (error) {
      console.error('Error updating order:', error);
    }
  };

  const processPayment = async () => {
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
      date: new Date().toISOString().split('T')[0],
      items: JSON.stringify(cart.map(item => ({ name: item.name, quantity: item.quantity, price: item.price }))),
      total: total,
      status: 'Pending',
      userType: currentUser.isFaculty ? 'Faculty' : 'Student',
      userName: currentUser.name,
      userEmail: currentUser.email
    };
    
    try {
      await api.createOrder(newOrder);
      alert(`Payment of ₹${total} processed successfully via ${selectedPaymentMethod.toUpperCase()}!\nPlease collect your order from the canteen counter in 10-15 minutes.`);
      setCart([]);
      setCurrentPage('menu');
      loadOrders();
    } catch (error) {
      console.error('Error creating order:', error);
      alert('Failed to place order. Please try again.');
    }
  };

  const renderPage = () => {
    if (isAdmin && currentPage === 'admin') {
      return <Admin menuItems={menuItems} setMenuItems={setMenuItems} allOrders={pastOrders} updateOrderStatus={updateOrderStatus} loadMenuItems={loadMenuItems} loadOrders={loadOrders} />;
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