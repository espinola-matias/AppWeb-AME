import { useState } from 'react';
import { Plus, Clock, Bell, ShoppingCart, Calendar, TrendingUp, AlertTriangle, CheckCircle, Pill, FileDown, Snowflake, Sun, Utensils } from 'lucide-react';
import { BigButton } from '../components/BigButton';
import { Card, CardContent } from '../components/Card';

// Base de datos de medicamentos VIP para SMA
const medicationsDatabase = [
  {
    id: 1,
    name: 'Evrysdi (Risdiplam)',
    type: 'oral',
    manufacturer: 'Roche',
    isVIP: true,
    image: '💊', // En producción: URL de imagen real
    dosage: '5 mg/día',
    stock: 2, // botellas
    stockUnit: 'botellas',
    daysPerUnit: 30,
    schedule: ['09:00'],
    instructions: 'En ayunas (2h antes o después de comer)',
    safetyIcons: ['❄️ Refrigerado', '🍽️ En ayunas', '☀️ Proteger de luz'],
    sideEffects: {
      normal: ['Leve dolor de cabeza', 'Fatiga'],
      watch: ['Náuseas persistentes', 'Fiebre'],
      urgent: ['Erupción severa', 'Dificultad respiratoria']
    },
    color: 'blue',
    taken: Array(30).fill(null).map((_, i) => i < 25 ? (i === 15 ? 'late' : 'done') : null) // Últimos 30 días
  },
  {
    id: 2,
    name: 'Spinraza (Nusinersen)',
    type: 'injection',
    manufacturer: 'Biogen',
    isVIP: true,
    image: '💉',
    dosage: 'Intratecal cada 4 meses',
    stock: null,
    stockUnit: 'citas',
    daysPerUnit: 120,
    schedule: ['Hospital'],
    instructions: 'Cita hospitalaria programada',
    safetyIcons: ['🏥 Solo Hospital', '⚕️ Anestesia'],
    sideEffects: {
      normal: ['Dolor lumbar leve', 'Dolor de cabeza'],
      watch: ['Vómitos', 'Debilidad muscular'],
      urgent: ['Meningitis aséptica', 'Problemas de coagulación']
    },
    color: 'purple',
    nextAppointment: '2024-12-15',
    taken: null
  },
  {
    id: 3,
    name: 'Zolgensma',
    type: 'infusion',
    manufacturer: 'Novartis',
    isVIP: true,
    image: '🧬',
    dosage: 'Terapia génica (única dosis)',
    stock: null,
    stockUnit: 'dosis única',
    schedule: ['Completada'],
    instructions: 'Terapia de una sola vez',
    safetyIcons: ['🏥 Solo Hospital', '🧬 Terapia Génica'],
    sideEffects: {
      normal: ['Elevación transitoria de enzimas hepáticas'],
      watch: ['Fiebre', 'Vómitos'],
      urgent: ['Insuficiencia hepática aguda', 'Trombocitopenia']
    },
    color: 'green',
    completed: true,
    taken: null
  }
];

// Medicamentos personalizados de ejemplo
const customMeds = [
  {
    id: 101,
    name: 'Vitamina D3',
    type: 'supplement',
    isVIP: false,
    image: '🌞',
    dosage: '2000 UI/día',
    stock: 60,
    stockUnit: 'cápsulas',
    daysPerUnit: 1,
    schedule: ['14:00'],
    instructions: 'Con alimentos',
    color: 'yellow'
  }
];

export function MedicationView({ navigate }) {
  const [medications, setMedications] = useState([...medicationsDatabase, ...customMeds]);
  const [selectedMed, setSelectedMed] = useState(null);
  const [showTakeModal, setShowTakeModal] = useState(false);
  const [showStockAlert, setShowStockAlert] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);

  const evrysdi = medications.find(m => m.id === 1);
  const stockPercentage = (evrysdi.stock / 3) * 100; // 3 botellas = 100%
  const daysRemaining = evrysdi.stock * evrysdi.daysPerUnit;

  const handleTakeMedication = (med) => {
    setSelectedMed(med);
    setShowTakeModal(true);
  };

  const confirmTake = () => {
    // Animación de confeti
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 3000);

    // Reducir stock
    setMedications(medications.map(m => 
      m.id === selectedMed.id 
        ? { ...m, stock: m.stock - (1 / m.daysPerUnit) }
        : m
    ));

    // Marcar en calendario
    const today = new Date().getDate() - 1;
    if (selectedMed.taken) {
      selectedMed.taken[today] = 'done';
    }

    setShowTakeModal(false);

    // Verificar si necesita reabastecimiento
    if (selectedMed.stock * selectedMed.daysPerUnit <= 7) {
      setTimeout(() => setShowStockAlert(true), 1000);
    }
  };

  const adherencePercentage = evrysdi.taken 
    ? Math.round((evrysdi.taken.filter(t => t === 'done').length / evrysdi.taken.length) * 100)
    : 0;

  const currentStreak = evrysdi.taken 
    ? evrysdi.taken.reverse().findIndex(t => t !== 'done')
    : 0;

  return (
    <div className="max-w-4xl mx-auto pb-6">
      {/* Confeti Animation */}
      {showConfetti && (
        <div className="fixed inset-0 pointer-events-none z-50 flex items-center justify-center">
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className="absolute w-3 h-3 rounded-full animate-ping"
              style={{
                background: ['#0044CC', '#FF6B35', '#06D6A0', '#FFD93D'][i % 4],
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 0.5}s`,
                animationDuration: '2s'
              }}
            />
          ))}
        </div>
      )}

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl sm:text-4xl font-black text-gray-900 mb-2">
          💊 Mi Medicación
        </h1>
        <p className="text-xl text-gray-600">
          Mantén tu tratamiento al día
        </p>
      </div>

      {/* Tarjeta Hero - Evrysdi (Producto Roche VIP) */}
      <div className="bg-gradient-to-br from-roche-blue to-sky-600 text-white rounded-3xl shadow-2xl p-8 mb-8">
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-center gap-4">
            <div className="w-20 h-20 bg-white rounded-3xl flex items-center justify-center text-5xl">
              {evrysdi.image}
            </div>
            <div>
              <h2 className="text-2xl font-black">{evrysdi.name}</h2>
              <p className="text-sm opacity-90">{evrysdi.manufacturer}</p>
              <div className="flex gap-2 mt-2">
                {evrysdi.safetyIcons.map((icon, idx) => (
                  <span key={idx} className="text-xs bg-white/20 px-2 py-1 rounded-full">
                    {icon}
                  </span>
                ))}
              </div>
            </div>
          </div>
          <div className="bg-white/20 backdrop-blur-sm rounded-2xl px-4 py-2">
            <p className="text-xs opacity-75">Próxima toma</p>
            <p className="text-2xl font-bold">{evrysdi.schedule[0]}</p>
          </div>
        </div>

        {/* Stock Visual */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-semibold">Stock restante</span>
            <span className="text-sm">{daysRemaining} días</span>
          </div>
          <div className="h-16 bg-white/20 rounded-full overflow-hidden relative">
            <div 
              className={`h-full transition-all duration-1000 ${
                stockPercentage > 50 ? 'bg-growth-green' :
                stockPercentage > 20 ? 'bg-joy-yellow' : 'bg-red-500'
              }`}
              style={{ width: `${stockPercentage}%` }}
            >
              <div className="absolute inset-0 flex items-center justify-center text-white font-bold">
                {evrysdi.stock.toFixed(1)} / 3 botellas
              </div>
            </div>
          </div>
        </div>

        {/* Botón Tomar */}
        <BigButton 
          variant="success" 
          fullWidth 
          onClick={() => handleTakeMedication(evrysdi)}
          className="bg-white text-roche-blue hover:bg-gray-100 shadow-xl"
        >
          <CheckCircle className="w-6 h-6 inline mr-2" />
          TOMAR AHORA
        </BigButton>
      </div>

      {/* Racha y Adherencia */}
      <div className="grid grid-cols-2 gap-4 mb-8">
        <Card variant="green">
          <CardContent>
            <div className="text-center">
              <p className="text-sm text-gray-600 mb-2">Racha Actual</p>
              <p className="text-5xl font-black text-growth-green mb-2">
                {currentStreak}
              </p>
              <p className="text-sm text-gray-600">días seguidos</p>
            </div>
          </CardContent>
        </Card>

        <Card variant="blue">
          <CardContent>
            <div className="text-center">
              <p className="text-sm text-gray-600 mb-2">Adherencia</p>
              <p className="text-5xl font-black text-roche-blue mb-2">
                {adherencePercentage}%
              </p>
              <p className="text-sm text-gray-600">este mes</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Calendario de Adherencia (Mapa de Calor) */}
      <Card variant="default" className="mb-8">
        <CardContent>
          <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
            <Calendar className="w-5 h-5" />
            Calendario de Adherencia
          </h3>
          <div className="grid grid-cols-10 gap-2">
            {evrysdi.taken.map((status, idx) => (
              <div
                key={idx}
                className={`
                  aspect-square rounded-lg flex items-center justify-center text-xs font-bold
                  ${status === 'done' ? 'bg-growth-green text-white' : 
                    status === 'late' ? 'bg-joy-yellow text-white' : 
                    status === 'missed' ? 'bg-red-500 text-white' : 
                    'bg-gray-200 text-gray-400'}
                `}
                title={`Día ${idx + 1}`}
              >
                {idx + 1}
              </div>
            ))}
          </div>
          <div className="flex gap-4 mt-4 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-growth-green rounded"></div>
              <span>A tiempo</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-joy-yellow rounded"></div>
              <span>Tarde</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-red-500 rounded"></div>
              <span>Omitida</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Otros Medicamentos */}
      <h3 className="font-bold text-xl mb-4">Otros Medicamentos</h3>
      <div className="space-y-4 mb-8">
        {medications.filter(m => m.id !== 1).map((med) => (
          <div
            key={med.id}
            className="bg-white rounded-2xl shadow-md p-6 border-2 border-gray-100"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className={`
                  w-16 h-16 rounded-2xl flex items-center justify-center text-4xl
                  ${med.isVIP ? 'bg-gradient-to-br from-vitality-purple to-roche-blue' : 'bg-gray-100'}
                `}>
                  {med.image}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold text-lg">{med.name}</h3>
                    {med.isVIP && (
                      <span className="bg-roche-blue text-white px-2 py-1 rounded-full text-xs flex items-center gap-1">
                        <CheckCircle className="w-3 h-3" />
                        Verificado
                      </span>
                    )}
                  </div>
                  <p className="text-gray-600">{med.dosage}</p>
                  {med.schedule && med.schedule[0] !== 'Hospital' && med.schedule[0] !== 'Completada' && (
                    <p className="text-sm text-gray-500">
                      <Clock className="w-4 h-4 inline mr-1" />
                      {med.schedule.join(', ')}
                    </p>
                  )}
                </div>
              </div>
              
              {med.completed ? (
                <div className="bg-growth-green text-white px-4 py-2 rounded-full font-semibold">
                  Completada
                </div>
              ) : med.nextAppointment ? (
                <div className="text-center">
                  <p className="text-xs text-gray-500">Próxima cita</p>
                  <p className="font-bold">{new Date(med.nextAppointment).toLocaleDateString('es-ES')}</p>
                </div>
              ) : (
                <button
                  onClick={() => handleTakeMedication(med)}
                  className="px-6 py-3 bg-roche-blue text-white rounded-full font-semibold hover:bg-roche-blue/90 transition-colors"
                >
                  Tomar
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Botón Añadir Medicamento */}
      <BigButton 
        variant="ghost" 
        fullWidth 
        onClick={() => setShowAddModal(true)}
      >
        <Plus className="w-6 h-6 inline mr-2" />
        Añadir Medicamento Personalizado
      </BigButton>

      {/* Botón Exportar PDF */}
      <div className="mt-4">
        <BigButton variant="primary" fullWidth onClick={() => alert('Generando Informe de Adherencia PDF...')}>
          <FileDown className="w-6 h-6 inline mr-2" />
          Generar Informe de Adherencia
        </BigButton>
        <p className="text-sm text-gray-500 text-center mt-2">
          Permite al médico ver si el fallo terapéutico es por la medicina o por adherencia
        </p>
      </div>

      {/* Modal de Seguridad al Tomar */}
      {showTakeModal && selectedMed && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 animate-fade-in">
          <div className="bg-white rounded-3xl w-full max-w-2xl p-8 animate-bounce-in">
            <h2 className="text-3xl font-black mb-6">
              ⚠️ Verificación de Seguridad
            </h2>

            <div className="bg-yellow-50 border-2 border-yellow-400 rounded-2xl p-6 mb-6">
              <p className="text-lg font-bold text-gray-900 mb-4">
                Antes de tomar {selectedMed.name}:
              </p>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-growth-green flex-shrink-0 mt-1" />
                  <p className="text-gray-700">
                    {selectedMed.instructions}
                  </p>
                </div>
                {selectedMed.safetyIcons.map((icon, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <div className="text-2xl">{icon.split(' ')[0]}</div>
                    <p className="text-gray-700 pt-1">{icon.split(' ').slice(1).join(' ')}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-gray-50 rounded-2xl p-6 mb-6">
              <p className="font-bold mb-2">¿Cumples con estos requisitos?</p>
              <div className="space-y-2">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input type="checkbox" className="w-6 h-6 accent-roche-blue" required />
                  <span>Sí, estoy en ayunas (2h sin comer)</span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer">
                  <input type="checkbox" className="w-6 h-6 accent-roche-blue" required />
                  <span>Sí, el medicamento está refrigerado</span>
                </label>
              </div>
            </div>

            <div className="flex gap-3">
              <BigButton variant="success" fullWidth onClick={confirmTake}>
                <CheckCircle className="w-6 h-6 inline mr-2" />
                Confirmar Toma
              </BigButton>
              <BigButton variant="ghost" onClick={() => setShowTakeModal(false)}>
                Cancelar
              </BigButton>
            </div>
          </div>
        </div>
      )}

      {/* Modal de Alerta de Stock Bajo */}
      {showStockAlert && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 animate-fade-in">
          <div className="bg-white rounded-3xl w-full max-w-2xl p-8 animate-bounce-in">
            <div className="text-center mb-6">
              <AlertTriangle className="w-24 h-24 text-yellow-500 mx-auto mb-4" />
              <h2 className="text-3xl font-black mb-2">Stock Bajo</h2>
              <p className="text-xl text-gray-600">
                Te quedan solo {daysRemaining} días de {evrysdi.name}
              </p>
            </div>

            <div className="bg-gradient-to-r from-roche-blue to-sky-600 text-white rounded-2xl p-6 mb-6">
              <div className="flex items-center gap-4 mb-4">
                <ShoppingCart className="w-12 h-12" />
                <div>
                  <h3 className="text-xl font-bold">Lekarna Ljubljana</h3>
                  <p className="text-sm opacity-90">Farmacia verificada</p>
                </div>
              </div>
              <p className="mb-4">
                Podemos solicitar automáticamente tu recarga
              </p>
              <BigButton 
                variant="success" 
                fullWidth 
                className="bg-white text-roche-blue hover:bg-gray-100"
                onClick={() => {
                  alert('✅ Pedido #1234 enviado a Lekarna Ljubljana.\n\nTe avisaremos cuando esté listo para recoger o enviar.');
                  setShowStockAlert(false);
                }}
              >
                Solicitar Recarga Automática
              </BigButton>
            </div>

            <BigButton variant="ghost" fullWidth onClick={() => setShowStockAlert(false)}>
              Recordarme Después
            </BigButton>
          </div>
        </div>
      )}

      {/* Modal Añadir Medicamento */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 animate-fade-in">
          <div className="bg-white rounded-3xl w-full max-w-2xl p-8 animate-bounce-in">
            <h2 className="text-3xl font-black mb-6">
              ➕ Añadir Medicamento
            </h2>
            
            <div className="space-y-4 mb-6">
              <div>
                <label className="block font-bold mb-2">Nombre del Medicamento</label>
                <input
                  type="text"
                  placeholder="Ej: Salbutamol"
                  className="w-full px-4 py-4 text-lg border-2 border-gray-300 rounded-2xl focus:border-roche-blue focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold mb-2">Tipo</label>
                  <select className="w-full px-4 py-4 text-lg border-2 border-gray-300 rounded-2xl focus:border-roche-blue focus:outline-none">
                    <option>Pastilla</option>
                    <option>Jarabe</option>
                    <option>Inyección</option>
                    <option>Otro</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold mb-2">Dosis</label>
                  <input
                    type="text"
                    placeholder="Ej: 100mg"
                    className="w-full px-4 py-4 text-lg border-2 border-gray-300 rounded-2xl focus:border-roche-blue focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold mb-2">Horarios</label>
                <div className="flex gap-2">
                  <input
                    type="time"
                    className="flex-1 px-4 py-4 text-lg border-2 border-gray-300 rounded-2xl focus:border-roche-blue focus:outline-none"
                  />
                  <button className="px-4 py-4 bg-roche-blue text-white rounded-2xl hover:bg-roche-blue/90">
                    <Plus />
                  </button>
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <BigButton variant="success" fullWidth onClick={() => {
                alert('Medicamento añadido');
                setShowAddModal(false);
              }}>
                Guardar
              </BigButton>
              <BigButton variant="ghost" onClick={() => setShowAddModal(false)}>
                Cancelar
              </BigButton>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
