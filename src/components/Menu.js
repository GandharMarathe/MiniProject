import React, { useState, useEffect } from 'react';

function Menu({ menuItems, addToCart }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [quantities, setQuantities] = useState({});
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [loadingItems, setLoadingItems] = useState({});

  const categories = ['All', ...new Set(menuItems.map(item => item.category))];
  
  const filteredItems = menuItems.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         item.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  useEffect(() => {
    // Intersection Observer for scroll animations
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate');
        }
      });
    }, observerOptions);

    // Use a timeout to ensure DOM is updated
    const timeoutId = setTimeout(() => {
      document.querySelectorAll('.menu-item-card').forEach(el => {
        observer.observe(el);
      });
    }, 100);

    return () => {
      clearTimeout(timeoutId);
      observer.disconnect();
    };
  }, [filteredItems]);

  const changeQuantity = (itemId, change) => {
    setQuantities(prev => ({
      ...prev,
      [itemId]: Math.max(1, (prev[itemId] || 1) + change)
    }));
  };

  const handleAddToCart = (itemId) => {
    const qty = quantities[itemId] || 1;
    
    setLoadingItems(prev => ({ ...prev, [itemId]: true }));
    
    // Simulate loading for better UX
    setTimeout(() => {
      addToCart(itemId, qty);
      setQuantities(prev => ({ ...prev, [itemId]: 1 }));
      setLoadingItems(prev => ({ ...prev, [itemId]: false }));
    }, 800);
  };

  return (
    <div className="menu-page">
      {/* Hero Banner */}
      <div className="menu-hero">
        <div className="menu-hero-content">
          <h1 className="menu-title fade-in">Our Delicious Menu</h1>
          <p className="menu-subtitle fade-in">Fresh, tasty, and made with love</p>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="menu-controls fade-in">
        <div className="search-container-modern">
          <div className="search-wrapper">
            <span className="search-icon">🔍</span>
            <input 
              type="text" 
              className="search-input-modern" 
              placeholder="Search dishes, cuisines..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        
        <div className="category-filters">
          {categories.map(category => (
            <button
              key={category}
              className={`category-btn ${
                selectedCategory === category ? 'active' : ''
              }`}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Menu Items */}
      <div className="menu-container">
        <div className="menu-grid-modern">
          {filteredItems.map((item, index) => (
            <div 
              key={item.id} 
              className="menu-item-card"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="item-image-container">
                <img src={item.image} alt={item.name} className="item-image" />
                <div className="item-badge">
                  <span className="veg-indicator">🟢</span>
                </div>
              </div>
              
              <div className="item-content">
                <div className="item-header">
                  <h3 className="item-name">{item.name}</h3>
                  <div className="item-rating">
                    <span className="stars">★★★★☆</span>
                    <span className="rating-text">4.2</span>
                  </div>
                </div>
                
                <p className="item-category">{item.category}</p>
                <p className="item-description">
                  Freshly prepared with authentic spices and ingredients
                </p>
                
                <div className="item-footer">
                  <div className="price-section">
                    <span className="current-price">₹{item.price}</span>
                  </div>
                  
                  <div className="quantity-section">
                    <div className="quantity-controls-modern">
                      <button 
                        className="qty-btn" 
                        onClick={() => changeQuantity(item.id, -1)}
                      >
                        −
                      </button>
                      <span className="qty-display">{quantities[item.id] || 1}</span>
                      <button 
                        className="qty-btn" 
                        onClick={() => changeQuantity(item.id, 1)}
                      >
                        +
                      </button>
                    </div>
                    
                    <button 
                      className={`add-btn ${
                        loadingItems[item.id] ? 'loading' : ''
                      }`}
                      onClick={() => handleAddToCart(item.id)}
                      disabled={loadingItems[item.id]}
                    >
                      {loadingItems[item.id] ? (
                        <span className="loading-spinner">⏳</span>
                      ) : (
                        'ADD'
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {filteredItems.length === 0 && (
          <div className="no-results">
            <div className="no-results-icon">🍽️</div>
            <h3>No dishes found</h3>
            <p>Try searching for something else</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Menu;