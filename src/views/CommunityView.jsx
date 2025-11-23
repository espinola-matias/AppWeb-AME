import { useState } from 'react';
import { Plus, MapPin, Users, Calendar, Heart, MessageCircle, Share2, Check, Cloud, CloudRain, Sun, Filter } from 'lucide-react';
import { BigButton } from '../components/BigButton';
import { Card, CardContent } from '../components/Card';

// Mock data de eventos
const mockEvents = [
  {
    id: 1,
    title: 'Cena de Viernes - Pizzería Ljubljana',
    category: 'Gastronomía',
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=500',
    date: '2024-11-25',
    time: '19:00',
    location: 'Ljubljana Centro',
    participants: 8,
    maxParticipants: 12,
    accessibility: ['Rampa Verificada', 'Baño Adaptado', 'Espacio Silla Eléctrica'],
    organizer: 'María G.',
    description: 'Pizza napolitana auténtica en restaurante 100% accesible',
    joined: false
  },
  {
    id: 2,
    title: 'Básquetbol en Silla de Ruedas',
    category: 'Deporte Adaptado',
    image: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?w=500',
    date: '2024-11-23',
    time: '16:00',
    location: 'Polideportivo Stožice',
    participants: 15,
    maxParticipants: 20,
    accessibility: ['Vestuarios Adaptados', 'Equipamiento Incluido', 'Entrenador Certificado'],
    organizer: 'Club SMA Ljubljana',
    description: 'Entrenamiento abierto para todos los niveles',
    joined: true
  },
  {
    id: 3,
    title: 'Noche de Cine: Barbie',
    category: 'Fiesta',
    image: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=500',
    date: '2024-11-24',
    time: '20:30',
    location: 'Cineplexx Koper',
    participants: 6,
    maxParticipants: 10,
    accessibility: ['Asientos Preferenciales', 'Rampa Entrada', 'Audio Descripción'],
    organizer: 'Ana L.',
    description: 'Cine con palomitas y risas garantizadas',
    joined: false
  },
  {
    id: 4,
    title: 'Grupo de Estudio: Matemáticas',
    category: 'Estudio',
    image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=500',
    date: '2024-11-26',
    time: '14:00',
    location: 'Biblioteca Central Maribor',
    participants: 4,
    maxParticipants: 6,
    accessibility: ['Mesa Ajustable', 'Enchufes Disponibles', 'Ascensor'],
    organizer: 'Carlos M.',
    description: 'Preparación para examen de cálculo',
    joined: false
  },
  {
    id: 5,
    title: 'Escapada a Bled',
    category: 'Viajes',
    image: 'https://images.unsplash.com/photo-1605640840605-14ac1855827b?w=500',
    date: '2024-12-01',
    time: '09:00',
    location: 'Lago Bled',
    participants: 10,
    maxParticipants: 15,
    accessibility: ['Transporte Adaptado', 'Guía Turístico', 'Rutas Accesibles'],
    organizer: 'Asociación SMA Eslovenia',
    description: 'Día completo explorando el lago más bonito de Eslovenia',
    joined: false
  }
];

// Mock data de Buddy Finder
const mockBuddyRequests = [
  {
    id: 1,
    name: 'Juan Pérez',
    avatar: '🧑',
    activity: 'Pasear al perro por el río',
    time: 'Tardes de semana',
    location: 'Ljubljana',
    verified: true
  },
  {
    id: 2,
    name: 'Lucía S.',
    avatar: '👩‍🦱',
    activity: 'Café y charla',
    time: 'Fines de semana',
    location: 'Maribor',
    verified: true
  },
  {
    id: 3,
    name: 'Blaž U.',
    avatar: '👨',
    activity: 'Videojuegos online',
    time: 'Noches',
    location: 'Online',
    verified: true
  }
];

export function CommunityView({ navigate }) {
  const [selectedCategory, setSelectedCategory] = useState('Todos');
  const [events, setEvents] = useState(mockEvents);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showBuddyFinder, setShowBuddyFinder] = useState(false);

  // Datos del clima (mock)
  const weather = {
    temp: 12,
    condition: 'Nublado',
    icon: Cloud,
    alert: null // 'Lluvia esperada a las 18:00' si hay alerta
  };

  const categories = [
    { id: 'Todos', label: 'Todos', emoji: '🌟' },
    { id: 'Gastronomía', label: 'Gastronomía', emoji: '🍔' },
    { id: 'Deporte Adaptado', label: 'Deporte', emoji: '🏀' },
    { id: 'Fiesta', label: 'Fiesta', emoji: '🎉' },
    { id: 'Estudio', label: 'Estudio', emoji: '📚' },
    { id: 'Viajes', label: 'Viajes', emoji: '✈️' }
  ];

  const handleJoinEvent = (eventId) => {
    setEvents(events.map(e => 
      e.id === eventId ? { ...e, joined: !e.joined, participants: e.joined ? e.participants - 1 : e.participants + 1 } : e
    ));
  };

  const filteredEvents = selectedCategory === 'Todos' 
    ? events 
    : events.filter(e => e.category === selectedCategory);

  return (
    <div className="max-w-6xl mx-auto pb-6">
      {/* Header Inspirador */}
      <div className="mb-8">
        <h1 className="text-4xl sm:text-5xl font-black text-gray-900 mb-2">
          🌍 Tu Vida Social
        </h1>
        <p className="text-xl sm:text-2xl text-gray-600 mb-6">
          Conecta, sal y diviértete
        </p>

        {/* Widget de Clima (CRÍTICO para usuarios con silla eléctrica) */}
        <div className="bg-gradient-to-r from-roche-blue to-sky-500 text-white p-6 rounded-3xl shadow-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <weather.icon className="w-16 h-16" />
              <div>
                <p className="text-3xl font-bold">{weather.temp}°C</p>
                <p className="text-lg opacity-90">{weather.condition} en Ljubljana</p>
              </div>
            </div>
            {weather.alert && (
              <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm">
                ⚠️ {weather.alert}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Filtros de Categoría (Pills Grandes) */}
      <div className="mb-8 overflow-x-auto pb-4 -mx-4 px-4">
        <div className="flex gap-3 min-w-max">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`
                px-8 py-4 rounded-full font-bold text-lg transition-all whitespace-nowrap
                flex items-center gap-3 min-h-[70px]
                ${selectedCategory === cat.id
                  ? 'bg-joy-orange text-white shadow-xl scale-105'
                  : 'bg-white text-gray-700 hover:bg-gray-100 shadow-md'
                }
              `}
            >
              <span className="text-3xl">{cat.emoji}</span>
              <span>{cat.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Sección Buddy Finder (Destacada) */}
      <div className="mb-12">
        <button
          onClick={() => setShowBuddyFinder(!showBuddyFinder)}
          className="w-full bg-gradient-to-r from-joy-yellow to-joy-orange p-8 rounded-3xl shadow-2xl border-4 border-joy-orange/30 hover:scale-[1.02] transition-transform"
        >
          <div className="flex items-center justify-between">
            <div className="text-left">
              <p className="text-2xl font-black text-gray-900 mb-2">
                ❤️ ¿Buscas compañía?
              </p>
              <p className="text-lg text-gray-700">
                Encuentra tu "buddy" perfecto para actividades
              </p>
            </div>
            <div className="bg-white rounded-full p-4">
              <Users className="w-8 h-8 text-joy-orange" />
            </div>
          </div>
        </button>

        {/* Lista de Buddy Requests */}
        {showBuddyFinder && (
          <div className="mt-6 space-y-4 animate-slide-in">
            {mockBuddyRequests.map((buddy) => (
              <div
                key={buddy.id}
                className="bg-white p-6 rounded-2xl shadow-lg border-2 border-gray-100 hover:border-joy-orange/50 transition-all"
              >
                <div className="flex items-start gap-4">
                  <div className="text-5xl">{buddy.avatar}</div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="font-bold text-xl">{buddy.name}</h3>
                      {buddy.verified && (
                        <div className="bg-roche-blue text-white px-2 py-1 rounded-full text-xs flex items-center gap-1">
                          <Check className="w-3 h-3" />
                          Verificado
                        </div>
                      )}
                    </div>
                    <p className="text-gray-700 text-lg mb-2">
                      "{buddy.activity}"
                    </p>
                    <div className="flex gap-4 text-sm text-gray-500">
                      <span>📍 {buddy.location}</span>
                      <span>🕐 {buddy.time}</span>
                    </div>
                  </div>
                  <BigButton variant="accent" onClick={() => alert('Solicitud de Buddy enviada!')}>
                    Conectar
                  </BigButton>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Feed de Eventos (Cards Grandes con Espaciado Anti-Temblor) */}
      <div className="space-y-8">
        {filteredEvents.map((event) => (
          <div
            key={event.id}
            className="bg-white rounded-3xl shadow-xl overflow-hidden hover:shadow-2xl transition-all border-2 border-transparent hover:border-joy-orange/30"
          >
            {/* Imagen del Evento */}
            <div className="relative h-64 sm:h-80 bg-gradient-to-br from-gray-200 to-gray-300">
              <div className="absolute inset-0 flex items-center justify-center text-6xl">
                {event.category === 'Gastronomía' && '🍕'}
                {event.category === 'Deporte Adaptado' && '🏀'}
                {event.category === 'Fiesta' && '🎬'}
                {event.category === 'Estudio' && '📖'}
                {event.category === 'Viajes' && '🏔️'}
              </div>
              
              {/* Badge de Categoría */}
              <div className="absolute top-4 left-4 bg-black/70 backdrop-blur-sm text-white px-4 py-2 rounded-full font-semibold">
                {event.category}
              </div>

              {/* Badge de Estado */}
              {event.joined && (
                <div className="absolute top-4 right-4 bg-growth-green text-white px-4 py-2 rounded-full font-semibold flex items-center gap-2">
                  <Check className="w-5 h-5" />
                  Te has unido
                </div>
              )}
            </div>

            {/* Contenido del Evento */}
            <div className="p-8">
              {/* Título y Organizador */}
              <div className="mb-6">
                <h2 className="text-3xl font-black text-gray-900 mb-3">
                  {event.title}
                </h2>
                <p className="text-lg text-gray-600 mb-4">
                  {event.description}
                </p>
                <p className="text-sm text-gray-500">
                  Organizado por <span className="font-semibold">{event.organizer}</span>
                </p>
              </div>

              {/* Información del Evento */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                <div className="flex items-center gap-3 bg-gray-50 p-4 rounded-2xl">
                  <Calendar className="w-6 h-6 text-roche-blue" />
                  <div>
                    <p className="text-xs text-gray-500">Fecha</p>
                    <p className="font-bold">{new Date(event.date).toLocaleDateString('es-ES', { day: 'numeric', month: 'short' })}</p>
                    <p className="text-sm text-gray-600">{event.time}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 bg-gray-50 p-4 rounded-2xl">
                  <MapPin className="w-6 h-6 text-roche-blue" />
                  <div>
                    <p className="text-xs text-gray-500">Ubicación</p>
                    <p className="font-bold">{event.location}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 bg-gray-50 p-4 rounded-2xl">
                  <Users className="w-6 h-6 text-roche-blue" />
                  <div>
                    <p className="text-xs text-gray-500">Participantes</p>
                    <p className="font-bold">{event.participants}/{event.maxParticipants}</p>
                  </div>
                </div>
              </div>

              {/* Etiquetas de Accesibilidad (VITAL) */}
              <div className="mb-6">
                <p className="text-sm font-semibold text-gray-700 mb-3">
                  ♿ Accesibilidad Verificada:
                </p>
                <div className="flex flex-wrap gap-2">
                  {event.accessibility.map((feature, idx) => (
                    <div
                      key={idx}
                      className="bg-growth-green/10 text-growth-green px-4 py-2 rounded-full font-semibold flex items-center gap-2 text-sm"
                    >
                      <Check className="w-4 h-4" />
                      {feature}
                    </div>
                  ))}
                </div>
              </div>

              {/* Botón de Acción GIGANTE */}
              <BigButton
                variant={event.joined ? 'ghost' : 'primary'}
                fullWidth
                onClick={() => handleJoinEvent(event.id)}
              >
                {event.joined ? 'Cancelar Asistencia' : 'UNIRME AL EVENTO'}
              </BigButton>
            </div>
          </div>
        ))}
      </div>

      {/* Mensaje si no hay eventos */}
      {filteredEvents.length === 0 && (
        <div className="text-center py-20">
          <p className="text-4xl mb-4">🔍</p>
          <p className="text-2xl font-bold text-gray-400 mb-2">
            No hay eventos en esta categoría
          </p>
          <p className="text-gray-500">
            ¡Sé el primero en crear uno!
          </p>
        </div>
      )}

      {/* Botón Flotante (FAB) - MASIVO */}
      <button
        onClick={() => setShowCreateModal(true)}
        className="fixed bottom-24 right-6 sm:right-8 bg-joy-orange text-white rounded-full shadow-2xl hover:scale-110 active:scale-95 transition-transform z-30 group"
        style={{ width: '80px', height: '80px' }}
      >
        <Plus className="w-12 h-12 mx-auto" strokeWidth={3} />
        <span className="absolute right-full mr-4 top-1/2 -translate-y-1/2 bg-black/80 text-white px-4 py-2 rounded-full font-bold whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
          Crear Plan
        </span>
      </button>

      {/* Modal Crear Evento (Simplificado) */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 animate-fade-in">
          <div className="bg-white rounded-3xl w-full max-w-2xl p-8 animate-bounce-in">
            <h2 className="text-3xl font-black mb-6">✨ Crear Nuevo Evento</h2>
            
            <div className="space-y-6">
              <div>
                <label className="block font-bold mb-2 text-lg">Título del Evento</label>
                <input
                  type="text"
                  placeholder="Ej. Noche de Pizza con Amigos"
                  className="w-full px-6 py-4 text-xl border-2 border-gray-300 rounded-2xl focus:border-joy-orange focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-bold mb-2 text-lg">Categoría</label>
                <div className="grid grid-cols-3 gap-3">
                  {categories.filter(c => c.id !== 'Todos').map((cat) => (
                    <button
                      key={cat.id}
                      className="py-4 px-4 bg-gray-100 hover:bg-joy-orange hover:text-white rounded-2xl font-semibold transition-all"
                    >
                      {cat.emoji} {cat.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold mb-2 text-lg">Fecha</label>
                  <input
                    type="date"
                    className="w-full px-4 py-4 text-lg border-2 border-gray-300 rounded-2xl focus:border-joy-orange focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block font-bold mb-2 text-lg">Hora</label>
                  <input
                    type="time"
                    className="w-full px-4 py-4 text-lg border-2 border-gray-300 rounded-2xl focus:border-joy-orange focus:outline-none"
                  />
                </div>
              </div>

              <div className="flex gap-3">
                <BigButton variant="success" fullWidth onClick={() => {
                  alert('¡Evento creado con éxito!');
                  setShowCreateModal(false);
                }}>
                  Publicar Evento
                </BigButton>
                <BigButton variant="ghost" onClick={() => setShowCreateModal(false)}>
                  Cancelar
                </BigButton>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
