
import React, { useState, useEffect } from 'react';
import { Navigation } from './components/Navigation';
import { 
  Activity, 
  Users, 
  Calendar, 
  TrendingUp, 
  AlertTriangle,
  ChevronRight,
  CheckCircle2,
  Clock,
  Dumbbell,
  Moon,
  HeartPulse,
  // Fix: Added missing Zap icon import
  Zap
} from 'lucide-react';

// Tipagem Simples para o Protótipo
interface Student {
  id: string;
  name: string;
  status: 'active' | 'warning' | 'critical';
  lastTraining: string;
  hrv: number;
  sleepScore: number;
  readiness: number;
}

const App: React.FC = () => {
  const [activeSection, setActiveSection] = useState('dashboard');
  const [students] = useState<Student[]>([
    { id: '1', name: 'Ricardo Silva', status: 'active', lastTraining: 'Hoje, 08:00', hrv: 72, sleepScore: 85, readiness: 92 },
    { id: '2', name: 'Ana Souza', status: 'warning', lastTraining: 'Ontem, 18:30', hrv: 58, sleepScore: 62, readiness: 65 },
    { id: '3', name: 'Carlos Lima', status: 'critical', lastTraining: 'Há 2 dias', hrv: 42, sleepScore: 45, readiness: 38 },
  ]);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 selection:bg-teal-500/30">
      <Navigation activeSection={activeSection} onNavigate={setActiveSection} />

      <main className="max-w-7xl mx-auto px-4 pt-28 pb-20">
        {activeSection === 'dashboard' ? (
          <div className="space-y-8 animate-in fade-in duration-700">
            {/* Header de Boas Vindas */}
            <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h1 className="text-3xl font-black tracking-tight">Dashboard <span className="text-teal-400">Motta's</span></h1>
                <p className="text-slate-500 text-sm">Bem-vindo de volta, Coach. Aqui está o status do seu time.</p>
              </div>
              <div className="flex items-center gap-3">
                <div className="bg-slate-900 border border-slate-800 p-3 rounded-xl flex items-center gap-4">
                  <div className="flex flex-col items-end">
                    <span className="text-[10px] text-slate-500 font-bold uppercase">Alunos Ativos</span>
                    <span className="text-xl font-black text-teal-400">24</span>
                  </div>
                  <Users className="w-8 h-8 text-teal-500/50" />
                </div>
              </div>
            </header>

            {/* Grid Principal */}
            <div className="grid lg:grid-cols-3 gap-8">
              
              {/* Coluna de Alertas Adaptativos */}
              <div className="lg:col-span-2 space-y-6">
                <div className="bg-slate-900/50 border border-slate-800 rounded-3xl p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-lg font-bold flex items-center gap-2">
                      <Activity className="w-5 h-5 text-teal-400" />
                      Análise de Prontidão (Bio-Feedback)
                    </h2>
                    <span className="text-xs text-slate-500 font-medium">Últimas 24h</span>
                  </div>

                  <div className="space-y-4">
                    {students.map(student => (
                      <StudentCard key={student.id} student={student} />
                    ))}
                  </div>
                </div>

                {/* Simulador de Carga Adaptativa (POC) */}
                <AdaptiveSimulator />
              </div>

              {/* Sidebar de Atalhos e Calendário */}
              <div className="space-y-6">
                <div className="bg-teal-500 rounded-3xl p-6 text-slate-950">
                  <h3 className="font-black text-xl mb-2 italic">MOTTA'S TIP</h3>
                  <p className="text-sm font-medium leading-tight opacity-80">
                    O aluno Carlos Lima apresenta queda de 30% no HRV. O sistema recomenda um treino regenerativo hoje.
                  </p>
                  <button className="mt-4 w-full bg-slate-950 text-white text-xs font-bold py-3 rounded-xl hover:bg-slate-900 transition-colors">
                    Aplicar Deload Automático
                  </button>
                </div>

                <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6">
                  <h3 className="font-bold mb-4 flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-teal-400" />
                    Próximas Renovações
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 bg-slate-950/50 rounded-xl border border-slate-800">
                      <span className="text-sm font-medium">Mariana Costa</span>
                      <span className="text-xs text-teal-400 font-bold">Hoje</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-slate-950/50 rounded-xl border border-slate-800">
                      <span className="text-sm font-medium">Pedro Santos</span>
                      <span className="text-xs text-slate-500 font-bold">Amanhã</span>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        ) : (
          <div className="flex items-center justify-center h-64 text-slate-500 italic">
            Área em desenvolvimento...
          </div>
        )}
      </main>
    </div>
  );
};

// Componente: Card de Aluno com Bio-Feedback
const StudentCard: React.FC<{ student: Student }> = ({ student }) => {
  const statusColors = {
    active: 'text-teal-400 bg-teal-400/10',
    warning: 'text-yellow-400 bg-yellow-400/10',
    critical: 'text-red-400 bg-red-400/10'
  };

  return (
    <div className="group bg-slate-950/40 border border-slate-800/50 hover:border-teal-500/30 p-4 rounded-2xl transition-all flex items-center justify-between">
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 bg-slate-800 rounded-full flex items-center justify-center font-bold text-slate-500 group-hover:text-teal-400 transition-colors">
          {student.name.charAt(0)}
        </div>
        <div>
          <h4 className="font-bold text-sm">{student.name}</h4>
          <div className="flex items-center gap-3 mt-1">
             <div className="flex items-center gap-1 text-[10px] text-slate-500">
               <Clock className="w-3 h-3" /> {student.lastTraining}
             </div>
             <span className={`text-[9px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider ${statusColors[student.status]}`}>
               {student.status === 'active' ? 'Pronto' : student.status === 'warning' ? 'Atenção' : 'Recuperar'}
             </span>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-6">
        <div className="hidden md:flex items-center gap-4">
          <div className="text-center">
            <div className="text-[10px] text-slate-500 uppercase font-bold">HRV</div>
            <div className="text-sm font-black">{student.hrv}ms</div>
          </div>
          <div className="text-center">
            <div className="text-[10px] text-slate-500 uppercase font-bold">Sono</div>
            <div className="text-sm font-black">{student.sleepScore}%</div>
          </div>
        </div>
        <div className="h-10 w-10 flex flex-col items-center justify-center bg-slate-900 border border-slate-800 rounded-lg">
          <span className="text-[10px] font-bold text-teal-400">{student.readiness}%</span>
          <div className="w-6 h-1 bg-slate-800 mt-1 rounded-full overflow-hidden">
             <div className="bg-teal-400 h-full" style={{ width: `${student.readiness}%` }}></div>
          </div>
        </div>
        <ChevronRight className="w-5 h-5 text-slate-700 group-hover:text-teal-400 transition-colors" />
      </div>
    </div>
  );
};

// Componente: Simulador da Funcionalidade Matadora
const AdaptiveSimulator: React.FC = () => {
  const [hrv, setHrv] = useState(65);
  const [sleep, setSleep] = useState(70);
  const [loadAdjustment, setLoadAdjustment] = useState(100);

  useEffect(() => {
    // Lógica Simplificada do Algoritmo Motta's Team
    let adjustment = 100;
    const readiness = (hrv * 0.6) + (sleep * 0.4);

    if (readiness < 40) adjustment = 60;
    else if (readiness < 60) adjustment = 85;
    else if (readiness > 85) adjustment = 110;

    setLoadAdjustment(adjustment);
  }, [hrv, sleep]);

  return (
    <div className="bg-slate-900/50 border border-slate-800 rounded-3xl p-8 space-y-8">
      <div>
        <h2 className="text-xl font-black text-white flex items-center gap-2">
          <Zap className="w-5 h-5 text-teal-400 fill-teal-400/20" />
          Simulador Bio-Feedback
        </h2>
        <p className="text-xs text-slate-500 mt-1">Ajuste os dados para ver o algoritmo do Motta's Team em ação.</p>
      </div>

      <div className="grid md:grid-cols-2 gap-10">
        <div className="space-y-6">
          <div className="space-y-3">
            <div className="flex justify-between text-xs font-bold uppercase tracking-widest text-slate-400">
              <label className="flex items-center gap-2"><HeartPulse className="w-3 h-3 text-red-500" /> HRV (ms)</label>
              <span className="text-teal-400">{hrv}ms</span>
            </div>
            <input 
              type="range" min="20" max="120" value={hrv} 
              onChange={(e) => setHrv(Number(e.target.value))}
              className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-teal-500"
            />
          </div>

          <div className="space-y-3">
            <div className="flex justify-between text-xs font-bold uppercase tracking-widest text-slate-400">
              <label className="flex items-center gap-2"><Moon className="w-3 h-3 text-blue-400" /> Qualidade do Sono</label>
              <span className="text-teal-400">{sleep}%</span>
            </div>
            <input 
              type="range" min="0" max="100" value={sleep} 
              onChange={(e) => setSleep(Number(e.target.value))}
              className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-teal-500"
            />
          </div>
        </div>

        <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6 flex flex-col items-center justify-center text-center space-y-4">
          <div className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Ajuste de Intensidade</div>
          <div className={`text-5xl font-black transition-all ${loadAdjustment < 100 ? 'text-yellow-500' : loadAdjustment > 100 ? 'text-teal-400' : 'text-white'}`}>
            {loadAdjustment}%
          </div>
          <div className="flex items-center gap-2 text-xs font-medium text-slate-400">
            <Dumbbell className="w-4 h-4" />
            {loadAdjustment < 100 ? 'Recomendado: Carga Reduzida' : loadAdjustment > 100 ? 'Recomendado: Overload' : 'Manter Planejado'}
          </div>
          <div className="w-full h-1 bg-slate-900 rounded-full mt-2">
             <div className={`h-full transition-all duration-500 ${loadAdjustment < 100 ? 'bg-yellow-500' : 'bg-teal-400'}`} style={{ width: `${loadAdjustment}%` }}></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
