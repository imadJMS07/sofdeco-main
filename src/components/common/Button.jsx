import React from 'react';

export const Button = ({ onClick, children, className = '', variant = 'default', ...props }) => {
  const base = 'px-4 py-2 rounded font-medium transition';
  const variants = {
    default: 'bg-blue-600 text-white hover:bg-blue-700',
    outline: 'border border-blue-600 text-blue-600 bg-white hover:bg-blue-50',
  };
  return (
    <button
      onClick={onClick}
      className={`${base} ${variants[variant] || ''} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button; 