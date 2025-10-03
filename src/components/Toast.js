import React from 'react';

function Toast({ toast }) {
  return (
    <div className={`toast ${toast.show ? 'show' : ''}`}>
      <span className="toast-icon">✓</span>
      {toast.message}
    </div>
  );
}

export default Toast;