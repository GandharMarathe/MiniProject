import React, { useState, useEffect } from 'react';

const App = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [showDescriptionModal, setShowDescriptionModal] = useState(false);
  const [modalContent, setModalContent] = useState('');
  const [isLoadingDescription, setIsLoadingDescription] = useState(false);
  const [showCartModal, setShowCartModal] = useState(false);
  const [showProfilePage, setShowProfilePage] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [showMessageBox, setShowMessageBox] = useState(false);
  const [messageBoxContent, setMessageBoxContent] = useState('');

  const initialFoodCategories = [
    {
      id: 'pizzas',
      name: 'Breakfast',
      items: [
        { id: 'pizza1', name: 'Dosa', price: 50, image: 'https://imgs.search.brave.com/hoHdqTYHbd9LbL7CigWUK2393waiW0R926MWrwg3XRM/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9zdGF0/aWMudmVjdGVlenku/Y29tL3N5c3RlbS9y/ZXNvdXJjZXMvdGh1/bWJuYWlscy8wNjUv/NDA4LzQxNC9zbWFs/bC92aWJyYW50LWNy/aXNweS1kb3NhLXBh/aXJlZC13aXRoLWNy/ZWFteS1zZW1peWEt/a2hlZXItZm9yLWEt/Zmxhdm9yZnVsLW1l/YWwtcGhvdG8uanBn' },
        { id: 'pizza2', name: 'Masala Dosa', price: 70, image: 'https://imgs.search.brave.com/bWh1uUgB8yxLxI-W0Z0bjz-JxaITlu9w0f8HsqbOh8w/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93d3cu/dmVncmVjaXBlc29m/aW5kaWEuY29tL3dw/LWNvbnRlbnQvdXBs/b2Fkcy8yMDIxLzA2/L21hc2FsYS1kb3Nh/LTItMjgweDI4MC5q/cGc' },
        { id: 'pizza3', name: 'Idli', price: 40, image: 'https://imgs.search.brave.com/T7pXl6iFobHlKvIC3dR2aOXpnMgn2RMj05kq-Y-ldJM/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93d3cu/c2h1dHRlcnN0b2Nr/LmNvbS9pbWFnZS1w/aG90by9pZGx5LXNh/bWJhci1pZGxpLXNh/bWJoYXItZ3JlZW4t/MjYwbnctMTE1NDA3/MzY5Ny5qcGc' },
        { id: 'pizza4', name: 'Medu wada', price: 50, image: 'https://imgs.search.brave.com/4BZJFJRODgG4ZfXyt8FmqvgtIA6lydOK_yUA90BgQd8/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWFn/ZS5zaHV0dGVyc3Rv/Y2suY29tL2ltYWdl/LXBob3RvL21lZHUt/d2FkYS1zYW1iaGFy/LWNvY29udXQtY2h1/dG5leS0yNjBudy0x/NDUxNTA0NjA5Lmpw/Zw' },
        { id: 'pizza5', name: 'Idli wada', price: 45, image: 'https://imgs.search.brave.com/x0mCjULDB9lJSreEf-n4hsWQsBWAtY-kSSYinf7SWvk/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly90My5m/dGNkbi5uZXQvanBn/LzAxLzcxLzY5Lzky/LzM2MF9GXzE3MTY5/OTIxOF9hYjdYWEpF/WXNYdk42amhUOTRu/dWZWczE1VVYyVGFp/dS5qcGc' },
      ],
    },
    {
      id: 'burgers',
      name: 'Lunch',
      items: [
        { id: 'burger1', name: 'Thali', price: 150, image: 'https://imgs.search.brave.com/3gzcuRrmvH34747hJcW4aS5DSpwW3XR-6yij-6N1d6I/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pLnBp/bmltZy5jb20vb3Jp/Z2luYWxzLzVmLzI0/LzAwLzVmMjQwMDlk/MTUzOTZkODUyMDUy/NDllMzJiZDI2ZDhj/LmpwZw' },
        { id: 'burger2', name: 'Chapati', price: 10, image: 'https://imgs.search.brave.com/OFfLv_olXxZjtTw6Sd3WBLWO7gnSQCqttlJwAcZwuEE/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly90aHVt/YnMuZHJlYW1zdGlt/ZS5jb20vYi90YXN0/eS1jaGFwYXRpLW1h/ZGUtd2hlYXQtZmxv/dXItaGVhbHRoeS1p/bmRpYW4taW5kaWFu/LWN1aXNpbmUtNTgw/NTAyNjEuanBn' },
        { id: 'burger3', name: 'Mix Veg', price: 50, image: 'https://imgs.search.brave.com/C9QLor6vfMNPk3yHjTdml6KJQjl08SmHbAPEj3e_JKg/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93d3cu/dmVncmVjaXBlc29m/aW5kaWEuY29tL3dw/LWNvbnRlbnQvdXBs/b2Fkcy8yMDEwLzA2/L21peC12ZWctcmVj/aXBlMTcuanBn' },
        { id: 'burger4', name: 'Paneer', price: 70, image: 'https://imgs.search.brave.com/2WmVwPyHkkalv4lRR1dCNlxwVMMF9mn6xdPWdqTajfo/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWFn/ZXMucHJhYmhhc2Fr/c2hpLmNvbS8yMDIx/LzkvMjAyMV85JDIw/MjEwOTAzMTcwODAw/MDM2MTZfMF9uZXdz/X2xhcmdlXzIzLnBu/Zw' },
      ],
    },
    {
      id: 'desserts',
      name: 'Chinese',
      items: [
        { id: 'dessert1', name: 'Noodles', price: 50, image: 'https://imgs.search.brave.com/6SIcr03m6D-0kq5pxw-9dTJv0YoTOIkBm6dODbUZwdk/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9zdGF0/aWMudmVjdGVlenku/Y29tL3N5c3RlbS9y/ZXNvdXJjZXMvdGh1/bWJuYWlscy8wMzgv/MDc5LzI2OS9zbWFs/bC9haS1nZW5lcmF0/ZWQtZnJlc2gtbm9v/ZGxlcy1hbmQtdmVn/ZXRhYmxlcy1zdGly/LWZyeS1oZWFsdGh5/LWZvb2QtZ2VuZXJh/dGl2ZS1haS1waG90/by5qcGc' },
        { id: 'dessert2', name: 'Fried Rice', price: 50, image: 'https://imgs.search.brave.com/_WQWYKGqDwJJ-sUJeHth_R7jJow9Pb9iDz4XnZ2fZBg/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvMTI5/MjYxNzUwNy9waG90/by90YXN0eS12ZWct/c2NoZXp3YW4tZnJp/ZWQtcmljZS1zZXJ2/ZWQtaW4tYm93bC1v/dmVyLWEtcnVzdGlj/LXdvb2Rlbi1iYWNr/Z3JvdW5kLWluZGlh/bi1jdWlzaW5lLmpw/Zz9zPTYxMng2MTIm/dz0wJms9MjAmYz1N/bGZpRldiY1BEVWoy/d25qdHhvSEJ4U1Vy/UnJLYjljMU9SOHJT/OUg0Z29jPQ' },
        { id: 'dessert3', name: 'Manchurian', price: 30, image: 'https://imgs.search.brave.com/MbCSMQFut-C-1nOvdC3-kzpvXNLz6gYd7k8W0cxKZHo/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9zdG9y/YWdlLmdvb2dsZWFw/aXMuY29tL2NzY29t/LTIwMTkuYXBwc3Bv/dC5jb20vdXBsb2Fk/cy8yMDE4LzA4L0Nh/YmJhZ2UtTWFuY2h1/cmlhbi5qcGc' },
      ],
    },
  ];

  const [filteredFoodCategories, setFilteredFoodCategories] = useState(initialFoodCategories);

  useEffect(() => {
    if (searchTerm === '') {
      setFilteredFoodCategories(initialFoodCategories);
    } else {
      const lowerCaseSearchTerm = searchTerm.toLowerCase();
      const newFilteredCategories = initialFoodCategories.map(category => ({
        ...category,
        items: category.items.filter(item =>
          item.name.toLowerCase().includes(lowerCaseSearchTerm)
        )
      })).filter(category => category.items.length > 0);
      setFilteredFoodCategories(newFilteredCategories);
    }
  }, [searchTerm]);

  const [cartItems, setCartItems] = useState({});

  const updateQuantity = (itemId, newQuantity) => {
    setCartItems(prevItems => {
      const updatedItems = { ...prevItems };
      if (newQuantity <= 0) {
        delete updatedItems[itemId];
      } else {
        updatedItems[itemId] = newQuantity;
      }
      return updatedItems;
    });
  };

  const totalCartItems = Object.values(cartItems).reduce((sum, qty) => sum + qty, 0);

  const onEnhanceDescription = async (itemName) => {
    setIsLoadingDescription(true);
    setModalContent('');
    setShowDescriptionModal(true);

    try {
      let chatHistory = [];
      const prompt = `Generate a short, enticing, and hunger-inducing description for "${itemName}". Focus on taste, aroma, and texture. Keep it under 50 words.`;
      chatHistory.push({ role: "user", parts: [{ text: prompt }] });

      const payload = { contents: chatHistory };
      const apiKey = "";
      const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const result = await response.json();

      if (result.candidates && result.candidates.length > 0 &&
          result.candidates[0].content && result.candidates[0].content.parts &&
          result.candidates[0].content.parts.length > 0) {
        const text = result.candidates[0].content.parts[0].text;
        setModalContent(text);
      } else {
        setModalContent("Failed to generate description. Please try again.");
        console.error("Gemini API response structure unexpected:", result);
      }
    } catch (error) {
      setModalContent("Error generating description. Please check your network or try again later.");
      console.error("Error calling Gemini API:", error);
    } finally {
      setIsLoadingDescription(false);
    }
  };

  const ProfileIcon = ({ openProfile }) => (
    <div className="profile-icon-container" onClick={openProfile}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="profile-icon-svg"
      >
        <path
          fillRule="evenodd"
          d="M7.5 6a4.5 4.5 0 1 1 9 0a4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z"
          clipRule="evenodd"
        />
      </svg>
    </div>
  );

  const Header = ({ toggleSidebar, setSearchTerm, openProfile }) => (
    <header className="app-header">
      <div className="header-content">
        <button className="hamburger-menu" onClick={toggleSidebar}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="hamburger-icon"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
          </svg>
        </button>
        <h1 className="app-logo">
          APSIT CANTEEN 🍱
        </h1>
        <div className="search-bar-container">
          <input
            type="text"
            placeholder="Search for food..."
            className="search-input"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="search-icon"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
            />
          </svg>
        </div>
      </div>
      <ProfileIcon openProfile={openProfile} />
    </header>
  );

  const Sidebar = ({ isSidebarOpen, closeSidebar, openCartModal }) => (
    <>
      <aside className={`app-sidebar ${isSidebarOpen ? 'sidebar-open' : ''}`}>
        <div className="sidebar-header">
          <h2 className="sidebar-title">Menu</h2>
          <button className="sidebar-close-button" onClick={closeSidebar}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="sidebar-close-icon"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <nav>s
          <ul>
            <li className="sidebar-list-item">
              <a
                href="#"
                className="sidebar-link"
                onClick={closeSidebar}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="sidebar-icon orange-icon"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9.53 16.122a3 3 0 0 0-5.78 1.128 2.25 2.25 0 0 1-2.494-2.478c.357-1.452-.364-2.891-1.995-3.658L1.1 9.874l4.26-.96a4.5 4.5 0 0 0 2.433-4.373C7.75 2.901 9.663 1.5 12 1.5s4.25 1.401 4.507 3.001a4.5 4.5 0 0 0 2.433 4.373l4.26.96-1.64 1.64a2.25 2.25 0 0 1-2.494 2.478 3 3 0 0 0-5.78-1.128 3 3 0 0 0-5.78 1.128Z"
                  />
                </svg>
                <span>Categories</span>
              </a>
            </li>
            <li className="sidebar-list-item">
              <a
                href="#"
                className="sidebar-link"
                onClick={closeSidebar}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="sidebar-icon red-icon"
                >
                  <path d="m11.645 20.917-7.397-7.397 1.414-1.414L12 18.12l5.94-5.94 1.414 1.414-7.398 7.397Z" />
                  <path d="M12 6.042A3.5 3.5 0 0 0 8.5 2.5a3.5 3.5 0 0 0-3.5 3.5v1.5A3.5 3.5 0 0 0 8.5 11h3.5v7.5l7.397-7.397-1.416-1.414L12 15.12V6.042Z" />
                </svg>
                <span>Favorite List</span>
              </a>
            </li>
          </ul>
        </nav>
        <div className="cart-payment-section">
          <button
            className="cart-button"
            onClick={() => {
              openCartModal();
              closeSidebar();
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="cart-icon-svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.25 3h1.386c.51 0 .955.343 1.023.828L5.58 15.322a2.25 2.25 0 0 0 2.247 2.179H16.25a2.25 2.25 0 0 0 2.247-2.179L21.58 6.5H3.257M15 12h6m-3 3v-6"
              />
            </svg>
            <span>Cart</span>
            {totalCartItems > 0 && (
              <span className="cart-item-count animate-bounce-slow">
                {totalCartItems}
              </span>
            )}
          </button>
          {totalCartItems > 0 && (
            <button
              onClick={() => {
                setMessageBoxContent('Proceeding to payment! (This is a placeholder action)');
                setShowMessageBox(true);
                closeSidebar();
              }}
              className="proceed-to-pay-button"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="payment-icon-svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3.75h15.375a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5H4.5A2.25 2.25 0 0 0 2.25 6.75v10.5A2.25 2.25 0 0 0 4.5 19.5Z"
                />
              </svg>
              <span>Proceed to Pay</span>
            </button>
          )}
        </div>
      </aside>
      {isSidebarOpen && <div className="sidebar-overlay" onClick={closeSidebar}></div>}
    </>
  );

  const FoodCard = ({ item, updateQuantity, quantityInCart, onEnhanceDescription }) => {
    return (
      <div className="food-card">
        <img
          src={item.image}
          alt={item.name}
          className="food-card-image"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = `https://placehold.co/300x200/CCCCCC/333333?text=Image+Error`;
          }}
        />
        <div className="food-card-content">
          <h3 className="food-card-name">{item.name}</h3>
          <p className="food-card-price">₹{item.price.toFixed(2)}</p>
          <div className="quantity-controls">
            <button
              onClick={() => updateQuantity(item.id, quantityInCart - 1)}
              className="quantity-button minus-button"
            >
              -
            </button>
            <span className="quantity-display">
              {quantityInCart}
            </span>
            <button
              onClick={() => updateQuantity(item.id, quantityInCart + 1)}
              className="quantity-button plus-button"
            >
              +
            </button>
          </div>
          <button
            onClick={() => onEnhanceDescription(item.name)}
            className="enhance-description-button"
          >
            ✨ Enhance Description
          </button>
        </div>
      </div>
    );
  };

  const FoodSection = ({ category, updateQuantity, cartItems, onEnhanceDescription }) => (
    <section className="food-section">
      <h2 className="food-section-title">
        {category.name}
      </h2>
      <div className="food-items-container scrollbar-hide">
        {category.items.map((item) => (
          <FoodCard
            key={item.id}
            item={item}
            updateQuantity={updateQuantity}
            quantityInCart={cartItems[item.id] || 0}
            onEnhanceDescription={onEnhanceDescription}
          />
        ))}
      </div>
    </section>
  );

  const DescriptionModal = ({ content, isOpen, onClose, isLoading }) => {
    return (
      <div className={`modal-overlay ${isOpen ? 'open' : ''}`} onClick={onClose}>
        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
          <button className="modal-close-button" onClick={onClose}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="modal-close-icon"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
            </svg>
          </button>
          <h3 className="modal-title">Enhanced Description</h3>
          {isLoading ? (
            <div className="loading-spinner"></div>
          ) : (
            <p className="modal-text">{content}</p>
          )}
        </div>
      </div>
    );
  };

  const CartModal = ({ cartItems, foodCategories, isOpen, onClose, updateQuantity, openMessageBox }) => {
    const allFoodItems = foodCategories.flatMap(category => category.items);

    return (
      <div className={`modal-overlay ${isOpen ? 'open' : ''}`} onClick={onClose}>
        <div className="modal-content cart-modal-content" onClick={(e) => e.stopPropagation()}>
          <button className="modal-close-button" onClick={onClose}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="modal-close-icon"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
            </svg>
          </button>
          <h3 className="modal-title">Your Cart</h3>
          {Object.keys(cartItems).length === 0 ? (
            <p className="modal-text">Your cart is empty. Start adding some delicious food!</p>
          ) : (
            <div className="cart-items-list">
              {Object.entries(cartItems).map(([itemId, quantity]) => {
                const item = allFoodItems.find(foodItem => foodItem.id === itemId);
                if (!item) return null;

                return (
                  <div key={item.id} className="cart-item">
                    <img src={item.image} alt={item.name} className="cart-item-image" />
                    <div className="cart-item-info">
                      <span className="cart-item-name">{item.name}</span>
                      <span className="cart-item-price">₹{item.price.toFixed(2)}</span>
                    </div>
                    <div className="cart-item-quantity-controls">
                      <button onClick={() => updateQuantity(item.id, quantity - 1)} className="quantity-button minus-button">-</button>
                      <span className="quantity-display">{quantity}</span>
                      <button onClick={() => updateQuantity(item.id, quantity + 1)} className="quantity-button plus-button">+</button>
                    </div>
                  </div>
                );
              })}
              <div className="cart-total">
                <span>Total:</span>
                <span>₹{Object.entries(cartItems).reduce((total, [itemId, quantity]) => {
                  const item = allFoodItems.find(foodItem => foodItem.id === itemId);
                  return total + (item ? item.price * quantity : 0);
                }, 0).toFixed(2)}</span>
              </div>
              <button
                onClick={() => {
                  openMessageBox('Proceeding to payment from cart! (Placeholder)');
                  onClose();
                }}
                className="proceed-to-pay-button cart-modal-pay-button"
              >
                Proceed to Pay
              </button>
            </div>
          )}
        </div>
      </div>
    );
  };

  const ProfilePage = ({ isOpen, onClose }) => {
    return (
      <div className={`modal-overlay ${isOpen ? 'open' : ''}`} onClick={onClose}>
        <div className="modal-content profile-page-content" onClick={(e) => e.stopPropagation()}>
          <button className="modal-close-button" onClick={onClose}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="modal-close-icon"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
            </svg>
          </button>
          <h3 className="modal-title">Your Profile</h3>
          <div className="profile-details">
            <img src="https://placehold.co/100x100/FFC300/333333?text=User" alt="User Profile" className="profile-avatar" />
            <p><strong>Name:</strong> John Doe</p>
            <p><strong>Email:</strong> john.doe@example.com</p>
            <p><strong>Phone:</strong> +91 98765 43210</p>
            <p><strong>Address:</strong> 123 Foodie Lane, Hunger City, India</p>
            <button className="edit-profile-button">Edit Profile</button>
          </div>
        </div>
      </div>
    );
  };

  const MessageBox = ({ content, isOpen, onClose }) => {
    return (
      <div className={`modal-overlay ${isOpen ? 'open' : ''}`} onClick={onClose}>
        <div className="modal-content message-box-content" onClick={(e) => e.stopPropagation()}>
          <button className="modal-close-button" onClick={onClose}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="modal-close-icon"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
            </svg>
          </button>
          <h3 className="modal-title">Notification</h3>
          <p className="modal-text">{content}</p>
          <button onClick={onClose} className="message-box-ok-button">OK</button>
        </div>
      </div>
    );
  };

  return (
    <div className="app-container">
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800&display=swap" rel="stylesheet" />
      <style>{`
        body {
          margin: 0;
          font-family: 'Inter', sans-serif;
          color: #374151;
        }
        .app-container {
          min-height: 100vh;
          background-color: #FFFBEB;
          display: flex;
          flex-direction: column;
        }
        .app-header {
          background: linear-gradient(to right, #DC2626, #F97316);
          color: #FFFFFF;
          padding: 1rem;
          box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
          display: flex;
          align-items: center;
          justify-content: space-between;
          border-bottom-left-radius: 2rem;
          border-bottom-right-radius: 2rem;
          transform: translateY(0);
          transition: transform 0.3s ease-in-out;
        }
        .app-header:hover {
          transform: translateY(0);
        }
        .header-content {
          display: flex;
          align-items: center;
          gap: 1rem;
        }
        .app-logo {
          font-size: 2.25rem;
          font-weight: 800;
          letter-spacing: 0.05em;
          text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
        }
        @media (min-width: 640px) {
          .app-logo {
            font-size: 2.5rem;
          }
        }
        .search-bar-container {
          position: relative;
          flex-grow: 1;
          max-width: 28rem;
        }
        .search-input {
          width: 100%;
          padding: 0.5rem 1rem 0.5rem 2.5rem;
          border-radius: 9999px;
          background-color: rgba(255, 255, 255, 0.9);
          color: #1F2937;
          color: #6B7280;
          border: none;
          outline: none;
          box-shadow: inset 0 2px 4px 0 rgba(0, 0, 0, 0.06);
          transition: all 0.2s ease-in-out;
        }
        .search-input:focus {
          outline: none;
          box-shadow: 0 0 0 4px rgba(251, 191, 36, 0.75);
        }
        .search-icon {
          width: 1.25rem;
          height: 1.25rem;
          position: absolute;
          left: 0.75rem;
          top: 50%;
          transform: translateY(-50%);
          color: #6B7280;
        }
        .hamburger-menu {
          background: none;
          border: none;
          cursor: pointer;
          padding: 0.5rem;
          display: block;
          color: white;
          margin-right: 1rem;
        }
        .hamburger-icon {
          width: 1.75rem;
          height: 1.75rem;
        }
        @media (min-width: 768px) {
          .hamburger-menu {
            display: none;
          }
        }
        .profile-icon-container {
          position: relative;
          cursor: pointer;
          padding: 0.5rem;
          border-radius: 9999px;
          background-color: #F97316;
          transition: all 0.3s ease-in-out;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.06);
        }
        .profile-icon-container:hover {
          background-color: #EA580C;
          box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
        }
        .profile-icon-svg {
          width: 1.5rem;
          height: 1.5rem;
          color: #FFFFFF;
        }
        .profile-tooltip { display: none; }
        .app-sidebar {
          position: fixed;
          top: 0;
          left: 0;
          height: 100%;
          max-width: 16rem;
          width: 100%;
          background-color: #FFFBEB;
          padding: 1.5rem;
          box-shadow: 10px 0 15px -3px rgba(0, 0, 0, 0.1), 4px 0 6px -2px rgba(0, 0, 0, 0.05);
          border-top-right-radius: 2rem;
          border-bottom-right-radius: 2rem;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          transform: translateX(-100%);
          transition: transform 0.3s ease-in-out;
          z-index: 1000;
          box-sizing: border-box;
        }
        .app-sidebar.sidebar-open {
          transform: translateX(0);
        }
        @media (min-width: 768px) {
          .app-sidebar {
            position: static;
            transform: translateX(0);
            width: 16rem;
            max-width: none;
            box-shadow: 10px 0 15px -3px rgba(0, 0, 0, 0.1), 4px 0 6px -2px rgba(0, 0, 0, 0.05);
          }
        }
        .sidebar-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1.5rem;
          border-bottom: 2px solid #FDBA74;
          padding-bottom: 0.5rem;
        }
        .sidebar-title {
          font-size: 1.5rem;
          font-weight: 700;
          color: #C2410C;
        }
        .sidebar-close-button {
          background: none;
          border: none;
          cursor: pointer;
          padding: 0.25rem;
          color: #C2410C;
          display: block;
        }
        .sidebar-close-icon {
          width: 1.5rem;
          height: 1.5rem;
        }
        @media (min-width: 768px) {
          .sidebar-close-button {
            display: none;
          }
        }
        .sidebar-list-item {
          margin-bottom: 1rem;
        }
        .sidebar-link {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          color: #374151;
          text-decoration: none;
          font-weight: 600;
          font-size: 1.125rem;
          transition: all 0.2s ease-in-out;
          padding: 0.75rem;
          border-radius: 0.75rem;
          transform: scale(1);
        }
        .sidebar-link:hover {
          color: #EA580C;
          background-color: #FEE7B6;
          transform: scale(1.05);
        }
        .sidebar-icon {
          width: 1.5rem;
          height: 1.5rem;
        }
        .orange-icon {
          color: #F97316;
        }
        .red-icon {
          color: #EF4444;
        }
        .sidebar-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: rgba(0, 0, 0, 0.5);
          z-index: 999;
          transition: opacity 0.3s ease-in-out;
        }
        .main-content-area {
          display: flex;
          flex: 1;
        }
        .main-food-display {
          flex: 1;
          padding: 2rem;
          overflow-y: auto;
        }
        .cart-payment-section {
          margin-top: auto;
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }
        .cart-button, .proceed-to-pay-button {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.75rem;
          font-weight: 700;
          padding: 0.75rem 1rem;
          border-radius: 9999px;
          box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
          transition: all 0.3s ease-in-out;
          position: relative;
          text-decoration: none;
          transform: scale(1);
          border: none;
          cursor: pointer;
        }
        .cart-button {
          background-color: #F97316;
          color: #FFFFFF;
        }
        .cart-button:hover {
          background-color: #EA580C;
          transform: scale(1.05);
        }
        .proceed-to-pay-button {
          background-color: #16A34A;
          color: #FFFFFF;
        }
        .proceed-to-pay-button:hover {
          background-color: #15803D;
          transform: scale(1.05);
        }
        .cart-icon-svg, .payment-icon-svg {
          width: 1.5rem;
          height: 1.5rem;
          color: #FFFFFF;
        }
        .cart-item-count {
          position: absolute;
          top: -0.5rem;
          right: -0.5rem;
          background-color: #991B1B;
          color: #FFFFFF;
          font-size: 0.75rem;
          font-weight: 700;
          border-radius: 9999px;
          height: 1.5rem;
          width: 1.5rem;
          display: flex;
          align-items: center;
          justify-content: center;
          animation: bounce-slow 1.5s infinite;
        }
        .food-card {
          flex-shrink: 0;
          width: 16rem;
          background-color: #FFFFFF;
          border-radius: 0.75rem;
          box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
          transition: all 0.3s ease-in-out;
          overflow: hidden;
          margin: 1rem;
          border: 1px solid #F3F4F6;
          transform: translateY(0) scale(1);
        }
        .food-card:hover {
          box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.05);
          transform: translateY(-0.5rem) scale(1.05);
        }
        .food-card-image {
          width: 100%;
          height: 9rem;
          object-fit: cover;
          border-top-left-radius: 0.75rem;
          border-top-right-radius: 0.75rem;
        }
        .food-card-content {
          padding: 1rem;
        }
        .food-card-name {
          font-size: 1.25rem;
          font-weight: 600;
          color: #1F2937;
          margin-bottom: 0.25rem;
        }
        .food-card-price {
          color: #EA580C;
          font-weight: 700;
          font-size: 1.125rem;
          margin-bottom: 0.75rem;
        }
        .quantity-controls {
          display: flex;
          align-items: center;
          justify-content: space-between;
          background-color: #FFF7ED;
          border-radius: 9999px;
          padding: 0.25rem;
        }
        .quantity-button {
          border-radius: 9999px;
          width: 2rem;
          height: 2rem;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.25rem;
          font-weight: 700;
          transition: all 0.2s ease-in-out;
          border: none;
          cursor: pointer;
          outline: none;
        }
        .minus-button {
          background-color: #FED7AA;
          color: #9A3412;
        }
        .minus-button:hover {
          background-color: #FDBA74;
        }
        .minus-button:focus {
          outline: none;
          box-shadow: 0 0 0 2px #FDBA74;
        }
        .minus-button:active {
          background-color: #FDBA74;
          color: #FFFFFF;
        }
        .plus-button {
          background-color: #EA580C;
          color: #FFFFFF;
        }
        .plus-button:hover {
          background-color: #C2410C;
        }
        .plus-button:focus {
          outline: none;
          box-shadow: 0 0 0 2px #FDBA74;
        }
        .plus-button:active {
          background-color: #9A3412;
        }
        .quantity-display {
          font-size: 1.25rem;
          font-weight: 700;
          color: #C2410C;
          margin: 0 0.5rem;
        }
        .enhance-description-button {
          background-color: #4CAF50;
          color: white;
          border: none;
          border-radius: 9999px;
          padding: 0.5rem 1rem;
          margin-top: 1rem;
          cursor: pointer;
          font-weight: 600;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          width: 100%;
          transition: background-color 0.2s ease-in-out, transform 0.2s ease-in-out;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }
        .enhance-description-button:hover {
          background-color: #45a049;
          transform: translateY(-2px);
          box-shadow: 0 6px 8px rgba(0, 0, 0, 0.15);
        }
        .enhance-description-button:active {
          background-color: #3e8e41;
          transform: translateY(0);
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }
        .food-section {
          margin-bottom: 2rem;
        }
        .food-section-title {
          font-size: 1.875rem;
          font-weight: 700;
          color: #C2410C;
          margin-bottom: 1.5rem;
          padding-left: 1rem;
          border-bottom: 2px solid #FDBA74;
          padding-bottom: 0.5rem;
        }
        .food-items-container {
          display: flex;
          overflow-x: auto;
          padding-bottom: 1rem;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        @keyframes bounce-slow {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-8px);
          }
        }
        .animate-bounce-slow {
          animation: bounce-slow 1.5s infinite;
        }
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: rgba(0, 0, 0, 0.6);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 2000;
          opacity: 0;
          pointer-events: none;
          transition: opacity 0.3s ease-in-out;
        }
        .modal-overlay.open {
          opacity: 1;
          pointer-events: auto;
        }
        .modal-content {
          background-color: #FFFFFF;
          padding: 2rem;
          border-radius: 1rem;
          box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
          max-width: 500px;
          width: 90%;
          position: relative;
          transform: translateY(-20px);
          transition: transform 0.3s ease-in-out;
          max-height: 90vh;
          overflow-y: auto;
        }
        .modal-overlay.open .modal-content {
          transform: translateY(0);
        }
        .modal-close-button {
          position: absolute;
          top: 1rem;
          right: 1rem;
          background: none;
          border: none;
          cursor: pointer;
          color: #6B7280;
          font-size: 1.5rem;
          padding: 0.25rem;
          transition: color 0.2s ease-in-out;
        }
        .modal-close-button:hover {
          color: #EF4444;
        }
        .modal-close-icon {
          width: 1.5rem;
          height: 1.5rem;
        }
        .modal-title {
          font-size: 1.75rem;
          font-weight: 700;
          color: #C2410C;
          margin-bottom: 1rem;
          border-bottom: 1px solid #FDBA74;
          padding-bottom: 0.5rem;
        }
        .modal-text {
          font-size: 1rem;
          line-height: 1.5;
          color: #374151;
        }
        .loading-spinner {
          border: 4px solid #f3f3f3;
          border-top: 4px solid #F97316;
          border-radius: 50%;
          width: 40px;
          height: 40px;
          animation: spin 1s linear infinite;
          margin: 2rem auto;
        }
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        .cart-modal-content {
          max-width: 600px;
        }
        .cart-items-list {
          display: flex;
          flex-direction: column;
          gap: 1rem;
          margin-top: 1.5rem;
        }
        .cart-item {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 0.75rem;
          border: 1px solid #FDBA74;
          border-radius: 0.5rem;
          background-color: #FFF7ED;
        }
        .cart-item-image {
          width: 60px;
          height: 60px;
          object-fit: cover;
          border-radius: 0.5rem;
        }
        .cart-item-info {
          flex-grow: 1;
          display: flex;
          flex-direction: column;
        }
        .cart-item-name {
          font-weight: 600;
          color: #1F2937;
        }
        .cart-item-price {
          font-size: 0.9rem;
          color: #EA580C;
        }
        .cart-item-quantity-controls {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }
        .cart-total {
          display: flex;
          justify-content: space-between;
          font-size: 1.25rem;
          font-weight: 700;
          margin-top: 1.5rem;
          padding-top: 1rem;
          border-top: 2px dashed #FDBA74;
          color: #C2410C;
        }
        .cart-modal-pay-button {
          margin-top: 1.5rem;
        }
        .profile-page-content {
          text-align: center;
        }
        .profile-details {
          margin-top: 1.5rem;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.75rem;
        }
        .profile-avatar {
          width: 100px;
          height: 100px;
          border-radius: 50%;
          object-fit: cover;
          border: 3px solid #F97316;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
          margin-bottom: 1rem;
        }
        .profile-details p {
          font-size: 1.1rem;
          color: #374151;
          margin: 0;
        }
        .profile-details strong {
          color: #C2410C;
        }
        .edit-profile-button {
          background-color: #F97316;
          color: white;
          border: none;
          border-radius: 9999px;
          padding: 0.75rem 1.5rem;
          margin-top: 1.5rem;
          cursor: pointer;
          font-weight: 600;
          transition: background-color 0.2s ease-in-out, transform 0.2s ease-in-out;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }
        .edit-profile-button:hover {
          background-color: #EA580C;
          transform: translateY(-2px);
          box-shadow: 0 6px 8px rgba(0, 0, 0, 0.15);
        }
        .message-box-content {
          max-width: 400px;
          text-align: center;
        }
        .message-box-ok-button {
          background-color: #F97316;
          color: white;
          border: none;
          border-radius: 9999px;
          padding: 0.75rem 1.5rem;
          margin-top: 1.5rem;
          cursor: pointer;
          font-weight: 600;
          transition: background-color 0.2s ease-in-out, transform 0.2s ease-in-out;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }
        .message-box-ok-button:hover {
          background-color: #EA580C;
          transform: translateY(-2px);
          box-shadow: 0 6px 8px rgba(0, 0, 0, 0.15);
        }
      `}</style>
      <Header
        toggleSidebar={() => setIsSidebarOpen(true)}
        setSearchTerm={setSearchTerm}
        openProfile={() => setShowProfilePage(true)}
      />
      <div className="main-content-area">
        <Sidebar
          isSidebarOpen={isSidebarOpen}
          closeSidebar={() => setIsSidebarOpen(false)}
          openCartModal={() => setShowCartModal(true)}
        />
        <main className="main-food-display">
          {filteredFoodCategories.map((category) => (
            <FoodSection
              key={category.id}
              category={category}
              updateQuantity={updateQuantity}
              cartItems={cartItems}
              onEnhanceDescription={onEnhanceDescription}
            />
          ))}
        </main>
      </div>
      <DescriptionModal
        content={modalContent}
        isOpen={showDescriptionModal}
        onClose={() => setShowDescriptionModal(false)}
        isLoading={isLoadingDescription}
      />
      <CartModal
        cartItems={cartItems}
        foodCategories={initialFoodCategories}
        isOpen={showCartModal}
        onClose={() => setShowCartModal(false)}
        updateQuantity={updateQuantity}
        openMessageBox={(message) => { setMessageBoxContent(message); setShowMessageBox(true); }}
      />
      <ProfilePage
        isOpen={showProfilePage}
        onClose={() => setShowProfilePage(false)}
      />
      <MessageBox
        content={messageBoxContent}
        isOpen={showMessageBox}
        onClose={() => setShowMessageBox(false)}
      />
    </div>
  );
};

export default App;
