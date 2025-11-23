import React, { useState, useEffect, useRef } from 'react';
import { Eye } from 'lucide-react';

export const EyeTrackingButton = ({ onTrigger, label, dwellTime = 2500 }) => {
  const [progress, setProgress] = useState(0);
  const intervalRef = useRef(null);
  const [isActivating, setIsActivating] = useState(false);

  const startDwell = () => {
    setIsActivating(true);
    const increment = 100 / (dwellTime / 20); // Calculate increment for smooth animation
    
    intervalRef.current = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(intervalRef.current);
          onTrigger();
          setTimeout(() => setProgress(0), 500);
          setIsActivating(false);
          return 100;
        }
        return prev + increment;
      });
    }, 20);
  };

  const cancelDwell = () => {
    clearInterval(intervalRef.current);
    setProgress(0);
    setIsActivating(false);
  };

  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  return (
    <div 
      className="relative w-full h-48 sm:h-64 md:h-72 bg-gradient-to-br from-alert to-red-700 rounded-3xl overflow-hidden cursor-pointer shadow-2xl group transform transition-all hover:scale-[1.02] active:scale-[0.98]"
      onMouseEnter={startDwell}
      onMouseLeave={cancelDwell}
      onTouchStart={startDwell}
      onTouchEnd={cancelDwell}
      onClick={onTrigger}
      role="button"
      tabIndex={0}
      aria-label={`${label} - Mantén la mirada o presiona 3 segundos para activar`}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onTrigger();
        }
      }}
    >
      {/* Barra de progreso de fondo (llenado desde abajo) */}
      <div 
        className="absolute bottom-0 left-0 right-0 bg-red-900 opacity-40 transition-all duration-75 ease-linear"
        style={{ height: `${progress}%` }}
      />
      
      {/* Anillo de progreso giratorio */}
      {isActivating && (
        <div 
          className="absolute inset-0 border-8 border-transparent border-t-white rounded-3xl animate-spin"
          style={{ 
            animationDuration: `${dwellTime}ms`,
            animationTimingFunction: 'linear'
          }}
        />
      )}
      
      <div className="absolute inset-0 flex flex-col items-center justify-center text-white z-10 p-4 sm:p-6 text-center">
        <Eye 
          size={window.innerWidth < 640 ? 48 : 64} 
          className={`mb-3 sm:mb-4 ${isActivating ? 'animate-pulse' : 'animate-pulse-slow'}`} 
        />
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-black uppercase tracking-wider mb-2 sm:mb-3">
          {label}
        </h2>
        <p className="text-xs sm:text-sm font-medium bg-white/20 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full backdrop-blur-sm">
          {isActivating ? `Activando... ${Math.round(progress)}%` : 'Mírame fijamente 3s para activar'}
        </p>
        
        {/* Indicador visual adicional en móvil */}
        <div className="mt-4 flex gap-1">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className={`w-2 h-2 rounded-full transition-all duration-200 ${
                progress > (i * 33) ? 'bg-white scale-110' : 'bg-white/30'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
