import React, { useState } from 'react';

const moods = [
  { id: 'happy', emoji: '😊', label: 'Feliz', color: 'from-green-400 to-green-500' },
  { id: 'okay', emoji: '😐', label: 'Normal', color: 'from-yellow-400 to-yellow-500' },
  { id: 'tired', emoji: '😴', label: 'Cansado', color: 'from-blue-400 to-blue-500' },
  { id: 'pain', emoji: '😰', label: 'Dolor', color: 'from-orange-400 to-orange-500' },
  { id: 'sad', emoji: '😢', label: 'Triste', color: 'from-purple-400 to-purple-500' },
];

export const MoodSelector = ({ selectedMood, onMoodChange, className = '' }) => {
  return (
    <div className={`grid grid-cols-3 sm:grid-cols-5 gap-2 sm:gap-3 ${className}`}>
      {moods.map(mood => (
        <button
          key={mood.id}
          onClick={() => onMoodChange(mood.id)}
          className={`
            flex flex-col items-center justify-center gap-1 sm:gap-2
            p-3 sm:p-4 rounded-2xl border-3 transition-all duration-200
            min-h-touch
            ${selectedMood === mood.id 
              ? `bg-gradient-to-br ${mood.color} text-white border-white shadow-lg scale-105` 
              : 'bg-white border-gray-200 text-gray-700 hover:border-roche-blue hover:scale-105'
            }
          `}
          aria-label={`Me siento ${mood.label}`}
        >
          <span className="text-3xl sm:text-4xl">{mood.emoji}</span>
          <span className="text-xs sm:text-sm font-semibold">{mood.label}</span>
        </button>
      ))}
    </div>
  );
};
