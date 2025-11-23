import { useState } from 'react';
import { ArrowLeft, X, AlertCircle } from 'lucide-react';
import { BigButton } from '../components/BigButton';
import { Card, CardContent } from '../components/Card';

// Mock data de reportes anteriores
const mockReports = [
  { id: 1, zone: 'shoulder-left', type: 'Dolor', intensity: 7, date: '2024-11-20' },
  { id: 2, zone: 'back', type: 'Rigidez', intensity: 5, date: '2024-11-21' },
];

export function PainMapView({ navigate }) {
  const [selectedZone, setSelectedZone] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [symptomType, setSymptomType] = useState('');
  const [intensity, setIntensity] = useState(5);
  const [reports, setReports] = useState(mockReports);

  const bodyZones = [
    { id: 'head', name: 'Cabeza', x: 150, y: 50, r: 30 },
    { id: 'neck', name: 'Cuello', x: 150, y: 100, r: 20 },
    { id: 'shoulder-left', name: 'Hombro Izq.', x: 110, y: 130, r: 25 },
    { id: 'shoulder-right', name: 'Hombro Der.', x: 190, y: 130, r: 25 },
    { id: 'chest', name: 'Pecho', x: 150, y: 160, r: 40 },
    { id: 'back', name: 'Espalda', x: 150, y: 200, r: 45 },
    { id: 'arm-left', name: 'Brazo Izq.', x: 90, y: 180, r: 20 },
    { id: 'arm-right', name: 'Brazo Der.', x: 210, y: 180, r: 20 },
    { id: 'abdomen', name: 'Abdomen', x: 150, y: 240, r: 35 },
    { id: 'hip', name: 'Cadera', x: 150, y: 280, r: 40 },
    { id: 'leg-left', name: 'Pierna Izq.', x: 120, y: 350, r: 25 },
    { id: 'leg-right', name: 'Pierna Der.', x: 180, y: 350, r: 25 },
  ];

  const handleZoneClick = (zone) => {
    setSelectedZone(zone);
    setModalOpen(true);
    setSymptomType('');
    setIntensity(5);
  };

  const handleSubmit = () => {
    if (!symptomType) {
      alert('Por favor selecciona el tipo de síntoma');
      return;
    }

    const newReport = {
      id: Date.now(),
      zone: selectedZone.id,
      type: symptomType,
      intensity,
      date: new Date().toISOString().split('T')[0]
    };

    setReports([...reports, newReport]);
    setModalOpen(false);
    
    // Mostrar confirmación
    setTimeout(() => {
      alert(`✅ Reporte enviado a tu Cuidador y añadido al historial médico`);
    }, 300);
  };

  const hasReport = (zoneId) => {
    return reports.some(r => r.zone === zoneId);
  };

  return (
    <div className="max-w-4xl mx-auto pb-6">
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <button 
          onClick={() => navigate('home')} 
          className="p-3 bg-slate-100 hover:bg-slate-200 rounded-full transition-colors"
        >
          <ArrowLeft size={24} />
        </button>
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold">🗺️ Mapa de Dolor</h2>
          <p className="text-gray-600">Toca la zona con molestias</p>
        </div>
      </div>

      {/* Advertencia */}
      <Card variant="yellow" className="mb-6">
        <CardContent>
          <div className="flex gap-3 items-start">
            <AlertCircle className="w-6 h-6 text-joy-yellow flex-shrink-0 mt-1" />
            <div>
              <p className="font-semibold mb-1">Registro para seguimiento médico</p>
              <p className="text-sm text-gray-600">
                Esta información se comparte automáticamente con tu cuidador y se guarda en tu historial.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Silueta Corporal SVG */}
      <div className="bg-white rounded-3xl shadow-xl p-8 mb-6">
        <svg 
          viewBox="0 0 300 500" 
          className="w-full max-w-md mx-auto"
          style={{ maxHeight: '600px' }}
        >
          {/* Silueta base (simplificada) */}
          <g fill="none" stroke="#E5E7EB" strokeWidth="2">
            {/* Cabeza */}
            <circle cx="150" cy="50" r="30" fill="#F3F4F6" />
            {/* Cuello */}
            <line x1="150" y1="80" x2="150" y2="110" />
            {/* Torso */}
            <ellipse cx="150" cy="180" rx="50" ry="80" fill="#F9FAFB" />
            {/* Brazos */}
            <line x1="100" y1="130" x2="80" y2="220" strokeWidth="12" stroke="#E5E7EB" />
            <line x1="200" y1="130" x2="220" y2="220" strokeWidth="12" stroke="#E5E7EB" />
            {/* Piernas */}
            <line x1="130" y1="260" x2="120" y2="400" strokeWidth="16" stroke="#E5E7EB" />
            <line x1="170" y1="260" x2="180" y2="400" strokeWidth="16" stroke="#E5E7EB" />
          </g>

          {/* Zonas clickeables */}
          {bodyZones.map((zone) => (
            <g key={zone.id}>
              <circle
                cx={zone.x}
                cy={zone.y}
                r={zone.r}
                fill={hasReport(zone.id) ? '#EF4444' : '#0044CC'}
                opacity={hasReport(zone.id) ? 0.3 : 0.1}
                className="cursor-pointer hover:opacity-30 transition-opacity"
                onClick={() => handleZoneClick(zone)}
              />
              {hasReport(zone.id) && (
                <circle
                  cx={zone.x}
                  cy={zone.y}
                  r={8}
                  fill="#EF4444"
                  className="pointer-events-none animate-pulse"
                />
              )}
            </g>
          ))}
        </svg>

        <div className="text-center mt-4 text-sm text-gray-500">
          {reports.length > 0 && (
            <p>🔴 {reports.length} reporte{reports.length !== 1 ? 's' : ''} activo{reports.length !== 1 ? 's' : ''}</p>
          )}
        </div>
      </div>

      {/* Historial de Reportes */}
      {reports.length > 0 && (
        <div className="bg-white rounded-3xl shadow-md p-6">
          <h3 className="font-bold text-lg mb-4">📋 Historial Reciente</h3>
          <div className="space-y-3">
            {reports.slice(-3).reverse().map((report) => {
              const zone = bodyZones.find(z => z.id === report.zone);
              return (
                <div key={report.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                  <div>
                    <p className="font-semibold">{zone?.name}</p>
                    <p className="text-sm text-gray-600">{report.type} • Intensidad {report.intensity}/10</p>
                  </div>
                  <span className="text-xs text-gray-400">{report.date}</span>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* BottomSheet Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/50 animate-fade-in">
          <div className="bg-white rounded-t-3xl w-full max-w-2xl p-6 pb-8 animate-slide-in shadow-2xl">
            {/* Header Modal */}
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold">
                {selectedZone?.name}
              </h3>
              <button 
                onClick={() => setModalOpen(false)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            {/* Tipo de Síntoma */}
            <div className="mb-6">
              <label className="block font-semibold mb-3">¿Qué sientes?</label>
              <div className="grid grid-cols-3 gap-3">
                {['Dolor', 'Debilidad', 'Rigidez'].map((type) => (
                  <button
                    key={type}
                    onClick={() => setSymptomType(type)}
                    className={`
                      py-4 px-4 rounded-2xl font-semibold text-lg transition-all
                      ${symptomType === type
                        ? 'bg-roche-blue text-white shadow-lg scale-105'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }
                    `}
                  >
                    {type === 'Dolor' && '😣'}
                    {type === 'Debilidad' && '💤'}
                    {type === 'Rigidez' && '🔒'}
                    <br />
                    <span className="text-sm">{type}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Slider de Intensidad */}
            <div className="mb-8">
              <label className="block font-semibold mb-3 flex items-center justify-between">
                <span>Intensidad</span>
                <span className="text-4xl font-bold text-roche-blue">{intensity}/10</span>
              </label>
              <input
                type="range"
                min="1"
                max="10"
                value={intensity}
                onChange={(e) => setIntensity(parseInt(e.target.value))}
                className="w-full h-6 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-roche-blue"
                style={{
                  background: `linear-gradient(to right, #0044CC 0%, #0044CC ${intensity * 10}%, #e5e7eb ${intensity * 10}%, #e5e7eb 100%)`
                }}
              />
              <div className="flex justify-between text-xs text-gray-500 mt-2">
                <span>Leve</span>
                <span>Moderado</span>
                <span>Severo</span>
              </div>
            </div>

            {/* Botones de Acción */}
            <div className="space-y-3">
              <BigButton 
                variant="success" 
                fullWidth 
                onClick={handleSubmit}
                disabled={!symptomType}
              >
                Guardar Reporte
              </BigButton>
              <BigButton 
                variant="ghost" 
                fullWidth 
                onClick={() => setModalOpen(false)}
              >
                Cancelar
              </BigButton>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
