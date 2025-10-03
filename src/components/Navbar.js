import React from 'react';

function Navbar({ currentPage, setCurrentPage, cartCount, onLogout, isAdmin }) {
  return (
    <nav className="navbar">
      <div className="nav-content">
        <div className="nav-left">
          {isAdmin ? (
            <button 
              className={`nav-link ${currentPage === 'admin' ? 'active' : ''}`} 
              onClick={() => setCurrentPage('admin')}
              type="button"
            >
              Admin Dashboard
            </button>
          ) : (
            <>
              <button 
                className={`nav-link ${currentPage === 'landing' ? 'active' : ''}`} 
                onClick={() => setCurrentPage('landing')}
                type="button"
              >
                Home
              </button>
              <button 
                className={`nav-link ${currentPage === 'menu' ? 'active' : ''}`} 
                onClick={() => setCurrentPage('menu')}
                type="button"
              >
                Menu
              </button>
              <button 
                className={`nav-link ${currentPage === 'profile' ? 'active' : ''}`} 
                onClick={() => setCurrentPage('profile')}
                type="button"
              >
                Profile
              </button>
            </>
          )}
        </div>
        <div className="logo">
          <img src="/logo.png" alt="APSIT Logo" className="college-logo" />
          <span className="logo-text">APSIT Canteen</span>
        </div>
        <div className="nav-right">
          {!isAdmin && (
            <button 
              className={`nav-link ${currentPage === 'cart' ? 'active' : ''}`} 
              onClick={() => setCurrentPage('cart')}
              type="button"
            >
              Cart <span className="cart-badge">{cartCount}</span>
            </button>
          )}
          <button 
            className="nav-link" 
            onClick={onLogout}
            type="button"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;