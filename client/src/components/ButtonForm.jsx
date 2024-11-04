// components/Button.jsx
import React from 'react';

export function Button({ 
  children, 
  type = 'button', 
  variant = 'default', 
  className = '', 
  ...props 
}) {
  const baseStyles = "rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500";
  
  const variants = {
    default: "bg-blue-500 text-white hover:bg-blue-600",
    outline: " bg-gray text-gray-700 hover:bg-green-100",
  };

  const finalClassName = `${baseStyles} ${variants[variant]} ${className}`;

  return (
    <button
      type={type}
      className={finalClassName}
      {...props}
    >
      {children}
    </button>
  );
}
