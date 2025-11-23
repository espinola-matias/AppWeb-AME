import React from 'react';
import { Check, Clock, Calendar } from 'lucide-react';

export const Timeline = ({ items = [], className = '' }) => {
  return (
    <div className={`space-y-4 sm:space-y-6 ${className}`}>
      {items.map((item, index) => (
        <TimelineItem 
          key={item.id || index}
          {...item}
          isLast={index === items.length - 1}
        />
      ))}
    </div>
  );
};

const TimelineItem = ({ 
  time, 
  title, 
  description, 
  status = 'upcoming', // 'completed', 'active', 'upcoming'
  action,
  icon: Icon,
  isLast 
}) => {
  const statusStyles = {
    completed: {
      dot: 'bg-success border-success',
      text: 'text-gray-700',
      line: 'bg-success',
    },
    active: {
      dot: 'bg-roche-blue border-roche-blue ring-4 ring-roche-blue/20 animate-pulse-slow',
      text: 'text-roche-blue font-semibold',
      line: 'bg-gray-300',
    },
    upcoming: {
      dot: 'bg-gray-300 border-gray-300',
      text: 'text-gray-500',
      line: 'bg-gray-300',
    },
  };

  const style = statusStyles[status];

  return (
    <div className="relative grid grid-cols-[60px_20px_1fr] sm:grid-cols-[80px_24px_1fr] gap-3 sm:gap-4">
      {/* Time */}
      <div className="text-right">
        <span className={`text-sm sm:text-base font-bold ${style.text}`}>
          {time}
        </span>
      </div>

      {/* Dot and Line */}
      <div className="flex flex-col items-center">
        <div className={`
          w-5 h-5 rounded-full border-4 transition-all z-10
          ${style.dot}
        `}>
          {status === 'completed' && (
            <div className="w-full h-full flex items-center justify-center">
              <Check size={12} className="text-white" strokeWidth={3} />
            </div>
          )}
        </div>
        {!isLast && (
          <div className={`w-0.5 flex-1 mt-2 ${style.line}`} />
        )}
      </div>

      {/* Content */}
      <div className="pb-4 sm:pb-6">
        <h3 className={`text-base sm:text-lg font-bold mb-1 ${style.text}`}>
          {title}
        </h3>
        {description && (
          <p className="text-sm sm:text-base text-gray-600 mb-2">
            {description}
          </p>
        )}
        {action && status === 'active' && (
          <button 
            onClick={action.onClick}
            className="mt-2 px-4 py-2 bg-roche-blue text-white rounded-xl font-semibold text-sm hover:bg-roche-blue-dark transition-colors min-h-touch flex items-center gap-2"
          >
            {action.icon && <action.icon size={18} />}
            {action.label}
          </button>
        )}
      </div>
    </div>
  );
};
