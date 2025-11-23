import React, { useState, useEffect } from 'react';
import { BigButton } from '../components/BigButton';
import { Card } from '../components/Card';
import { ArrowLeft, Trophy, Mic } from 'lucide-react';

export const BreathingGame = ({ navigate }) => {
  const [isBlowing, setIsBlowing] = useState(false);
  const [score, setScore] = useState(0);
  const [gameFinished, setGameFinished] = useState(false);

  // Simulación de soplido (Press & Hold)
  const handleStartBlow = () => setIsBlowing(true);
  const handleStopBlow = () => setIsBlowing(false);

  useEffect(() => {
    let interval;
    if (isBlowing && !gameFinished) {
      interval = setInterval(() => {
        setScore(prev => {
          if (prev >= 100) {
            setGameFinished(true);
            setIsBlowing(false);
            return 100;
          }
          return prev + 1.5;
        });
      }, 50);
    }
    return () => clearInterval(interval);
  }, [isBlowing, gameFinished]);

  if (gameFinished) {
    return (
      <div className="min-h-[80vh] flex flex-col items-center justify-center p-4 sm:p-6 text-center space-y-4 sm:space-y-6 animate-fade-in max-w-2xl mx-auto">
        <Trophy size={window.innerWidth < 640 ? 64 : 80} className="text-joy-yellow animate-bounce" />
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-800">¡Increíble!</h2>
        
        <Card className="w-full">
          <p className="text-slate-500 mb-2 text-sm sm:text-base">Fuerza Pulmonar Estimada</p>
          <p className="text-4xl sm:text-5xl md:text-6xl font-black text-roche-blue">
            92<span className="text-xl sm:text-2xl text-slate-400">dB</span>
          </p>
          <div className="mt-4 h-3 bg-slate-100 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-green-500 to-growth-green w-[92%] transition-all duration-1000"></div>
          </div>
          <p className="text-xs sm:text-sm text-slate-400 mt-4 bg-slate-50 p-3 rounded-xl">
            ✅ Datos encriptados y enviados al registro de Roche.
          </p>
        </Card>
        
        <div className="w-full space-y-3">
          <BigButton onClick={() => navigate('home')} variant="primary">
            Volver al Inicio
          </BigButton>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[85vh] flex flex-col p-4 sm:p-6 max-w-3xl mx-auto">
      {/* Header */}
      <div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
        <button 
          onClick={() => navigate('home')} 
          className="p-2 sm:p-3 bg-white hover:bg-slate-100 rounded-full shadow-md transition-colors min-h-touch min-w-touch flex items-center justify-center"
          aria-label="Volver al inicio"
        >
          <ArrowLeft size={window.innerWidth < 640 ? 20 : 24} />
        </button>
        <div>
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900">Terapia Dragón</h2>
          <p className="text-sm sm:text-base text-slate-500">Sopla para hacer volar al dragón</p>
        </div>
      </div>

      {/* AREA DE JUEGO */}
      <div className="flex-1 bg-gradient-to-b from-sky-300 via-sky-200 to-sky-100 rounded-3xl relative overflow-hidden border-4 border-white shadow-2xl mb-4 sm:mb-6 min-h-[300px] sm:min-h-[400px]">
        {/* Dragón */}
        <div 
          className="absolute left-1/2 transform -translate-x-1/2 transition-all duration-200 text-5xl sm:text-6xl md:text-7xl"
          style={{ bottom: `${score}%`, marginBottom: '20px' }}
        >
          🐲
        </div>
        
        {/* Nubes (Decoración) */}
        <div className="absolute top-10 left-5 sm:left-10 text-3xl sm:text-4xl opacity-50 animate-pulse-slow">☁️</div>
        <div className="absolute top-20 right-5 sm:right-10 text-3xl sm:text-4xl opacity-50 animate-pulse-slow" style={{animationDelay: '1s'}}>☁️</div>
        <div className="absolute top-40 left-1/4 text-2xl sm:text-3xl opacity-50 animate-pulse-slow" style={{animationDelay: '2s'}}>☁️</div>
        
        {/* Suelo */}
        <div className="absolute bottom-0 w-full h-8 sm:h-12 bg-green-500"></div>
        
        {/* Meta (parte superior) */}
        <div className="absolute top-0 left-0 right-0 h-12 sm:h-16 bg-gradient-to-b from-yellow-400 to-transparent flex items-start justify-center pt-2">
          <span className="text-2xl sm:text-3xl">🏆</span>
        </div>
      </div>

      {/* Controles y Métricas */}
      <div className="space-y-3 sm:space-y-4">
        <div className="flex justify-between text-sm sm:text-base font-bold text-slate-600 px-2">
          <span>Potencia</span>
          <span className="text-roche-blue">{Math.round(score)}%</span>
        </div>
        
        {/* Barra visual */}
        <div className="h-4 sm:h-6 bg-slate-200 rounded-full overflow-hidden shadow-inner">
          <div 
            className="h-full bg-gradient-to-r from-green-400 via-yellow-400 to-red-500 transition-all duration-75 shadow-lg"
            style={{ width: `${score}%` }}
          />
        </div>

        <button
          className={`
            w-full py-6 sm:py-8 rounded-2xl text-xl sm:text-2xl font-black text-white shadow-2xl 
            transition-all duration-200 flex items-center justify-center gap-3
            ${isBlowing 
              ? 'scale-95 bg-gradient-to-br from-orange-600 to-red-600' 
              : 'bg-gradient-to-br from-joy-orange to-orange-600 hover:from-orange-600 hover:to-joy-orange active:scale-95'
            }
          `}
          onMouseDown={handleStartBlow}
          onMouseUp={handleStopBlow}
          onTouchStart={handleStartBlow}
          onTouchEnd={handleStopBlow}
          aria-label="Presiona y mantén para soplar"
        >
          <Mic size={window.innerWidth < 640 ? 24 : 32} className={isBlowing ? 'animate-pulse' : ''} />
          {isBlowing ? '💨 SOPLANDO...' : 'MANTÉN PARA SOPLAR'}
        </button>
        
        <p className="text-center text-xs sm:text-sm text-slate-500 px-4">
          💡 Presiona y mantén el botón, o sopla al micrófono si das permiso
        </p>
      </div>
    </div>
  );
};
