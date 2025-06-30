import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';

// Toast container for managing toasts
const ToastContainer = {
  toasts: [],
  listeners: new Set(),
  
  addToast(toast) {
    // Clear all existing toasts first
    this.toasts.forEach(t => {
      if (t.timerId) clearTimeout(t.timerId);
    });
    this.toasts = [];
    
    // Add new toast
    const id = Date.now().toString();
    const timerId = setTimeout(() => {
      this.removeToast(id);
    }, 4000);
    
    const newToast = { id, ...toast, timerId };
    this.toasts = [newToast]; // Only keep one toast at a time
    this.notifyListeners();
    
    return id;
  },
  
  removeToast(id) {
    this.toasts = this.toasts.filter(toast => toast.id !== id);
    this.notifyListeners();
  },
  
  subscribe(listener) {
    this.listeners.add(listener);
    return () => {
      this.listeners.delete(listener);
    };
  },
  
  notifyListeners() {
    this.listeners.forEach(listener => listener(this.toasts));
  }
};

// Keep track of active toasts to prevent duplicates
let activeToasts = new Set();

// Custom toast components
export const successToast = (message) => {
  if (activeToasts.has(message)) return;
  
  activeToasts.add(message);
  ToastContainer.addToast({
    type: 'success',
    message,
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="12" cy="12" r="12" fill="#C5A05C" fillOpacity="0.1" />
        <path d="M8 12L11 15L16 9" stroke="#C5A05C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    )
  });
  
  setTimeout(() => {
    activeToasts.delete(message);
  }, 4000);
};

export const errorToast = (message) => {
  if (activeToasts.has(message)) return;
  
  activeToasts.add(message);
  ToastContainer.addToast({
    type: 'error',
    message,
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="12" cy="12" r="12" fill="#E53935" fillOpacity="0.1" />
        <path d="M15 9L9 15M9 9L15 15" stroke="#E53935" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    )
  });
  
  setTimeout(() => {
    activeToasts.delete(message);
  }, 4000);
};

// Initialize toast overrides
export const initializeToasts = () => {
  const originalSuccess = toast.success;
  const originalError = toast.error;

  toast.success = (message) => {
    successToast(message);
    return { id: 'custom-toast' };
  };

  toast.error = (message) => {
    errorToast(message);
    return { id: 'custom-toast' };
  };
};

// Custom toast renderer component
const CustomToaster = () => {
  const [toasts, setToasts] = useState([]);
  
  useEffect(() => {
    return ToastContainer.subscribe(setToasts);
  }, []);
  
  return (
    <div className="custom-toaster">
      {toasts.map((toast) => (
        <div 
          key={toast.id} 
          className={`custom-toast ${toast.type}-toast`}
        >
          <div className="toast-icon">{toast.icon}</div>
          <div className="toast-message">{toast.message}</div>
        </div>
      ))}
    </div>
  );
};

// CSS styles for the toast component
export const ToastStyles = () => (
  <style jsx global>{`
    .custom-toaster {
      position: fixed;
      bottom: 20px;
      left: 20px;
      z-index: 9999;
      display: flex;
      flex-direction: column;
      gap: 8px;
    }
    
    .custom-toast {
      display: flex;
      align-items: flex-start;
      background: white;
      padding: 16px 20px;
      border-radius: 16px;
      box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
      min-width: 280px;
      max-width: 350px;
      transition: all 0.3s ease;
      position: relative;
    }
    
    .custom-toast:hover {
      transform: translateY(-5px);
      box-shadow: 0 15px 30px rgba(0, 0, 0, 0.15);
    }
    
    .success-toast {
      border-left: 4px solid #C5A05C;
      background: linear-gradient(135deg, #FFFFFF, rgba(197, 160, 92, 0.08));
    }
    
    .error-toast {
      border-left: 4px solid #E53935;
      background: linear-gradient(135deg, #FFFFFF, rgba(229, 57, 53, 0.08));
    }
    
    .toast-icon {
      margin-right: 12px;
      flex-shrink: 0;
    }
    
    .toast-message {
      color: #4E3B26;
      font-size: 14px;
      font-weight: 500;
      line-height: 1.5;
      flex: 1;
      word-break: normal;
      white-space: normal;
    }
  `}</style>
);

export default CustomToaster;
