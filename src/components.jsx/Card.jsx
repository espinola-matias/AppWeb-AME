import React from 'react';

export const Card = ({ 
  children, 
  className = '', 
  variant = 'default',
  hover = true 
}) => {
  const baseStyles = "bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 shadow-md transition-all duration-200";
  
  const variants = {
    default: "border-l-4 border-transparent",
    blue: "bg-gradient-to-br from-blue-50 to-blue-100 border-l-4 border-roche-blue",
    orange: "bg-gradient-to-br from-orange-50 to-orange-100 border-l-4 border-joy-orange",
    green: "bg-gradient-to-br from-green-50 to-green-100 border-l-4 border-growth-green",
    purple: "bg-gradient-to-br from-purple-50 to-purple-100 border-l-4 border-vitality-purple",
    yellow: "bg-gradient-to-br from-yellow-50 to-yellow-100 border-l-4 border-joy-yellow",
  };
  
  const hoverClass = hover ? "hover:shadow-lg hover:-translate-y-1" : "";
  
  return (
    <div className={`${baseStyles} ${variants[variant]} ${hoverClass} ${className}`}>
      {children}
    </div>
  );
};

export const CardHeader = ({ children, className = '' }) => (
  <div className={`mb-3 sm:mb-4 ${className}`}>
    {children}
  </div>
);

export const CardTitle = ({ children, className = '' }) => (
  <h2 className={`text-xl sm:text-2xl font-bold text-gray-900 ${className}`}>
    {children}
  </h2>
);

export const CardContent = ({ children, className = '' }) => (
  <div className={className}>
    {children}
  </div>
);
