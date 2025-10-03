import React from 'react';

function Profile({ currentUser, pastOrders }) {
  return (
    <>
      <div className="profile-section">
        <div className="profile-header">
          <div className="profile-avatar">👤</div>
          <h2>{currentUser.name}</h2>
          <p>{currentUser.email}</p>
        </div>
      </div>

      <div className="profile-section">
        <h3 style={{ marginBottom: '20px', color: '#333' }}>Past Orders</h3>
        {pastOrders.length === 0 ? (
          <p style={{ textAlign: 'center', color: '#666', padding: '20px' }}>No past orders found</p>
        ) : (
          [...pastOrders].sort((a, b) => b.id - a.id).map(order => (
            <div key={order.id} className="order-item">
              <div className="order-header">
                <div>
                  <h4>Order #{order.id}</h4>
                  <p style={{ color: '#666', fontSize: '14px' }}>{order.date}</p>
                </div>
                <span style={{ 
                  padding: '5px 15px', 
                  borderRadius: '20px', 
                  fontSize: '14px', 
                  fontWeight: '600',
                  backgroundColor: order.status === 'Accepted' ? '#d4edda' : order.status === 'Rejected' ? '#f8d7da' : '#fff3cd',
                  color: order.status === 'Accepted' ? '#155724' : order.status === 'Rejected' ? '#721c24' : '#856404'
                }}>{order.status}</span>
              </div>
              <div>
                {order.items.map((item, index) => (
                  <p key={index} style={{ margin: '5px 0' }}>
                    {item.name} x{item.quantity} - ₹{item.price * item.quantity}
                  </p>
                ))}
                <p style={{ fontWeight: 'bold', marginTop: '10px' }}>Total: ₹{order.total}</p>
              </div>
            </div>
          ))
        )}
      </div>
    </>
  );
}

export default Profile;