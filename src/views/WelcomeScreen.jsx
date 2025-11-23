import { User, HeartPulse } from 'lucide-react';
import { BigButton } from '../components/BigButton';

export function WelcomeScreen({ onSelectRole }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-roche-blue to-vitality-purple flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        {/* Logo y Título */}
        <div className="text-center mb-12 animate-fade-in">
          <div className="w-24 h-24 mx-auto mb-6 bg-white rounded-full flex items-center justify-center shadow-xl">
            <HeartPulse className="w-12 h-12 text-roche-blue" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            SMA LifeLink
          </h1>
          <p className="text-xl text-white/90">
            Tu compañero digital para vivir mejor con SMA
          </p>
        </div>

        {/* Selección de Rol */}
        <div className="bg-white/95 backdrop-blur-sm rounded-3xl p-8 shadow-2xl animate-slide-in">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
            ¿Cómo vas a usar la aplicación?
          </h2>
          
          <div className="space-y-4">
            <BigButton
              variant="primary"
              icon={User}
              onClick={() => onSelectRole('patient')}
              fullWidth
            >
              Soy Paciente
            </BigButton>

            <BigButton
              variant="accent"
              icon={HeartPulse}
              onClick={() => onSelectRole('caregiver')}
              fullWidth
            >
              Soy Cuidador
            </BigButton>
          </div>

          <p className="text-sm text-gray-500 mt-6 text-center">
            Podrás cambiar esto después en la configuración
          </p>
        </div>

        {/* Footer */}
        <div className="text-center mt-8 text-white/80 text-sm">
          <p>Desarrollado con ❤️ para la comunidad SMA</p>
          <p className="mt-2">En colaboración con Roche</p>
        </div>
      </div>
    </div>
  );
}
