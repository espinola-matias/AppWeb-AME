import { useState } from 'react';
import { ArrowLeft, Check, Play, Volume2, Plus, Minus, AlertTriangle, FileDown } from 'lucide-react';
import { BigButton } from '../components/BigButton';
import { Card, CardContent } from '../components/Card';

// Mock data de rutinas terapéuticas
const therapyRoutines = [
  {
    id: 1,
    title: 'Respiración & Tos Asistida',
    subtitle: 'Vital diario',
    icon: '🫁',
    color: 'blue',
    priority: 'Alta',
    completed: false,
    exercises: [
      {
        id: 11,
        name: 'Técnica de Tos Asistida',
        duration: '5 min',
        repetitions: 10,
        safetyZone: 'Presión suave en tórax',
        instructions: [
          'Coloca tus manos en el tórax del paciente, justo debajo de las costillas',
          'Pide al paciente que tome aire profundo',
          'Cuando exhale, aplica presión suave hacia adentro y arriba',
          'Repite con cada ciclo respiratorio'
        ],
        warnings: '⚠️ No presionar con fuerza excesiva - riesgo de fracturas'
      },
      {
        id: 12,
        name: 'Respiración Profunda Asistida',
        duration: '3 min',
        repetitions: 5,
        safetyZone: 'Expansión torácica gradual',
        instructions: [
          'Paciente en posición semi-sentada (45 grados)',
          'Coloca una mano en el pecho y otra en el abdomen',
          'Guía la expansión torácica con presión ligera',
          'Mantén 3 segundos en inspiración máxima'
        ],
        warnings: '⚠️ Detener si hay mareos o dolor agudo'
      }
    ]
  },
  {
    id: 2,
    title: 'Prevención de Contracturas',
    subtitle: 'Manos y Tobillos',
    icon: '🤲',
    color: 'orange',
    priority: 'Media',
    completed: true,
    exercises: [
      {
        id: 21,
        name: 'Movilización de Hombro',
        duration: '4 min',
        repetitions: 10,
        safetyZone: 'No elevar más de 90°',
        instructions: [
          'Sujeta suavemente el codo con tu mano derecha',
          'Con la otra mano, estabiliza el hombro',
          'Eleva lentamente hasta que sientas resistencia suave',
          'Mantén 5 segundos y baja despacio'
        ],
        warnings: '⚠️ Zona Segura: No elevar más de 90°'
      },
      {
        id: 22,
        name: 'Estiramiento de Dedos',
        duration: '3 min',
        repetitions: 15,
        safetyZone: 'Movimiento pasivo suave',
        instructions: [
          'Toma cada dedo individualmente',
          'Extiende suavemente desde la base hasta la punta',
          'Realiza círculos pequeños en cada articulación',
          'Finaliza con estiramiento completo de la mano'
        ],
        warnings: '⚠️ No forzar articulaciones rígidas'
      }
    ]
  },
  {
    id: 3,
    title: 'Transferencias Seguras',
    subtitle: 'Silla a Cama',
    icon: '♿',
    color: 'green',
    priority: 'Media',
    completed: false,
    exercises: [
      {
        id: 31,
        name: 'Transferencia con Tabla Deslizante',
        duration: '2 min',
        repetitions: 1,
        safetyZone: 'Mantener espalda recta',
        instructions: [
          'Posiciona la silla en ángulo de 45° respecto a la cama',
          'Coloca la tabla deslizante bajo el muslo del paciente',
          'Soporte en axilas, nunca tirar de los brazos',
          'Desliza suavemente hacia la cama manteniendo tu espalda recta'
        ],
        warnings: '⚠️ CRÍTICO: No tirar de brazos - riesgo de luxación'
      }
    ]
  }
];

export function CareHubView({ navigate, userRole, userData }) {
  const [selectedRoutine, setSelectedRoutine] = useState(null);
  const [selectedExercise, setSelectedExercise] = useState(null);
  const [currentRep, setCurrentRep] = useState(1);
  const [audioPlaying, setAudioPlaying] = useState(true);
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);
  const [feedbackData, setFeedbackData] = useState({ mood: null, notes: '' });
  const [routines, setRoutines] = useState(therapyRoutines);

  const patientName = userRole === 'caregiver' 
    ? userData?.linkedPatient?.name || 'el paciente' 
    : 'tu cuidador';

  // VISTA CUIDADOR - Lista de Rutinas
  if (userRole === 'caregiver' && !selectedRoutine) {
    return (
      <div className="max-w-4xl mx-auto pb-6">
        {/* Header Motivador */}
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-black text-gray-900 mb-2">
            💪 Terapia Asistida
          </h1>
          <p className="text-xl text-gray-600">
            Ayuda a <span className="font-bold text-roche-blue">{patientName}</span> a moverse mejor hoy
          </p>
        </div>

        {/* Tarjetas de Categorías */}
        <div className="space-y-6 mb-8">
          {routines.map((routine) => (
            <button
              key={routine.id}
              onClick={() => setSelectedRoutine(routine)}
              className={`
                w-full bg-white rounded-3xl shadow-lg p-6 sm:p-8 
                border-2 transition-all hover:shadow-xl hover:scale-[1.02]
                ${routine.color === 'blue' && 'border-roche-blue/20 hover:border-roche-blue/50'}
                ${routine.color === 'orange' && 'border-joy-orange/20 hover:border-joy-orange/50'}
                ${routine.color === 'green' && 'border-growth-green/20 hover:border-growth-green/50'}
              `}
            >
              <div className="flex items-center gap-6">
                {/* Icono Grande */}
                <div className={`
                  w-20 h-20 sm:w-24 sm:h-24 rounded-3xl flex items-center justify-center text-5xl sm:text-6xl
                  ${routine.color === 'blue' && 'bg-roche-blue/10'}
                  ${routine.color === 'orange' && 'bg-joy-orange/10'}
                  ${routine.color === 'green' && 'bg-growth-green/10'}
                `}>
                  {routine.icon}
                </div>

                {/* Contenido */}
                <div className="flex-1 text-left">
                  <div className="flex items-center gap-3 mb-2">
                    <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
                      {routine.title}
                    </h2>
                    {routine.priority === 'Alta' && (
                      <span className="bg-red-100 text-red-600 px-3 py-1 rounded-full text-xs font-bold">
                        VITAL
                      </span>
                    )}
                  </div>
                  <p className="text-lg text-gray-600 mb-3">{routine.subtitle}</p>
                  <p className="text-sm text-gray-500">
                    {routine.exercises.length} ejercicio{routine.exercises.length > 1 ? 's' : ''}
                  </p>
                </div>

                {/* Estado */}
                <div className={`
                  w-16 h-16 rounded-full flex items-center justify-center
                  ${routine.completed 
                    ? 'bg-growth-green text-white' 
                    : 'bg-gray-200 text-gray-400'
                  }
                `}>
                  <Check className="w-10 h-10" strokeWidth={3} />
                </div>
              </div>
            </button>
          ))}
        </div>

        {/* Estadísticas del Día */}
        <Card variant="blue">
          <CardContent>
            <h3 className="font-bold text-lg mb-4">📊 Progreso de Hoy</h3>
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center">
                <p className="text-3xl font-black text-growth-green">
                  {routines.filter(r => r.completed).length}
                </p>
                <p className="text-sm text-gray-600">Completadas</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-black text-joy-orange">
                  {routines.filter(r => !r.completed).length}
                </p>
                <p className="text-sm text-gray-600">Pendientes</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-black text-roche-blue">
                  {Math.round((routines.filter(r => r.completed).length / routines.length) * 100)}%
                </p>
                <p className="text-sm text-gray-600">Completado</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Botón Exportar PDF */}
        <div className="mt-6">
          <BigButton variant="ghost" fullWidth onClick={() => alert('Generando PDF con historial de terapias...')}>
            <FileDown className="w-6 h-6 inline mr-2" />
            Exportar Informe Mensual
          </BigButton>
        </div>
      </div>
    );
  }

  // VISTA CUIDADOR - Lista de Ejercicios de una Rutina
  if (userRole === 'caregiver' && selectedRoutine && !selectedExercise) {
    return (
      <div className="max-w-4xl mx-auto pb-6">
        {/* Header con Volver */}
        <div className="flex items-center gap-4 mb-6">
          <button 
            onClick={() => setSelectedRoutine(null)}
            className="p-3 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors"
          >
            <ArrowLeft size={24} />
          </button>
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold flex items-center gap-3">
              {selectedRoutine.icon} {selectedRoutine.title}
            </h2>
            <p className="text-gray-600">{selectedRoutine.exercises.length} ejercicios en esta rutina</p>
          </div>
        </div>

        {/* Lista de Ejercicios */}
        <div className="space-y-4">
          {selectedRoutine.exercises.map((exercise, idx) => (
            <button
              key={exercise.id}
              onClick={() => {
                setSelectedExercise(exercise);
                setCurrentRep(1);
              }}
              className="w-full bg-white rounded-2xl shadow-md p-6 border-2 border-gray-100 hover:border-roche-blue/50 transition-all text-left"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-roche-blue/10 rounded-full flex items-center justify-center font-bold text-xl text-roche-blue flex-shrink-0">
                  {idx + 1}
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-xl mb-2">{exercise.name}</h3>
                  <div className="flex gap-4 text-sm text-gray-600">
                    <span>⏱️ {exercise.duration}</span>
                    <span>🔄 {exercise.repetitions} reps</span>
                  </div>
                  <p className="text-sm text-yellow-600 mt-2 flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4" />
                    {exercise.safetyZone}
                  </p>
                </div>
                <Play className="w-8 h-8 text-growth-green" />
              </div>
            </button>
          ))}
        </div>
      </div>
    );
  }

  // VISTA CUIDADOR - Reproductor de Ejercicio (La Joya de la Corona)
  if (userRole === 'caregiver' && selectedExercise) {
    return (
      <div className="max-w-4xl mx-auto pb-6">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <button 
            onClick={() => setSelectedExercise(null)}
            className="p-3 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors"
          >
            <ArrowLeft size={24} />
          </button>
          <div>
            <h2 className="text-xl sm:text-2xl font-bold">{selectedExercise.name}</h2>
            <p className="text-gray-600">{selectedRoutine.title}</p>
          </div>
        </div>

        {/* Sección 1: Video (Top 40%) */}
        <div className="relative mb-6">
          <div className="relative bg-gradient-to-br from-gray-800 to-gray-900 rounded-3xl overflow-hidden aspect-video flex items-center justify-center">
            {/* Placeholder de Video */}
            <div className="text-center text-white">
              <Play className="w-24 h-24 mx-auto mb-4 opacity-50" />
              <p className="text-2xl font-bold mb-2">{selectedExercise.name}</p>
              <p className="text-gray-400">Video demostrativo</p>
            </div>

            {/* Advertencia Superpuesta */}
            <div className="absolute top-4 right-4 bg-yellow-500/90 backdrop-blur-sm text-gray-900 px-4 py-3 rounded-xl font-bold flex items-center gap-2 shadow-xl">
              <AlertTriangle className="w-5 h-5" />
              {selectedExercise.warnings}
            </div>

            {/* Duración */}
            <div className="absolute bottom-4 left-4 bg-black/70 backdrop-blur-sm text-white px-4 py-2 rounded-full">
              ⏱️ {selectedExercise.duration}
            </div>
          </div>
        </div>

        {/* Sección 2: Instrucciones Multimodales (Middle 40%) */}
        <div className="bg-white rounded-3xl shadow-xl p-6 mb-6">
          {/* Barra de Control de Audio */}
          <div className={`
            flex items-center gap-4 p-4 rounded-2xl mb-6 transition-all
            ${audioPlaying ? 'bg-roche-blue/10 border-2 border-roche-blue' : 'bg-gray-100'}
          `}>
            <button
              onClick={() => setAudioPlaying(!audioPlaying)}
              className={`
                p-4 rounded-full transition-all
                ${audioPlaying ? 'bg-roche-blue text-white' : 'bg-gray-300 text-gray-600'}
              `}
            >
              <Volume2 className="w-8 h-8" />
            </button>
            
            {audioPlaying && (
              <div className="flex-1 flex items-center gap-2">
                <div className="flex gap-1 items-end h-10">
                  {[...Array(20)].map((_, i) => (
                    <div
                      key={i}
                      className="w-1 bg-roche-blue rounded-full animate-pulse"
                      style={{
                        height: `${Math.random() * 100}%`,
                        animationDelay: `${i * 0.1}s`
                      }}
                    />
                  ))}
                </div>
                <span className="text-sm font-semibold text-roche-blue ml-4">
                  Narración activada
                </span>
              </div>
            )}
            
            {!audioPlaying && (
              <span className="text-gray-500">Toca para activar narración</span>
            )}
          </div>

          {/* Texto de Instrucciones */}
          <div className="space-y-4">
            <h3 className="font-bold text-lg mb-4">📋 Instrucciones Paso a Paso:</h3>
            {selectedExercise.instructions.map((step, idx) => (
              <div key={idx} className="flex gap-4 items-start">
                <div className="w-10 h-10 bg-growth-green text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">
                  {idx + 1}
                </div>
                <p className="text-lg text-gray-700 pt-2">{step}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Sección 3: Controles de Acción (Bottom 20%) */}
        <div className="bg-white rounded-3xl shadow-xl p-8">
          {/* Contador de Repeticiones */}
          <div className="text-center mb-8">
            <p className="text-gray-500 mb-2">Repetición</p>
            <div className="flex items-center justify-center gap-6">
              <button
                onClick={() => setCurrentRep(Math.max(1, currentRep - 1))}
                className="w-16 h-16 bg-gray-200 hover:bg-gray-300 rounded-full flex items-center justify-center transition-colors"
                disabled={currentRep === 1}
              >
                <Minus className="w-8 h-8" />
              </button>

              <div className="text-6xl font-black text-roche-blue min-w-[200px]">
                {currentRep} <span className="text-3xl text-gray-400">/ {selectedExercise.repetitions}</span>
              </div>

              <button
                onClick={() => setCurrentRep(Math.min(selectedExercise.repetitions, currentRep + 1))}
                className="w-16 h-16 bg-roche-blue hover:bg-roche-blue/90 text-white rounded-full flex items-center justify-center transition-colors"
                disabled={currentRep === selectedExercise.repetitions}
              >
                <Plus className="w-8 h-8" />
              </button>
            </div>
          </div>

          {/* Botón Completar */}
          <BigButton
            variant="success"
            fullWidth
            onClick={() => setShowFeedbackModal(true)}
            disabled={currentRep < selectedExercise.repetitions}
          >
            <Check className="w-6 h-6 inline mr-2" />
            {currentRep >= selectedExercise.repetitions 
              ? 'Ejercicio Completado' 
              : `Completa ${selectedExercise.repetitions - currentRep} repeticiones más`
            }
          </BigButton>
        </div>

        {/* Modal de Feedback */}
        {showFeedbackModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 animate-fade-in">
            <div className="bg-white rounded-3xl w-full max-w-2xl p-8 animate-bounce-in">
              <h2 className="text-3xl font-black mb-6">
                ¿Cómo reaccionó {patientName}?
              </h2>

              {/* Selección de Estado */}
              <div className="grid grid-cols-3 gap-4 mb-6">
                <button
                  onClick={() => setFeedbackData({...feedbackData, mood: 'happy'})}
                  className={`
                    p-8 rounded-3xl border-4 transition-all text-center
                    ${feedbackData.mood === 'happy'
                      ? 'border-growth-green bg-growth-green/10 scale-105'
                      : 'border-gray-200 hover:border-gray-300'
                    }
                  `}
                >
                  <div className="text-6xl mb-3">😊</div>
                  <p className="font-bold">Sin Dolor</p>
                  <p className="text-sm text-gray-600">Relajado</p>
                </button>

                <button
                  onClick={() => setFeedbackData({...feedbackData, mood: 'neutral'})}
                  className={`
                    p-8 rounded-3xl border-4 transition-all text-center
                    ${feedbackData.mood === 'neutral'
                      ? 'border-joy-yellow bg-joy-yellow/10 scale-105'
                      : 'border-gray-200 hover:border-gray-300'
                    }
                  `}
                >
                  <div className="text-6xl mb-3">😐</div>
                  <p className="font-bold">Molestia Leve</p>
                  <p className="text-sm text-gray-600">Rigidez</p>
                </button>

                <button
                  onClick={() => setFeedbackData({...feedbackData, mood: 'pain'})}
                  className={`
                    p-8 rounded-3xl border-4 transition-all text-center
                    ${feedbackData.mood === 'pain'
                      ? 'border-alert bg-alert/10 scale-105'
                      : 'border-gray-200 hover:border-gray-300'
                    }
                  `}
                >
                  <div className="text-6xl mb-3">😣</div>
                  <p className="font-bold">Hubo Dolor</p>
                  <p className="text-sm text-gray-600">Detuvimos</p>
                </button>
              </div>

              {/* Notas Opcionales */}
              <div className="mb-6">
                <label className="block font-bold mb-2">Añadir nota rápida (opcional)</label>
                <textarea
                  value={feedbackData.notes}
                  onChange={(e) => setFeedbackData({...feedbackData, notes: e.target.value})}
                  placeholder="Ej: Hoy Juan tuvo más resistencia en el brazo derecho..."
                  className="w-full px-4 py-4 border-2 border-gray-300 rounded-2xl focus:border-roche-blue focus:outline-none resize-none"
                  rows={3}
                />
              </div>

              {/* Botones */}
              <div className="flex gap-3">
                <BigButton
                  variant="success"
                  fullWidth
                  onClick={() => {
                    // Guardar feedback
                    alert(`✅ Feedback guardado en Historial Clínico\n\nEstado: ${feedbackData.mood}\nNotas: ${feedbackData.notes || 'Sin notas'}`);
                    
                    // Marcar rutina como completada
                    setRoutines(routines.map(r => 
                      r.id === selectedRoutine.id ? {...r, completed: true} : r
                    ));
                    
                    // Volver a la lista
                    setShowFeedbackModal(false);
                    setSelectedExercise(null);
                    setSelectedRoutine(null);
                  }}
                  disabled={!feedbackData.mood}
                >
                  Guardar en Historial Clínico
                </BigButton>
                <BigButton
                  variant="ghost"
                  onClick={() => setShowFeedbackModal(false)}
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

  // VISTA PACIENTE - Feed de Actividad
  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-2xl sm:text-3xl font-bold mb-6">💙 Mi Care Hub</h2>
      
      <Card variant="blue" className="mb-6">
        <CardContent>
          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 bg-vitality-purple rounded-full flex items-center justify-center text-3xl">
              💙
            </div>
            <div>
              <h3 className="font-bold text-xl">Tu Cuidador</h3>
              <p className="text-gray-600">{userData?.caregiverName || 'Dr. Ramírez'}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <h3 className="font-bold text-lg mb-4">📋 Actividades Recientes</h3>
      <div className="space-y-4">
        <div className="bg-white p-6 rounded-2xl shadow-md">
          <p className="text-gray-600">🫁 Respiración completada</p>
          <p className="text-sm text-gray-400">Hace 2 horas</p>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-md">
          <p className="text-gray-600">💊 Medicación tomada</p>
          <p className="text-sm text-gray-400">Hace 4 horas</p>
        </div>
      </div>

      <div className="mt-6">
        <BigButton variant="primary" fullWidth onClick={() => alert('Generando PDF...')}>
          <FileDown className="w-6 h-6 inline mr-2" />
          Exportar Informe para Médico
        </BigButton>
      </div>
    </div>
  );
}
