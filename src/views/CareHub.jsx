import React from 'react';
import { BigButton } from '../components/BigButton';
import { FileText, Bell, CheckCircle } from 'lucide-react';

export const CareHub = ({ navigate }) => {
  // Mock Data: Esto vendría de tu Backend Firebase
  const logs = [
    { id: 1, type: 'alert', time: 'Hace 2 min', text: '⚠️ Posible molestia reportada en Hombro Derecho.' },
    { id: 2, type: 'success', time: '10:05 AM', text: '✅ Dosis de Risdiplam tomada.' },
    { id: 3, type: 'data', time: '09:30 AM', text: '📈 FVC (Respiración): 92dB (Estable).' },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="bg-slate-800 text-white p-6 rounded-b-3xl -mx-4 -mt-4 shadow-lg">
        <h1 className="text-2xl font-bold">Care Hub</h1>
        <p className="opacity-70">Sincronizado con: Blaž</p>
      </div>

      {/* Tarjetas de Estado */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white p-4 rounded-2xl shadow-sm border-l-4 border-green-500">
          <p className="text-xs text-slate-400">Estado General</p>
          <p className="font-bold text-lg text-slate-700">Estable</p>
        </div>
        <div className="bg-white p-4 rounded-2xl shadow-sm border-l-4 border-roche-blue">
          <p className="text-xs text-slate-400">Adherencia</p>
          <p className="font-bold text-lg text-slate-700">98%</p>
        </div>
      </div>

      {/* Feed de Actividad (Automático) */}
      <div>
        <h3 className="font-bold text-slate-700 mb-3 ml-1">Bitácora de Hoy</h3>
        <div className="space-y-3">
          {logs.map(log => (
            <div key={log.id} className="bg-white p-4 rounded-2xl shadow-sm flex gap-3 items-start">
              <div className={`mt-1 ${log.type === 'alert' ? 'text-red-500' : log.type === 'success' ? 'text-green-500' : 'text-blue-500'}`}>
                {log.type === 'alert' ? <Bell size={18} /> : log.type === 'success' ? <CheckCircle size={18} /> : <FileText size={18} />}
              </div>
              <div>
                <p className="text-sm text-slate-600 leading-snug">{log.text}</p>
                <p className="text-xs text-slate-300 mt-1 font-mono">{log.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Acciones de Negocio */}
      <div className="pt-4">
        <BigButton variant="ghost" className="bg-roche-light border-none text-roche-blue mb-4">
          <FileText size={20} />
          Exportar Reporte PDF (Roche)
        </BigButton>
        <p className="text-center text-xs text-slate-400">
          Datos listos para la consulta del Dr. Osredkar
        </p>
      </div>
      
      <button onClick={() => navigate('splash')} className="text-center w-full text-slate-400 text-sm py-4">
        Cerrar Sesión
      </button>
    </div>
  );
};
