const API_URL = 'http://localhost:8080/api';

export const api = {
  login: async (email, password) => {
    const res = await fetch(`${API_URL}/users/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    return res.json();
  },
  
  register: async (user) => {
    const res = await fetch(`${API_URL}/users/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(user)
    });
    return res.json();
  },

  getMenuItems: async () => {
    const res = await fetch(`${API_URL}/menu`);
    return res.json();
  },

  addMenuItem: async (item) => {
    const res = await fetch(`${API_URL}/menu`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(item)
    });
    return res.json();
  },

  updateMenuItem: async (id, item) => {
    const res = await fetch(`${API_URL}/menu/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(item)
    });
    return res.json();
  },

  deleteMenuItem: async (id) => {
    await fetch(`${API_URL}/menu/${id}`, { method: 'DELETE' });
  },

  getAllOrders: async () => {
    const res = await fetch(`${API_URL}/orders`);
    return res.json();
  },

  getUserOrders: async (email) => {
    const res = await fetch(`${API_URL}/orders/user/${email}`);
    return res.json();
  },

  createOrder: async (order) => {
    const res = await fetch(`${API_URL}/orders`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(order)
    });
    return res.json();
  },

  updateOrderStatus: async (id, status) => {
    const res = await fetch(`${API_URL}/orders/${id}/status`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status })
    });
    return res.json();
  }
};
