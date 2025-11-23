import React, { useState } from 'react';
import { EyeTrackingButton } from '../components/EyeTrackingButton';
import { BigButton } from '../components/BigButton';
import { Card, CardTitle, CardContent } from '../components/Card';
import { MoodSelector } from '../components/MoodSelector';
import { Timeline } from '../components/Timeline';
import { Wind, Activity, Calendar, Users, Play, MessageCircle } from 'lucide-react';

export const PatientHome = ({ navigate, userName = "Blaž" }) => {
  const [selectedMood, setSelectedMood] = useState('happy');
  
  const timelineItems = [
    {
      id: 1,
      time: '10:00',
      title: 'Medicación matutina ✓',
      description: 'Spinraza - Completado',
      status: 'completed'
    },
    {
      id: 2,
      time: '11:00',
      title: 'Juego de Respiración 🐉',
      description: '¡Ayuda al dragón a volar!',
      status: 'active',
      action: {
        label: 'Jugar ahora',
        onClick: () => navigate('breathing'),
        icon: Play
      }
    },
    {
      id: 3,
      time: '14:00',
      title: 'Cambio postural',
      description: 'Recordatorio en 2h 45min',
      status: 'upcoming'
    },
    {
      id: 4,
      time: '18:00',
      title: 'Ejercicios de fisioterapia',
      description: 'Sesión de 20 minutos',
      status: 'upcoming'
    }
  ];

  return (
    <div className="space-y-4 sm:space-y-6 animate-fade-in max-w-4xl mx-auto">
      {/* Header Emocional */}
      <div className="flex justify-between items-end px-2">
        <div>
          <p className="text-slate-400 text-base sm:text-lg">Buenos días,</p>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-roche-blue to-vitality-purple bg-clip-text text-transparent">
            {userName}
          </h1>
        </div>
        <div className="text-4xl sm:text-5xl bg-white p-2 sm:p-3 rounded-full shadow-lg">
          🤠
        </div>
      </div>

      {/* FEATURE ESTRELLA: Botón BCI */}
      <EyeTrackingButton 
        label="SOS EMERGENCIA" 
        onTrigger={() => navigate('emergency')} 
      />

      {/* Mood Widget */}
      <Card variant="yellow" className="mb-4 sm:mb-6">
        <CardTitle className="mb-4 text-center sm:text-left">
          ¿Cómo te sientes hoy?
        </CardTitle>
        <CardContent>
          <MoodSelector 
            selectedMood={selectedMood}
            onMoodChange={setSelectedMood}
          />
        </CardContent>
      </Card>

      {/* Widgets de Acción Rápida */}
      <div className="grid grid-cols-2 gap-3 sm:gap-4">
        <BigButton 
          variant="primary" 
          icon={Wind} 
          onClick={() => navigate('breathing')} 
          className="h-32 sm:h-40 flex-col !gap-2 text-base sm:text-lg"
        >
          Respiración
          <span className="text-xs font-normal text-slate-400 block">Juego Dragón</span>
        </BigButton>
        
        <BigButton 
          variant="primary" 
          icon={Activity} 
          onClick={() => navigate('painmap')} 
          className="h-32 sm:h-40 flex-col !gap-2 text-base sm:text-lg"
        >
          Mapa Dolor
          <span className="text-xs font-normal text-slate-400 block">Registrar hoy</span>
        </BigButton>

        <BigButton 
          variant="success" 
          icon={MessageCircle} 
          onClick={() => navigate('socialfeed')} 
          className="h-32 sm:h-40 flex-col !gap-2 text-base sm:text-lg"
        >
          Feed Social
          <span className="text-xs font-normal text-slate-400 block">12 nuevos posts</span>
        </BigButton>

        <BigButton 
          variant="info" 
          icon={Users} 
          onClick={() => navigate('community')} 
          className="h-32 sm:h-40 flex-col !gap-2 text-base sm:text-lg"
        >
          Comunidad
          <span className="text-xs font-normal text-slate-400 block">3 eventos cerca</span>
        </BigButton>
      </div>

      {/* Timeline del Día */}
      <Card variant="blue">
        <CardTitle className="flex items-center gap-2 mb-4">
          <Calendar className="w-5 h-5 sm:w-6 sm:h-6" />
          Mi Vida Hoy
        </CardTitle>
        <CardContent>
          <Timeline items={timelineItems} />
        </CardContent>
      </Card>

      {/* Quick Stats - Responsive Grid */}
      <div className="grid grid-cols-3 gap-3 sm:gap-4">
        <Card variant="default" className="p-4 sm:p-6 flex flex-col items-center gap-2">
          <div className="text-3xl sm:text-4xl">💊</div>
          <div className="text-2xl sm:text-3xl font-black text-roche-blue">95%</div>
          <div className="text-xs sm:text-sm text-slate-500 font-semibold text-center">Adherencia</div>
        </Card>

        <Card variant="default" className="p-4 sm:p-6 flex flex-col items-center gap-2">
          <div className="text-3xl sm:text-4xl">🎯</div>
          <div className="text-2xl sm:text-3xl font-black text-joy-orange">12</div>
          <div className="text-xs sm:text-sm text-slate-500 font-semibold text-center">Racha días</div>
        </Card>

        <Card variant="default" className="p-4 sm:p-6 flex flex-col items-center gap-2">
          <div className="text-3xl sm:text-4xl">🫁</div>
          <div className="text-2xl sm:text-3xl font-black text-growth-green">85dB</div>
          <div className="text-xs sm:text-sm text-slate-500 font-semibold text-center">Fuerza resp.</div>
        </Card>
      </div>
    </div>
  );
};
