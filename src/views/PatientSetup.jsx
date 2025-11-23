import { useState } from 'react';
import { User, Activity, Ruler, Weight } from 'lucide-react';
import { BigButton } from '../components/BigButton';
import { Card, CardHeader, CardTitle, CardContent } from '../components/Card';

export function PatientSetup({ onComplete }) {
  const [formData, setFormData] = useState({
    name: '',
    age: 25,
    weight: 70,
    height: 170,
    smaType: 2
  });

  const handleSubmit = () => {
    // Guardar en localStorage
    localStorage.setItem('patientData', JSON.stringify(formData));
    onComplete(formData);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-joy-orange/10 to-growth-green/10 p-4 flex items-center justify-center">
      <div className="max-w-3xl w-full">
        <Card variant="orange">
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
              <User className="w-8 h-8" />
              Configuración Inicial
            </CardTitle>
          </CardHeader>
          
          <CardContent>
            <p className="text-gray-600 mb-8">
              Configura tu perfil para personalizar la experiencia
            </p>

            <div className="space-y-8">
              {/* Nombre */}
              <div>
                <label className="block text-lg font-semibold mb-3 flex items-center gap-2">
                  <User className="w-5 h-5" />
                  Tu Nombre
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  placeholder="Ej. María González"
                  className="w-full px-6 py-4 text-xl border-2 border-gray-300 rounded-2xl focus:border-roche-blue focus:outline-none transition-colors"
                />
              </div>

              {/* Edad */}
              <div>
                <label className="block text-lg font-semibold mb-3 flex items-center gap-2 justify-between">
                  <span className="flex items-center gap-2">
                    <Activity className="w-5 h-5" />
                    Edad
                  </span>
                  <span className="text-3xl font-bold text-roche-blue">{formData.age} años</span>
                </label>
                <input
                  type="range"
                  min="1"
                  max="100"
                  value={formData.age}
                  onChange={(e) => setFormData({...formData, age: parseInt(e.target.value)})}
                  className="w-full h-4 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-roche-blue"
                  style={{
                    background: `linear-gradient(to right, #0044CC 0%, #0044CC ${formData.age}%, #e5e7eb ${formData.age}%, #e5e7eb 100%)`
                  }}
                />
              </div>

              {/* Peso */}
              <div>
                <label className="block text-lg font-semibold mb-3 flex items-center gap-2 justify-between">
                  <span className="flex items-center gap-2">
                    <Weight className="w-5 h-5" />
                    Peso
                  </span>
                  <span className="text-3xl font-bold text-growth-green">{formData.weight} kg</span>
                </label>
                <input
                  type="range"
                  min="10"
                  max="150"
                  value={formData.weight}
                  onChange={(e) => setFormData({...formData, weight: parseInt(e.target.value)})}
                  className="w-full h-4 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-growth-green"
                  style={{
                    background: `linear-gradient(to right, #06D6A0 0%, #06D6A0 ${(formData.weight-10)/1.4}%, #e5e7eb ${(formData.weight-10)/1.4}%, #e5e7eb 100%)`
                  }}
                />
              </div>

              {/* Altura */}
              <div>
                <label className="block text-lg font-semibold mb-3 flex items-center gap-2 justify-between">
                  <span className="flex items-center gap-2">
                    <Ruler className="w-5 h-5" />
                    Altura
                  </span>
                  <span className="text-3xl font-bold text-vitality-purple">{formData.height} cm</span>
                </label>
                <input
                  type="range"
                  min="50"
                  max="220"
                  value={formData.height}
                  onChange={(e) => setFormData({...formData, height: parseInt(e.target.value)})}
                  className="w-full h-4 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-vitality-purple"
                  style={{
                    background: `linear-gradient(to right, #6A4C93 0%, #6A4C93 ${(formData.height-50)/1.7}%, #e5e7eb ${(formData.height-50)/1.7}%, #e5e7eb 100%)`
                  }}
                />
              </div>

              {/* Tipo de SMA */}
              <div>
                <label className="block text-lg font-semibold mb-4">
                  Tipo de SMA
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {[1, 2, 3, 4].map((type) => (
                    <button
                      key={type}
                      onClick={() => setFormData({...formData, smaType: type})}
                      className={`
                        py-6 px-4 rounded-2xl font-bold text-2xl transition-all
                        ${formData.smaType === type
                          ? 'bg-roche-blue text-white shadow-lg scale-105'
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                        }
                      `}
                    >
                      Tipo {type}
                    </button>
                  ))}
                </div>
                <p className="text-sm text-gray-500 mt-3">
                  Esto nos ayuda a personalizar recomendaciones y seguimiento
                </p>
              </div>
            </div>

            {/* Botón Guardar */}
            <div className="mt-10">
              <BigButton
                variant="success"
                onClick={handleSubmit}
                fullWidth
                disabled={!formData.name.trim()}
              >
                Continuar
              </BigButton>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
