import React from 'react';

function Cart({ cart, updateCartQuantity, setCurrentPage }) {
  const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  if (cart.length === 0) {
    return (
      <div className="cart-container">
        <h2 style={{ textAlign: 'center', marginBottom: '30px', color: '#333' }}>Your Cart</h2>
        <p style={{ textAlign: 'center', color: '#666', padding: '40px' }}>Your cart is empty</p>
      </div>
    );
  }

  return (
    <div className="cart-container">
      <h2 style={{ textAlign: 'center', marginBottom: '30px', color: '#333' }}>Your Cart</h2>
      
      {cart.map(item => (
        <div key={item.id} className="cart-item">
          <div>
            <h4>{item.name}</h4>
            <p style={{ color: '#666' }}>₹{item.price} each</p>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <button 
              className="quantity-btn" 
              onClick={() => updateCartQuantity(item.id, item.quantity - 1)}
            >
              -
            </button>
            <span style={{ margin: '0 10px', fontWeight: 'bold' }}>{item.quantity}</span>
            <button 
              className="quantity-btn" 
              onClick={() => updateCartQuantity(item.id, item.quantity + 1)}
            >
              +
            </button>
            <button 
              className="btn btn-danger" 
              onClick={() => updateCartQuantity(item.id, 0)}
              style={{ marginLeft: '10px', width: 'auto', padding: '8px 15px' }}
            >
              Remove
            </button>
          </div>
        </div>
      ))}
      
      <div className="cart-total">
        Total: ₹{total}
      </div>
      
      <button 
        className="btn" 
        onClick={() => setCurrentPage('checkout')}
      >
        Proceed to Checkout
      </button>
    </div>
  );
}

export default Cart;