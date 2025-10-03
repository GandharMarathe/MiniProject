import React from 'react';

function Checkout({ cart, selectedPaymentMethod, setSelectedPaymentMethod, processPayment }) {
  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const total = subtotal + 5;

  const selectPayment = (method) => {
    setSelectedPaymentMethod(method);
  };

  return (
    <>
      <div className="checkout-header">
        <h1>Complete Your Order</h1>
      </div>

      <div className="checkout-content">
        <div className="checkout-left">
          <div className="checkout-section">
            <h3>Order Summary</h3>
            <div className="checkout-items">
              {cart.map(item => (
                <div key={item.id} className="checkout-item">
                  <div className="item-info">
                    <h4>{item.name}</h4>
                    <p>Quantity: {item.quantity}</p>
                  </div>
                  <div className="item-price">₹{item.price * item.quantity}</div>
                </div>
              ))}
            </div>
            <div className="checkout-total">
              <div className="total-row">
                <span>Subtotal:</span>
                <span>₹{subtotal}</span>
              </div>
              <div className="total-row">
                <span>Service Fee:</span>
                <span>₹5</span>
              </div>
              <div className="total-row final-total">
                <span>Total:</span>
                <span>₹{total}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="checkout-right">
          <div className="checkout-section">
            <h3>Payment Method</h3>
            <div className="modern-payment-methods">
              <div 
                className={`modern-payment-option ${selectedPaymentMethod === 'upi' ? 'selected' : ''}`}
                onClick={() => selectPayment('upi')}
              >
                <div className="payment-icon">📱</div>
                <div className="payment-info">
                  <h4>UPI Payment</h4>
                  <p>Quick & secure payment</p>
                </div>
                <div className="payment-radio"></div>
              </div>
              <div 
                className={`modern-payment-option ${selectedPaymentMethod === 'card' ? 'selected' : ''}`}
                onClick={() => selectPayment('card')}
              >
                <div className="payment-icon">💳</div>
                <div className="payment-info">
                  <h4>Credit/Debit Card</h4>
                  <p>Visa, Mastercard, RuPay</p>
                </div>
                <div className="payment-radio"></div>
              </div>
              <div 
                className={`modern-payment-option ${selectedPaymentMethod === 'cash' ? 'selected' : ''}`}
                onClick={() => selectPayment('cash')}
              >
                <div className="payment-icon">💵</div>
                <div className="payment-info">
                  <h4>Cash on Collection</h4>
                  <p>Pay when you collect</p>
                </div>
                <div className="payment-radio"></div>
              </div>
            </div>
            
            <button className="btn" onClick={processPayment}>
              Pay ₹{total}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Checkout;