// Cart.js
import React from 'react';

const Cart = ({ cart, total }) => {
  if (!cart) return null;

  return (
    <footer className="cart-summary">
      <h2>Cart Summary</h2>
      <ul>
        {cart.map(item => (
          <li key={item.id}>
            {item.name} x {item.quantity} - ₹{item.price * item.quantity}
          </li>
        ))}
      </ul>
      <p>Total: ₹{total}</p>
      <button className="pay-btn">Proceed to Pay</button>
    </footer>
  );
};

export default Cart;
