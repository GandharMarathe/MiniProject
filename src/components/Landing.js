import React, { useEffect } from 'react';

function Landing({ setCurrentPage }) {
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

    // Observe all animation elements
    document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right, .slide-in-up, .fade-in-up, .fade-in-left, .fade-in-right').forEach(el => {
      observer.observe(el);
    });

    // Smooth scrolling for navigation links
    const handleSmoothScroll = (e) => {
      e.preventDefault();
      const target = document.querySelector(e.currentTarget.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    };

    const anchors = document.querySelectorAll('a[href^="#"]');
    anchors.forEach(anchor => {
      anchor.addEventListener('click', handleSmoothScroll);
    });

    return () => {
      observer.disconnect();
      anchors.forEach(anchor => {
        anchor.removeEventListener('click', handleSmoothScroll);
      });
    };
  }, []);

  return (
    <div className="landing-page">
      {/* Navigation */}
      <nav className="navbar-landing">
        <div className="nav-content">
          <div className="logo">
            <img src="/logo.png" alt="APSIT Logo" className="college-logo" />
            <span className="logo-text">APSIT Canteen</span>
          </div>
          <div className="nav-links">
            <a href="#home" className="nav-link">Home</a>
            <a href="#about" className="nav-link">About</a>
            <a href="#services" className="nav-link">Services</a>
            <button className="nav-link cta-nav" onClick={() => setCurrentPage('menu')}>Order Now</button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="hero-section">
        <div className="hero-content">
          <div className="hero-text fade-in">
            <h1 className="hero-title">APSIT Canteen Goes Digital!</h1>
            <p className="hero-subtitle">Skip the Queue, Order Online & Enjoy Fresh Meals on Campus</p>
            <div className="hero-features">
              <div className="feature-item">
                <span className="feature-icon">📱</span>
                <span>Order from Anywhere</span>
              </div>
              <div className="feature-item">
                <span className="feature-icon">⚡</span>
                <span>Quick Pickup</span>
              </div>
              <div className="feature-item">
                <span className="feature-icon">💰</span>
                <span>Student Prices</span>
              </div>
            </div>
            <div className="hero-stats">
              <div className="stat">
                <span className="stat-number">1000+</span>
                <span className="stat-label">APSIT Students</span>
              </div>
              <div className="stat">
                <span className="stat-number">12</span>
                <span className="stat-label">Fresh Items</span>
              </div>
              <div className="stat">
                <span className="stat-number">10min</span>
                <span className="stat-label">Avg Pickup</span>
              </div>
            </div>
            <button className="cta-button" onClick={() => setCurrentPage('menu')}>
              Order Now - Skip the Line!
            </button>
          </div>
          <div className="hero-image slide-in-right">
            <img src="https://images.unsplash.com/photo-1567521464027-f127ff144326?w=600&h=400&fit=crop" alt="College Students Eating" />
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="about-section">
        <div className="container">
          <div className="section-header fade-in-up">
            <h2>Bringing APSIT Canteen Online</h2>
            <p>Making campus dining convenient for our students</p>
          </div>
          <div className="about-grid">
            <div className="about-card slide-in-left">
              <div className="card-icon">🎓</div>
              <h3>Made for Students</h3>
              <p>Designed specifically for APSIT students with campus timings, preferences, and budget in mind</p>
            </div>
            <div className="about-card slide-in-up">
              <div className="card-icon">📱</div>
              <h3>Digital Convenience</h3>
              <p>Order between classes, during breaks, or anytime from anywhere on campus</p>
            </div>
            <div className="about-card slide-in-right">
              <div className="card-icon">🚀</div>
              <h3>Skip the Rush</h3>
              <p>Avoid lunch hour crowds and long queues with pre-ordering and quick pickup</p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="services" className="services-section">
        <div className="container">
          <div className="section-header fade-in-up">
            <h2>How It Works</h2>
            <p>Simple steps to get your favorite canteen food</p>
          </div>
          <div className="services-grid">
            <div className="service-item fade-in-left">
              <img src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=300&h=200&fit=crop" alt="Browse Menu" />
              <div className="service-content">
                <h3>1. Browse & Select</h3>
                <p>Browse our digital menu with all your favorite canteen items. Select what you want and customize quantities.</p>
              </div>
            </div>
            <div className="service-item fade-in-up">
              <img src="https://images.unsplash.com/photo-1556742502-ec7c0e9f34b1?w=300&h=200&fit=crop" alt="Place Order" />
              <div className="service-content">
                <h3>2. Place Order</h3>
                <p>Add items to cart, choose payment method (UPI/Cash), and confirm your order in seconds.</p>
              </div>
            </div>
            <div className="service-item fade-in-right">
              <img src="https://images.unsplash.com/photo-1567521464027-f127ff144326?w=300&h=200&fit=crop" alt="Pickup Food" />
              <div className="service-content">
                <h3>3. Quick Pickup</h3>
                <p>Get notified when ready. Walk to canteen, show your order, and collect your fresh meal!</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-content fade-in-up">
            <h2>Ready to Go Digital?</h2>
            <p>Join your fellow APSIT Students and Faculty and experience the future of campus dining</p>
            <div className="cta-benefits">
              <div className="benefit">✅ No More Long Queues</div>
              <div className="benefit">✅ Order Between Classes</div>
              <div className="benefit">✅ Same Great Food</div>
            </div>
            <button className="cta-button" onClick={() => setCurrentPage('menu')}>
              Start Ordering - It's Free!
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-section">
              <h3>🍽️ APSIT Digital Canteen</h3>
              <p>Bringing your favorite campus canteen online for a better student experience.</p>
            </div>
            <div className="footer-section">
              <h4>For Students</h4>
              <ul>
                <li><a href="#home">How It Works</a></li>
                <li><a href="#about">Why Go Digital</a></li>
                <li><button onClick={() => setCurrentPage('menu')}>Start Ordering</button></li>
                <li><a href="#support">Need Help?</a></li>
              </ul>
            </div>
            <div className="footer-section">
              <h4>Campus Info</h4>
              <p>📍 APSIT Campus Canteen, Thane</p>
              <p>🕒 Mon-Fri: 8:00 AM - 5:00 PM</p>
              <p>📧 digitalcanteen@gmail.com</p>
              <p>🎓 Made by APSIT Students</p>
            </div>
          </div>
          <div className="footer-bottom">
            <p>&copy; 2025 Apsit Canteen. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Landing;