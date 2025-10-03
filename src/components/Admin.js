import React, { useState } from 'react';

function Admin({ menuItems, setMenuItems, allOrders, updateOrderStatus }) {
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    image: '',
    category: ''
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleAddItem = (e) => {
    e.preventDefault();
    const newItem = {
      id: menuItems.length + 1,
      name: formData.name,
      price: parseInt(formData.price),
      image: formData.image,
      category: formData.category
    };
    const updatedItems = [...menuItems, newItem];
    setMenuItems(updatedItems);
    localStorage.setItem('menuItems', JSON.stringify(updatedItems));
    setFormData({ name: '', price: '', image: '', category: '' });
    setShowAddForm(false);
    alert('Item added successfully!');
  };

  const handleUpdateItem = (e) => {
    e.preventDefault();
    const updatedItems = menuItems.map(item => 
      item.id === editingItem.id 
        ? { ...item, name: formData.name, price: parseInt(formData.price), image: formData.image, category: formData.category }
        : item
    );
    setMenuItems(updatedItems);
    localStorage.setItem('menuItems', JSON.stringify(updatedItems));
    setEditingItem(null);
    setFormData({ name: '', price: '', image: '', category: '' });
    alert('Item updated successfully!');
  };

  const handleDeleteItem = (id) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      const updatedItems = menuItems.filter(item => item.id !== id);
      setMenuItems(updatedItems);
      localStorage.setItem('menuItems', JSON.stringify(updatedItems));
      alert('Item deleted successfully!');
    }
  };

  const startEdit = (item) => {
    setEditingItem(item);
    setFormData({
      name: item.name,
      price: item.price.toString(),
      image: item.image,
      category: item.category
    });
    setShowAddForm(false);
    setTimeout(() => window.scrollTo({ top: 0, behavior: 'smooth' }), 100);
  };

  const cancelEdit = () => {
    setEditingItem(null);
    setFormData({ name: '', price: '', image: '', category: '' });
  };

  const totalRevenue = allOrders.reduce((sum, order) => sum + order.total, 0);
  const totalOrders = allOrders.length;

  return (
    <div className="admin-container">
      <div className="admin-header">
        <h1>🎯 Admin Dashboard</h1>
        <p>Manage menu items, orders, and monitor canteen operations</p>
      </div>
      
      {/* Stats Overview */}
      <div className="admin-stats">
        <div className="stat-card">
          <h3>Total Items</h3>
          <p className="stat-value">{menuItems.length}</p>
        </div>
        <div className="stat-card">
          <h3>Total Orders</h3>
          <p className="stat-value">{totalOrders}</p>
        </div>
        <div className="stat-card">
          <h3>Total Revenue</h3>
          <p className="stat-value">₹{totalRevenue}</p>
        </div>
      </div>

      {/* Add Item Button */}
      <div style={{ textAlign: 'center', margin: '40px 0' }}>
        <button 
          className="btn" 
          onClick={() => {
            setShowAddForm(!showAddForm);
            setEditingItem(null);
            setFormData({ name: '', price: '', image: '', category: '' });
          }}
          style={{ maxWidth: '300px', fontSize: '16px', fontWeight: '700' }}
        >
          {showAddForm ? '✖ Cancel' : '➕ Add New Menu Item'}
        </button>
      </div>

      {/* Add/Edit Form */}
      {(showAddForm || editingItem) && (
        <div className="admin-form-container">
          <h3>{editingItem ? 'Edit Item' : 'Add New Item'}</h3>
          <form onSubmit={editingItem ? handleUpdateItem : handleAddItem}>
            <div className="form-group">
              <label>Item Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                style={{ padding: '15px' }}
              />
            </div>
            <div className="form-group">
              <label>Price (₹)</label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleInputChange}
                required
                style={{ padding: '15px' }}
              />
            </div>
            <div className="form-group">
              <label>Image URL</label>
              <input
                type="url"
                name="image"
                value={formData.image}
                onChange={handleInputChange}
                required
                style={{ padding: '15px' }}
              />
            </div>
            <div className="form-group">
              <label>Category</label>
              <select
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                required
              >
                <option value="">Select Category</option>
                <option value="Meals">Meals</option>
                <option value="Snacks">Snacks</option>
                <option value="Breakfast">Breakfast</option>
                <option value="Beverages">Beverages</option>
                <option value="South Indian">South Indian</option>
                <option value="Street Food">Street Food</option>
              </select>
            </div>
            <div style={{ display: 'flex', gap: '10px' }}>
              <button type="submit" className="btn">
                {editingItem ? 'Update Item' : 'Add Item'}
              </button>
              {editingItem && (
                <button type="button" className="btn btn-danger" onClick={cancelEdit}>
                  Cancel
                </button>
              )}
            </div>
          </form>
        </div>
      )}

      {/* Orders Section - Two Column Layout */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px', marginBottom: '40px' }}>
      {/* Student Orders */}
      <div className="admin-items-list" style={{ marginBottom: '0' }}>
        <h3>Student Orders</h3>
        <div className="admin-table">
          {allOrders.filter(order => order.userType === 'Student').length === 0 ? (
            <p style={{ textAlign: 'center', color: '#666', padding: '20px' }}>No student orders yet</p>
          ) : (
            allOrders.filter(order => order.userType === 'Student').map(order => (
              <div key={order.id} className="admin-item-row" style={{ flexDirection: 'column', alignItems: 'flex-start' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', marginBottom: '10px' }}>
                  <div>
                    <h4>Order #{order.id} - {order.userName || 'Student'}</h4>
                    <p style={{ color: '#666', fontSize: '14px' }}>{order.date}</p>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <p style={{ fontSize: '18px', fontWeight: 'bold', color: '#1e3c72' }}>₹{order.total}</p>
                    <p style={{ color: order.status === 'Accepted' ? '#28a745' : order.status === 'Rejected' ? '#ff4757' : '#ffa502', fontSize: '14px' }}>{order.status}</p>
                  </div>
                </div>
                <div style={{ width: '100%', marginBottom: '10px' }}>
                  {order.items.map((item, idx) => (
                    <p key={idx} style={{ color: '#666', fontSize: '14px', margin: '5px 0' }}>
                      {item.name} x {item.quantity} - ₹{item.price * item.quantity}
                    </p>
                  ))}
                </div>
                {order.status === 'Pending' && (
                  <div style={{ display: 'flex', gap: '10px', width: '100%' }}>
                    <button className="btn-edit" onClick={() => updateOrderStatus(order.id, 'Accepted')} style={{ flex: 1 }}>
                      ✓ Accept
                    </button>
                    <button className="btn-delete" onClick={() => updateOrderStatus(order.id, 'Rejected')} style={{ flex: 1 }}>
                      ✗ Reject
                    </button>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </div>

      {/* Faculty Orders */}
      <div className="admin-items-list" style={{ marginBottom: '0' }}>
        <h3>Faculty Orders</h3>
        <div className="admin-table">
          {allOrders.filter(order => order.userType === 'Faculty').length === 0 ? (
            <p style={{ textAlign: 'center', color: '#666', padding: '20px' }}>No faculty orders yet</p>
          ) : (
            allOrders.filter(order => order.userType === 'Faculty').map(order => (
              <div key={order.id} className="admin-item-row" style={{ flexDirection: 'column', alignItems: 'flex-start' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', marginBottom: '10px' }}>
                  <div>
                    <h4>Order #{order.id} - {order.userName || 'Faculty'}</h4>
                    <p style={{ color: '#666', fontSize: '14px' }}>{order.date}</p>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <p style={{ fontSize: '18px', fontWeight: 'bold', color: '#1e3c72' }}>₹{order.total}</p>
                    <p style={{ color: order.status === 'Accepted' ? '#28a745' : order.status === 'Rejected' ? '#ff4757' : '#ffa502', fontSize: '14px' }}>{order.status}</p>
                  </div>
                </div>
                <div style={{ width: '100%', marginBottom: '10px' }}>
                  {order.items.map((item, idx) => (
                    <p key={idx} style={{ color: '#666', fontSize: '14px', margin: '5px 0' }}>
                      {item.name} x {item.quantity} - ₹{item.price * item.quantity}
                    </p>
                  ))}
                </div>
                {order.status === 'Pending' && (
                  <div style={{ display: 'flex', gap: '10px', width: '100%' }}>
                    <button className="btn-edit" onClick={() => updateOrderStatus(order.id, 'Accepted')} style={{ flex: 1 }}>
                      ✓ Accept
                    </button>
                    <button className="btn-delete" onClick={() => updateOrderStatus(order.id, 'Rejected')} style={{ flex: 1 }}>
                      ✗ Reject
                    </button>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </div>
      </div>

      {/* Menu Items List */}
      <div className="admin-items-list">
        <h3>Menu Items</h3>
        <div className="admin-table">
          {menuItems.map(item => (
            <div key={item.id} className="admin-item-row">
              <img src={item.image} alt={item.name} className="admin-item-img" />
              <div className="admin-item-info">
                <h4>{item.name}</h4>
                <p>₹{item.price} | {item.category}</p>
              </div>
              <div className="admin-item-actions">
                <button className="btn-edit" onClick={() => startEdit(item)}>
                  ✏️ Edit
                </button>
                <button className="btn-delete" onClick={() => handleDeleteItem(item.id)}>
                  🗑️ Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Admin;