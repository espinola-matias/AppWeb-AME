import React from 'react';

export const BigButton = ({ 
  onClick, 
  children, 
  variant = 'primary', 
  icon: Icon, 
  className = '',
  disabled = false,
  fullWidth = true
}) => {
  const baseStyles = "p-4 sm:p-6 rounded-2xl shadow-sm active:scale-95 transition-all duration-200 flex items-center justify-center gap-3 sm:gap-4 text-lg sm:text-xl font-bold border-2 min-h-touch disabled:opacity-50 disabled:cursor-not-allowed";
  
  const variants = {
    primary: "bg-white border-roche-blue text-roche-blue hover:bg-roche-light active:bg-roche-light",
    accent: "bg-gradient-to-br from-joy-orange to-orange-600 border-joy-orange text-white hover:from-orange-600 hover:to-joy-orange shadow-lg",
    danger: "bg-gradient-to-br from-alert to-red-600 border-alert text-white hover:from-red-600 hover:to-alert shadow-lg",
    ghost: "bg-transparent border-transparent text-slate-500 hover:bg-slate-100",
    success: "bg-gradient-to-br from-growth-green to-green-600 border-growth-green text-white hover:from-green-600 hover:to-growth-green shadow-lg"
  };

  const widthClass = fullWidth ? 'w-full' : '';

  return (
    <button 
      onClick={onClick} 
      disabled={disabled}
      className={`${baseStyles} ${variants[variant]} ${widthClass} ${className}`}
      aria-label={typeof children === 'string' ? children : undefined}
    >
      {Icon && <Icon size={28} className="sm:w-8 sm:h-8" strokeWidth={2} />}
      <span className="leading-tight">{children}</span>
    </button>
  );
};
