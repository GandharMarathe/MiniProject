import React, { useState } from 'react';

function Auth({ onLogin }) {
  const [isLogin, setIsLogin] = useState(true);
  const [isFaculty, setIsFaculty] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      const userData = {
        email: formData.email,
        name: isLogin 
          ? formData.email.split('@')[0].replace(/[._-]/g, ' ').replace(/\s+/g, ' ').replace(/\b\w/g, l => l.toUpperCase()).trim()
          : formData.name,
        isFaculty: isFaculty
      };
      
      localStorage.setItem('currentUser', JSON.stringify(userData));
      onLogin(userData);
      setLoading(false);
    }, 1500);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="auth-container">
      <div className="auth-background">
        <div className="auth-shapes">
          <div className="shape shape-1"></div>
          <div className="shape shape-2"></div>
          <div className="shape shape-3"></div>
        </div>
      </div>
      
      <div className="auth-content">
        <div className="auth-card">
          <div className="auth-tabs">
            <button 
              className={`auth-tab ${!isFaculty ? 'active' : ''}`}
              onClick={() => setIsFaculty(false)}
            >
              Student Login
            </button>
            <button 
              className={`auth-tab ${isFaculty ? 'active' : ''}`}
              onClick={() => setIsFaculty(true)}
            >
              Faculty Login
            </button>
          </div>
          <div className="auth-header">
            <div className="auth-logo">
              <img src="/logo.png" alt="APSIT Logo" className="auth-college-logo" />
              <h1>APSIT Canteen</h1>
            </div>
            <div className="auth-subtitle">
              <h2>{isLogin ? 'Welcome Back!' : 'Join Us Today'}</h2>
              <p>{isFaculty 
                ? (isLogin ? 'Faculty login to access canteen services' : 'Register as faculty member')
                : (isLogin ? 'Sign in to your account and start ordering' : 'Create your account to access our digital canteen')
              }</p>
            </div>
          </div>
          
          <form onSubmit={handleSubmit} className="auth-form">
            {!isLogin && (
              <div className="form-group">
                <label>Full Name</label>
                <div className="input-wrapper">
                  <span className="input-icon">👤</span>
                  <input
                    type="text"
                    name="name"
                    placeholder="Enter your full name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
            )}
            
            <div className="form-group">
              <label>Email Address</label>
              <div className="input-wrapper">
                <span className="input-icon">📧</span>
                <input
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            
            <div className="form-group">
              <label>Password</label>
              <div className="input-wrapper">
                <span className="input-icon">🔒</span>
                <input
                  type="password"
                  name="password"
                  placeholder={isLogin ? "Enter your password" : "Create a password"}
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            
            <button type="submit" className="auth-btn" disabled={loading}>
              {loading ? (
                <>
                  <span className="loading-spinner">⏳</span>
                  {isLogin ? 'Signing In...' : 'Creating Account...'}
                </>
              ) : (
                <>
                  <span className="btn-icon">{isLogin ? '🚀' : '✨'}</span>
                  {isLogin ? 'Sign In' : 'Create Account'}
                </>
              )}
            </button>
          </form>
          
          <div className="auth-footer">
            <p>
              {isLogin ? "Don't have an account? " : "Already have an account? "}
              <button 
                type="button" 
                className="auth-switch" 
                onClick={() => setIsLogin(!isLogin)}
              >
                {isLogin ? 'Sign up here' : 'Sign in here'}
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Auth;