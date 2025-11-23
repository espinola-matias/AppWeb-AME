import { useState } from 'react';
import { Search, User, Link2, CheckCircle } from 'lucide-react';
import { BigButton } from '../components/BigButton';
import { Card, CardHeader, CardTitle, CardContent } from '../components/Card';

// Mock data de pacientes
const mockPatients = [
  { id: 1, username: 'maria_gonzalez', name: 'María González', age: 28, smaType: 2, avatar: '👩' },
  { id: 2, username: 'carlos_m', name: 'Carlos Martínez', age: 35, smaType: 3, avatar: '👨' },
  { id: 3, username: 'ana_lopez', name: 'Ana López', age: 22, smaType: 1, avatar: '👧' },
  { id: 4, username: 'juan_perez', name: 'Juan Pérez', age: 41, smaType: 4, avatar: '🧑' },
  { id: 5, username: 'lucia_s', name: 'Lucía Sánchez', age: 19, smaType: 2, avatar: '👩‍🦱' },
];

export function CaregiverSetup({ onComplete }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [caregiverName, setCaregiverName] = useState('');

  const filteredPatients = mockPatients.filter(p => 
    p.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleLink = () => {
    if (selectedPatient && caregiverName.trim()) {
      const linkData = {
        caregiverName,
        linkedPatient: selectedPatient
      };
      localStorage.setItem('caregiverData', JSON.stringify(linkData));
      onComplete(linkData);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-vitality-purple/10 to-roche-blue/10 p-4 flex items-center justify-center">
      <div className="max-w-3xl w-full">
        <Card variant="purple">
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
              <Link2 className="w-8 h-8" />
              Vincular con Paciente
            </CardTitle>
          </CardHeader>
          
          <CardContent>
            <p className="text-gray-600 mb-8">
              Busca al paciente que vas a cuidar para vincularte
            </p>

            {/* Nombre del Cuidador */}
            <div className="mb-8">
              <label className="block text-lg font-semibold mb-3 flex items-center gap-2">
                <User className="w-5 h-5" />
                Tu Nombre (Cuidador)
              </label>
              <input
                type="text"
                value={caregiverName}
                onChange={(e) => setCaregiverName(e.target.value)}
                placeholder="Ej. Dr. Pedro Ramírez"
                className="w-full px-6 py-4 text-xl border-2 border-gray-300 rounded-2xl focus:border-vitality-purple focus:outline-none transition-colors"
              />
            </div>

            {/* Búsqueda */}
            <div className="relative mb-6">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-6 h-6 text-gray-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Buscar por nombre de usuario o nombre completo"
                className="w-full pl-14 pr-6 py-4 text-lg border-2 border-gray-300 rounded-2xl focus:border-roche-blue focus:outline-none transition-colors"
              />
            </div>

            {/* Lista de Pacientes */}
            <div className="space-y-3 max-h-96 overflow-y-auto mb-8">
              {filteredPatients.length === 0 ? (
                <div className="text-center py-12 text-gray-400">
                  <Search className="w-16 h-16 mx-auto mb-4 opacity-50" />
                  <p className="text-lg">No se encontraron pacientes</p>
                  <p className="text-sm mt-2">Intenta con otro término de búsqueda</p>
                </div>
              ) : (
                filteredPatients.map((patient) => (
                  <button
                    key={patient.id}
                    onClick={() => setSelectedPatient(patient)}
                    className={`
                      w-full p-4 rounded-2xl border-2 transition-all text-left
                      ${selectedPatient?.id === patient.id
                        ? 'border-vitality-purple bg-vitality-purple/10 shadow-lg'
                        : 'border-gray-200 hover:border-gray-300 bg-white'
                      }
                    `}
                  >
                    <div className="flex items-center gap-4">
                      <div className="text-4xl">{patient.avatar}</div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <h3 className="font-bold text-lg">{patient.name}</h3>
                          {selectedPatient?.id === patient.id && (
                            <CheckCircle className="w-5 h-5 text-vitality-purple" />
                          )}
                        </div>
                        <p className="text-gray-600">@{patient.username}</p>
                        <div className="flex gap-3 mt-2 text-sm text-gray-500">
                          <span>{patient.age} años</span>
                          <span>•</span>
                          <span>SMA Tipo {patient.smaType}</span>
                        </div>
                      </div>
                    </div>
                  </button>
                ))
              )}
            </div>

            {/* Botón Vincular */}
            <BigButton
              variant="success"
              onClick={handleLink}
              fullWidth
              disabled={!selectedPatient || !caregiverName.trim()}
            >
              {selectedPatient 
                ? `Vincularme con ${selectedPatient.name}`
                : 'Selecciona un paciente'
              }
            </BigButton>

            {selectedPatient && (
              <p className="text-sm text-gray-500 mt-4 text-center">
                Se enviará una notificación a {selectedPatient.name} para confirmar
              </p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
