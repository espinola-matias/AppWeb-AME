import React, { useState, useEffect } from 'react';
import { WelcomeScreen } from './views/WelcomeScreen';
import { PatientSetup } from './views/PatientSetup';
import { CaregiverSetup } from './views/CaregiverSetup';
import { PatientHome } from './views/PatientHome';
import { BreathingGame } from './views/BreathingGame';
import { CareHubView } from './views/CareHubView';
import { PainMapView } from './views/PainMapView';
import { CommunityView } from './views/CommunityView';
import { SocialFeedView } from './views/SocialFeedView';
import { MedicationView } from './views/MedicationView';
import { BigButton } from './components/BigButton';
import { AlertTriangle, Check, ArrowLeft, Home, Users, Globe, Heart, Activity, Pill, User, LogOut } from 'lucide-react';

// --- IMPORTAMOS EL CEREBRO ---
import { FaceController } from './FaceController.jsx'; 

function App() {
  const [screen, setScreen] = useState('init');
  const [userRole, setUserRole] = useState(null); // 'patient' | 'caregiver'
  const [userData, setUserData] = useState(null);
  const [emergencyActive, setEmergencyActive] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  // Cargar datos de localStorage al iniciar
  useEffect(() => {
    const role = localStorage.getItem('userRole');
    if (role === 'patient') {
      const data = localStorage.getItem('patientData');
      if (data) {
        setUserRole('patient');
        setUserData(JSON.parse(data));
        setScreen('home');
      }
    } else if (role === 'caregiver') {
      const data = localStorage.getItem('caregiverData');
      if (data) {
        setUserRole('caregiver');
        setUserData(JSON.parse(data));
        setScreen('carehub');
      }
    }
  }, []);

  // Detectar cambios de tamaño de pantalla
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Navegación centralizada
  const navigate = (to) => {
    if (to === 'emergency') {
      setEmergencyActive(true);
      // Auto-cerrar después de 10 segundos
      setTimeout(() => setEmergencyActive(false), 10000);
    } else {
      setScreen(to);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Función para cerrar sesión
  const handleLogout = () => {
    if (window.confirm('¿Estás seguro de que quieres cerrar sesión?')) {
      localStorage.removeItem('userRole');
      localStorage.removeItem('patientData');
      localStorage.removeItem('caregiverData');
      setUserRole(null);
      setUserData(null);
      setScreen('init');
    }
  };

  const handleRoleSelection = (role) => {
    setUserRole(role);
    localStorage.setItem('userRole', role);
    setScreen(role === 'patient' ? 'patient-setup' : 'caregiver-setup');
  };

  const handleSetupComplete = (data) => {
    setUserData(data);
    if (userRole === 'patient') {
      setScreen('home');
    } else {
      setScreen('carehub');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-bg-gradient-start to-bg-gradient-end pb-safe-area relative overflow-hidden">
      
      {/* -------------------------------------------------------- */}
      {/* 1. CAPA DE IA (Siempre activa, incluso en emergencia)    */}
      {/* -------------------------------------------------------- */}
      <FaceController onEmergency={() => setEmergencyActive(true)} />

      {/* -------------------------------------------------------- */}
      {/* 2. CAPA DE EMERGENCIA (Overlay con Z-Index 9000)         */}
      {/* -------------------------------------------------------- */}
      {emergencyActive && (
        <div className="fixed inset-0 bg-gradient-to-br from-red-600 to-red-900 z-[9000] flex flex-col items-center justify-center p-4 sm:p-6 md:p-8 text-center animate-pulse-slow">
            <AlertTriangle size={isMobile ? 80 : 120} className="text-white mb-4 sm:mb-6 animate-bounce" />
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white mb-3 sm:mb-4">
              ¡ALERTA ENVIADA!
            </h1>
            <p className="text-white text-base sm:text-lg md:text-xl opacity-90 mb-8 sm:mb-12 max-w-2xl">
              Tus cuidadores han recibido tu ubicación GPS.
              <br className="hidden sm:block" />
              <span className="block mt-2">Llamando al 112 en 5s...</span>
            </p>
            
            {/* Simulación de notificaciones enviadas */}
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 sm:p-6 mb-6 sm:mb-8 max-w-md w-full mx-auto">
              <div className="space-y-3 text-left">
                <div className="flex items-center gap-3 text-white">
                  <Check className="text-green-300" size={20} />
                  <span className="text-sm sm:text-base">📱 María (Mamá) - Notificada</span>
                </div>
                <div className="flex items-center gap-3 text-white">
                  <Check className="text-green-300" size={20} />
                  <span className="text-sm sm:text-base">📱 Juan (Papá) - Notificado</span>
                </div>
                <div className="flex items-center gap-3 text-white">
                  <div className="w-5 h-5 border-2 border-white rounded-full animate-spin" />
                  <span className="text-sm sm:text-base">🚑 Emergencias - Conectando...</span>
                </div>
              </div>
            </div>
            
            <button 
              onClick={() => setEmergencyActive(false)}
              className="bg-white text-red-600 px-6 sm:px-10 py-4 sm:py-5 rounded-full font-bold text-base sm:text-lg md:text-xl shadow-2xl hover:scale-105 active:scale-95 transition-transform min-h-touch"
            >
              FALSA ALARMA (Cancelar)
            </button>
        </div>
      )}

      {/* -------------------------------------------------------- */}
      {/* 3. CONTENIDO DE LA APP (Se oculta si hay emergencia)     */}
      {/* -------------------------------------------------------- */}
      <div className={emergencyActive ? "hidden" : "block"}>

          {/* Vistas de Configuración Inicial */}
          {screen === 'init' && <WelcomeScreen onSelectRole={handleRoleSelection} />}
          {screen === 'patient-setup' && <PatientSetup onComplete={handleSetupComplete} />}
          {screen === 'caregiver-setup' && <CaregiverSetup onComplete={handleSetupComplete} />}

          {/* Vistas Principales (Con Header y Nav) */}
          {!['init', 'patient-setup', 'caregiver-setup'].includes(screen) && (
             <div className="w-full max-w-7xl mx-auto min-h-screen bg-white md:shadow-2xl relative">
                
                {/* Header */}
                <header className="sticky top-0 z-40 bg-gradient-to-r from-roche-blue to-vitality-purple text-white p-4 sm:p-6 shadow-lg">
                  <div className="flex justify-between items-center max-w-6xl mx-auto">
                    <div className="flex items-center gap-3 sm:gap-4">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white rounded-2xl flex items-center justify-center text-xl sm:text-2xl">
                        🧬
                      </div>
                      <div>
                        <h1 className="text-lg sm:text-2xl font-bold">SMA LifeLink</h1>
                        <p className="text-xs sm:text-sm opacity-90">
                          {userRole === 'patient' ? userData?.name : userData?.caregiverName}
                        </p>
                      </div>
                    </div>
                    
                    {/* Navegación Desktop */}
                    {!isMobile && (
                      <nav className="flex gap-2 items-center">
                        <button onClick={() => navigate(userRole === 'patient' ? 'home' : 'carehub')} className={`px-4 py-2 rounded-xl transition-all ${(screen === 'home' || screen === 'carehub') ? 'bg-white/20' : 'hover:bg-white/10'}`}>
                          <Home className="w-5 h-5 inline mr-2" /> Inicio
                        </button>
                        <button onClick={() => navigate('medication')} className={`px-4 py-2 rounded-xl transition-all ${screen === 'medication' ? 'bg-white/20' : 'hover:bg-white/10'}`}>
                          <Pill className="w-5 h-5 inline mr-2" /> Medicación
                        </button>
                        <button onClick={() => navigate('community')} className={`px-4 py-2 rounded-xl transition-all ${screen === 'community' ? 'bg-white/20' : 'hover:bg-white/10'}`}>
                          <Globe className="w-5 h-5 inline mr-2" /> Comunidad
                        </button>
                        <button onClick={() => navigate('profile')} className={`px-4 py-2 rounded-xl transition-all ${screen === 'profile' ? 'bg-white/20' : 'hover:bg-white/10'}`}>
                          <User className="w-5 h-5 inline mr-2" /> Perfil
                        </button>
                        <button onClick={handleLogout} className="px-4 py-2 rounded-xl hover:bg-red-500/20 transition-all">
                          <LogOut className="w-5 h-5" />
                        </button>
                      </nav>
                    )}
                    
                    {/* Logout Móvil */}
                    {isMobile && (
                      <button onClick={handleLogout} className="p-2 rounded-xl hover:bg-white/20 transition-all">
                        <LogOut className="w-5 h-5" />
                      </button>
                    )}
                  </div>
                </header>
                
                {/* Main Content Render */}
                <main className="p-4 sm:p-6 md:p-8 pt-6 pb-20 sm:pb-24 min-h-screen">
                  {screen === 'home' && <PatientHome navigate={navigate} userData={userData} />}
                  {screen === 'breathing' && <BreathingGame navigate={navigate} />}
                  {screen === 'painmap' && <PainMapView navigate={navigate} />}
                  {screen === 'carehub' && <CareHubView navigate={navigate} userRole={userRole} userData={userData} />}
                  {screen === 'medication' && <MedicationView navigate={navigate} />}
                  {screen === 'community' && <CommunityView navigate={navigate} />}
                  {screen === 'socialfeed' && <SocialFeedView navigate={navigate} />}
                  {screen === 'profile' && <ProfileMock navigate={navigate} userData={userData} userRole={userRole} onLogout={handleLogout} />}
                </main>

                {/* Navbar Inferior */}
                <nav className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md border-t border-slate-200 px-2 sm:px-4 py-2 sm:py-3 flex justify-around z-40 shadow-2xl">
                  <NavIcon active={screen === 'home' || screen === 'carehub'} label="Inicio" icon={Home} onClick={() => navigate(userRole === 'patient' ? 'home' : 'carehub')} />
                  <NavIcon active={screen === 'painmap'} label="Mapa Dolor" icon={Activity} onClick={() => navigate('painmap')} />
                  <NavIcon active={screen === 'medication'} label="Medicación" icon={Pill} onClick={() => navigate('medication')} />
                  <NavIcon active={screen === 'community'} label="Comunidad" icon={Globe} onClick={() => navigate('community')} />
                  <NavIcon active={screen === 'profile'} label="Perfil" icon={User} onClick={() => navigate('profile')} />
                </nav>
             </div>
          )}
      </div>
    </div>
  );
}

// --- COMPONENTES AUXILIARES ---

const NavIcon = ({ label, active, icon: Icon, onClick }) => (
  <button
    onClick={onClick}
    className={`flex flex-col items-center justify-center gap-1 px-2 sm:px-3 py-2 rounded-xl transition-all min-w-[60px] ${
      active 
        ? 'text-roche-blue bg-roche-light font-bold' 
        : 'text-slate-500 hover:text-roche-blue hover:bg-slate-50'
    }`}
  >
    {Icon && <Icon size={22} strokeWidth={active ? 2.5 : 2} />}
    <span className="text-[10px] sm:text-xs font-semibold uppercase tracking-wide">
      {label}
    </span>
  </button>
);

// Mock para Medicación
const MedicationMock = ({ navigate }) => (
  <div className="max-w-4xl mx-auto">
    <h2 className="text-2xl sm:text-3xl font-bold mb-6">💊 Mi Medicación</h2>
    <div className="space-y-4">
      <div className="bg-white p-6 rounded-2xl shadow-md border-2 border-growth-green/20">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-growth-green/10 rounded-2xl flex items-center justify-center text-3xl">💊</div>
            <div>
              <h3 className="font-bold text-lg">Nusinersen (Spinraza)</h3>
              <p className="text-gray-600">8:00 AM • Intratecal</p>
            </div>
          </div>
          <input type="checkbox" className="w-8 h-8 accent-growth-green cursor-pointer" />
        </div>
      </div>
      
      <div className="bg-white p-6 rounded-2xl shadow-md border-2 border-roche-blue/20">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-roche-blue/10 rounded-2xl flex items-center justify-center text-3xl">💉</div>
            <div>
              <h3 className="font-bold text-lg">Vitamina D3</h3>
              <p className="text-gray-600">2:00 PM • 2000 UI</p>
            </div>
          </div>
          <input type="checkbox" className="w-8 h-8 accent-roche-blue cursor-pointer" />
        </div>
      </div>
    </div>
    <div className="mt-6">
      <BigButton variant="accent" fullWidth>+ Añadir Medicamento</BigButton>
    </div>
  </div>
);

// Mock para Perfil
const ProfileMock = ({ navigate, userData, userRole, onLogout }) => (
  <div className="max-w-4xl mx-auto">
    <h2 className="text-2xl sm:text-3xl font-bold mb-6">👤 Mi Perfil</h2>
    <div className="bg-white p-6 rounded-2xl shadow-md mb-6">
      <div className="flex items-center gap-4 mb-6">
        <div className="w-20 h-20 bg-gradient-to-br from-roche-blue to-vitality-purple rounded-full flex items-center justify-center text-3xl">
          {userRole === 'patient' ? '👤' : '💙'}
        </div>
        <div>
          <h3 className="font-bold text-xl">
            {userRole === 'patient' ? userData?.name : userData?.caregiverName}
          </h3>
          <p className="text-gray-600">
            {userRole === 'patient' ? 'Paciente' : 'Cuidador'}
          </p>
        </div>
      </div>
      
      {userRole === 'patient' && userData && (
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-gray-50 p-4 rounded-xl">
            <p className="text-sm text-gray-600">Edad</p>
            <p className="text-2xl font-bold">{userData.age} años</p>
          </div>
          <div className="bg-gray-50 p-4 rounded-xl">
            <p className="text-sm text-gray-600">Tipo SMA</p>
            <p className="text-2xl font-bold">Tipo {userData.smaType}</p>
          </div>
          <div className="bg-gray-50 p-4 rounded-xl">
            <p className="text-sm text-gray-600">Peso</p>
            <p className="text-2xl font-bold">{userData.weight} kg</p>
          </div>
          <div className="bg-gray-50 p-4 rounded-xl">
            <p className="text-sm text-gray-600">Altura</p>
            <p className="text-2xl font-bold">{userData.height} cm</p>
          </div>
        </div>
      )}
      
      {userRole === 'caregiver' && userData?.linkedPatient && (
        <div className="bg-blue-50 p-4 rounded-xl">
          <p className="text-sm text-gray-600 mb-2">Paciente vinculado</p>
          <div className="flex items-center gap-3">
            <span className="text-2xl">{userData.linkedPatient.avatar}</span>
            <div>
              <p className="font-bold">{userData.linkedPatient.name}</p>
              <p className="text-sm text-gray-600">@{userData.linkedPatient.username}</p>
            </div>
          </div>
        </div>
      )}
    </div>
    
    <BigButton variant="danger" fullWidth onClick={onLogout}>
      <LogOut className="w-5 h-5 inline mr-2" /> Cerrar Sesión
    </BigButton>
  </div>
);

export default App;