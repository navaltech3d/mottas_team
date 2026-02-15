
import React, { useState, useEffect, useRef } from 'react';
import { Navigation } from './components/Navigation';
import { createClient } from '@supabase/supabase-js';
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
  Zap,
  LogIn,
  UserPlus,
  ArrowRight,
  Play,
  Info,
  BrainCircuit,
  Settings,
  Plus,
  Video,
  Trash2,
  Upload,
  X,
  Loader2
} from 'lucide-react';

// --- Configuração Supabase ---
const supabaseUrl = 'https://zulnoaudbozedbpprkmh.supabase.co';
const supabaseKey = 'sb_publishable_wQzo7nEzrbAkxNYG0Js9Ew_9iT2gNp1';
const supabase = createClient(supabaseUrl, supabaseKey);

// --- Tipagens ---

type UserRole = 'personal' | 'student';

interface User {
  id: string;
  name: string;
  role: UserRole;
  email: string;
}

interface Exercise {
  id: string;
  name: string;
  baseWeight: number;
  reps: string;
  videoUrl?: string;
}

interface StudentStatus extends User {
  status: 'active' | 'warning' | 'critical';
  readiness: number;
  lastCheckin: string;
}

// --- App Component ---

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [view, setView] = useState<'landing' | 'login' | 'signup' | 'dashboard' | 'checkin' | 'workout' | 'biblioteca' | 'alunos'>('landing');
  const [readinessFactor, setReadinessFactor] = useState(1.0);
  const [checkinDone, setCheckinDone] = useState(false);
  const [exercises, setExercises] = useState<Exercise[]>([]);

  // Carregar exercícios iniciais (Mocks + Futuros reais do Supabase)
  useEffect(() => {
    const initialExercises: Exercise[] = [
      { id: '1', name: 'Agachamento Livre', baseWeight: 80, reps: '4x8', videoUrl: 'https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4' },
      { id: '2', name: 'Supino Reto', baseWeight: 60, reps: '3x10', videoUrl: '' },
      { id: '3', name: 'Levantamento Terra', baseWeight: 100, reps: '3x5', videoUrl: '' }
    ];
    setExercises(initialExercises);
  }, []);

  const handleLogin = (role: UserRole) => {
    setUser({
      id: role === 'personal' ? 'p1' : 's1',
      name: role === 'personal' ? 'Motta Coach' : 'Ricardo Silva',
      role,
      email: `${role}@mottasteam.com`
    });
    setView('dashboard');
  };

  const handleLogout = () => {
    setUser(null);
    setView('landing');
    setCheckinDone(false);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 selection:bg-teal-500/30 font-sans">
      <Navigation 
        activeSection={view} 
        onNavigate={(v) => setView(v as any)} 
        isLoggedIn={!!user}
        userRole={user?.role}
        onLogout={handleLogout}
      />

      <main className="max-w-7xl mx-auto px-4 pt-28 pb-20">
        {view === 'landing' && <LandingView onStart={() => setView('login')} />}
        {view === 'login' && <AuthForm type="login" onAuth={handleLogin} />}
        {view === 'signup' && <AuthForm type="signup" onAuth={handleLogin} />}
        
        {user?.role === 'personal' && (
          <>
            {view === 'dashboard' && <PersonalDashboard students={MOCK_STUDENTS} />}
            {view === 'biblioteca' && (
              <LibraryView 
                exercises={exercises} 
                onUpdate={setExercises} 
              />
            )}
            {view === 'alunos' && <div className="p-10 text-center text-slate-500 italic">Gestão de alunos em desenvolvimento...</div>}
          </>
        )}

        {user?.role === 'student' && (
          <>
            {view === 'dashboard' && (
              <StudentDashboard 
                checkinDone={checkinDone} 
                onStartCheckin={() => setView('checkin')} 
                onStartWorkout={() => setView('workout')}
                readinessFactor={readinessFactor}
              />
            )}
            {view === 'checkin' && (
              <BioCheckin 
                onComplete={(factor) => {
                  setReadinessFactor(factor);
                  setCheckinDone(true);
                  setView('dashboard');
                }} 
              />
            )}
            {view === 'workout' && (
              <WorkoutView 
                exercises={exercises} 
                factor={readinessFactor} 
                onBack={() => setView('dashboard')}
              />
            )}
          </>
        )}
      </main>
    </div>
  );
};

// --- Mocks Iniciais ---
const MOCK_STUDENTS: StudentStatus[] = [
  { id: 's1', name: 'Ricardo Silva', role: 'student', email: 'ricardo@email.com', status: 'active', readiness: 92, lastCheckin: '08:00' },
  { id: 's2', name: 'Ana Souza', role: 'student', email: 'ana@email.com', status: 'warning', readiness: 58, lastCheckin: '07:15' },
  { id: 's3', name: 'Carlos Lima', role: 'student', email: 'carlos@email.com', status: 'critical', readiness: 32, lastCheckin: '09:30' }
];

// --- Sub-Views ---

const LandingView: React.FC<{ onStart: () => void }> = ({ onStart }) => (
  <div className="text-center py-20 space-y-10 animate-in fade-in slide-in-from-bottom-10 duration-1000">
    <div className="inline-flex items-center gap-2 bg-teal-500/10 border border-teal-500/20 px-6 py-2 rounded-full text-teal-400 text-sm font-bold tracking-widest uppercase">
      <BrainCircuit className="w-4 h-4" /> Bio-Connected Fitness
    </div>
    <h1 className="text-6xl md:text-8xl font-black tracking-tighter">
      TREINE COM <br /> <span className="text-teal-400">INTELIGÊNCIA.</span>
    </h1>
    <p className="text-slate-400 max-w-2xl mx-auto text-lg leading-relaxed">
      A primeira plataforma que ajusta sua carga de treino baseada na sua recuperação real. 
      Pare de chutar, comece a medir.
    </p>
    <button 
      onClick={onStart}
      className="bg-teal-500 hover:bg-teal-400 text-slate-950 font-black px-12 py-5 rounded-2xl text-xl transition-all shadow-xl shadow-teal-500/20 flex items-center gap-3 mx-auto group"
    >
      Acessar Portal <ArrowRight className="group-hover:translate-x-1 transition-transform" />
    </button>
  </div>
);

const AuthForm: React.FC<{ type: 'login' | 'signup', onAuth: (role: UserRole) => void }> = ({ type, onAuth }) => (
  <div className="max-w-md mx-auto bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-2xl animate-in zoom-in-95 duration-500">
    <h2 className="text-2xl font-black mb-6 text-center">
      {type === 'login' ? 'Bem-vindo de volta' : 'Crie sua conta no Motta\'s'}
    </h2>
    <div className="space-y-4">
      <div className="space-y-2">
        <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">E-mail</label>
        <input type="email" placeholder="seu@email.com" className="w-full bg-slate-950 border border-slate-800 rounded-xl p-4 focus:outline-none focus:border-teal-500 transition-colors" />
      </div>
      <div className="space-y-2">
        <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Senha</label>
        <input type="password" placeholder="••••••••" className="w-full bg-slate-950 border border-slate-800 rounded-xl p-4 focus:outline-none focus:border-teal-500 transition-colors" />
      </div>
      
      <div className="pt-4 grid grid-cols-2 gap-4">
        <button 
          onClick={() => onAuth('student')}
          className="bg-slate-800 hover:bg-slate-700 text-white font-bold py-4 rounded-xl transition-all text-sm flex items-center justify-center gap-2"
        >
          Sou Aluno
        </button>
        <button 
          onClick={() => onAuth('personal')}
          className="bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold py-4 rounded-xl transition-all text-sm flex items-center justify-center gap-2 shadow-lg shadow-teal-500/10"
        >
          Sou Personal
        </button>
      </div>
    </div>
  </div>
);

// --- Library View (Personal) ---

const LibraryView: React.FC<{ exercises: Exercise[], onUpdate: (ex: Exercise[]) => void }> = ({ exercises, onUpdate }) => {
  const [showModal, setShowModal] = useState(false);

  const deleteExercise = (id: string) => {
    onUpdate(exercises.filter(ex => ex.id !== id));
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-black">Biblioteca de Exercícios</h2>
          <p className="text-slate-500">Seu repositório de métodos e vídeos para prescrição.</p>
        </div>
        <button 
          onClick={() => setShowModal(true)}
          className="bg-teal-500 text-slate-950 font-black px-6 py-3 rounded-xl flex items-center gap-2 hover:bg-teal-400 transition-all shadow-lg shadow-teal-500/20"
        >
          <Plus className="w-5 h-5" /> Novo Exercício
        </button>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {exercises.map(ex => (
          <div key={ex.id} className="bg-slate-900 border border-slate-800 rounded-3xl p-6 hover:border-teal-500/30 transition-all flex flex-col justify-between group">
            <div>
              <div className="flex justify-between items-start mb-4">
                <div className="w-12 h-12 bg-slate-800 rounded-xl flex items-center justify-center text-teal-400">
                  <Dumbbell className="w-6 h-6" />
                </div>
                <button 
                  onClick={() => deleteExercise(ex.id)}
                  className="text-slate-600 hover:text-red-400 transition-colors p-2"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
              <h4 className="text-xl font-bold mb-1">{ex.name}</h4>
              <p className="text-slate-500 text-sm mb-4">{ex.reps} • Carga base: {ex.baseWeight}kg</p>
            </div>
            
            {ex.videoUrl ? (
              <div className="mt-4 bg-slate-950 rounded-2xl p-4 flex items-center gap-3 border border-teal-500/10 group-hover:border-teal-500/30 transition-all">
                <div className="w-8 h-8 bg-teal-500/20 rounded-lg flex items-center justify-center">
                  <Video className="w-4 h-4 text-teal-400" />
                </div>
                <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Vídeo de Execução</span>
              </div>
            ) : (
              <div className="mt-4 bg-slate-950 rounded-2xl p-4 flex items-center gap-3 border border-slate-800 italic text-slate-600 text-xs">
                Sem vídeo cadastrado
              </div>
            )}
          </div>
        ))}
      </div>

      {showModal && (
        <ExerciseUploadModal 
          onClose={() => setShowModal(false)} 
          onSave={(newEx) => {
            onUpdate([...exercises, newEx]);
            setShowModal(false);
          }} 
        />
      )}
    </div>
  );
};

const ExerciseUploadModal: React.FC<{ onClose: () => void, onSave: (ex: Exercise) => void }> = ({ onClose, onSave }) => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({ name: '', weight: 0, reps: '3x10' });
  const [file, setFile] = useState<File | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      let videoUrl = '';
      if (file) {
        // Lógica real para o Supabase Storage
        const fileExt = file.name.split('.').pop();
        const fileName = `${Math.random()}.${fileExt}`;
        const filePath = `exercises/${fileName}`;

        const { error: uploadError, data } = await supabase.storage
          .from('exercise-videos')
          .upload(filePath, file);

        if (uploadError) throw uploadError;

        const { data: { publicUrl } } = supabase.storage
          .from('exercise-videos')
          .getPublicUrl(filePath);
        
        videoUrl = publicUrl;
      }

      onSave({
        id: Math.random().toString(36).substr(2, 9),
        name: formData.name,
        baseWeight: formData.weight,
        reps: formData.reps,
        videoUrl
      });
    } catch (err) {
      console.error('Erro no upload:', err);
      // Fallback para simulação se falhar (sem bucket configurado ainda)
      onSave({
        id: Math.random().toString(36).substr(2, 9),
        name: formData.name,
        baseWeight: formData.weight,
        reps: formData.reps,
        videoUrl: file ? URL.createObjectURL(file) : ''
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-slate-950/90 backdrop-blur-md z-[100] flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-800 w-full max-w-lg rounded-3xl p-8 space-y-6 shadow-2xl animate-in zoom-in-95">
        <div className="flex justify-between items-center">
          <h3 className="text-2xl font-black">Novo Exercício</h3>
          <button onClick={onClose} className="text-slate-500 hover:text-white"><X /></button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1">
            <label className="text-[10px] font-black uppercase text-slate-500 tracking-widest">Nome do Exercício</label>
            <input required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full bg-slate-950 border border-slate-800 rounded-xl p-4 focus:border-teal-500 outline-none" placeholder="Ex: Leg Press 45" />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-[10px] font-black uppercase text-slate-500 tracking-widest">Carga Base (KG)</label>
              <input type="number" required value={formData.weight} onChange={e => setFormData({...formData, weight: Number(e.target.value)})} className="w-full bg-slate-950 border border-slate-800 rounded-xl p-4 focus:border-teal-500 outline-none" />
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-black uppercase text-slate-500 tracking-widest">Séries/Reps</label>
              <input required value={formData.reps} onChange={e => setFormData({...formData, reps: e.target.value})} className="w-full bg-slate-950 border border-slate-800 rounded-xl p-4 focus:border-teal-500 outline-none" placeholder="Ex: 3x12" />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-[10px] font-black uppercase text-slate-500 tracking-widest">Vídeo de Execução (.mp4)</label>
            <div className="relative h-32 bg-slate-950 border-2 border-dashed border-slate-800 rounded-2xl flex flex-col items-center justify-center gap-2 hover:border-teal-500 transition-colors cursor-pointer group">
              <input type="file" accept="video/mp4" onChange={e => setFile(e.target.files?.[0] || null)} className="absolute inset-0 opacity-0 cursor-pointer" />
              <Upload className={`w-8 h-8 ${file ? 'text-teal-400' : 'text-slate-600 group-hover:text-teal-400'}`} />
              <span className="text-xs text-slate-500 font-bold">{file ? file.name : 'Clique para selecionar arquivo'}</span>
            </div>
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-teal-500 text-slate-950 font-black py-4 rounded-xl flex items-center justify-center gap-2 hover:bg-teal-400 transition-all disabled:opacity-50"
          >
            {loading ? <Loader2 className="animate-spin" /> : 'Salvar Exercício'}
          </button>
        </form>
      </div>
    </div>
  );
};

// --- Personal Dashboard ---

const PersonalDashboard: React.FC<{ students: StudentStatus[] }> = ({ students }) => (
  <div className="space-y-10 animate-in fade-in duration-700">
    <header className="flex flex-col md:flex-row md:items-center justify-between gap-6">
      <div>
        <h1 className="text-4xl font-black tracking-tight">Motta's <span className="text-teal-400">Control Panel</span></h1>
        <p className="text-slate-500">Gestão biológica em tempo real dos seus atletas.</p>
      </div>
      <div className="flex gap-4">
        <button className="bg-teal-500 text-slate-950 font-black px-6 py-3 rounded-xl text-sm flex items-center gap-2 hover:bg-teal-400 transition-all">
          <UserPlus className="w-4 h-4" /> Novo Aluno
        </button>
      </div>
    </header>

    <div className="grid lg:grid-cols-4 gap-6">
       <StatCard label="Faturamento Mensal" value="R$ 14.200" icon={<TrendingUp />} trend="+12%" />
       <StatCard label="Alunos Totais" value="24" icon={<Users />} trend="+2 este mês" />
       <StatCard label="Taxa de Retenção" value="98%" icon={<Activity />} trend="Estável" />
       <StatCard label="Alertas Hoje" value="2" icon={<AlertTriangle />} color="text-red-400" />
    </div>

    <div className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl">
      <div className="bg-slate-800/50 px-8 py-5 border-b border-slate-800 flex justify-between items-center">
        <h3 className="font-bold flex items-center gap-2"><Activity className="w-4 h-4 text-teal-400" /> Prontidão do Time</h3>
        <span className="text-[10px] text-slate-500 font-bold uppercase">Última Atualização: Agora</span>
      </div>
      <div className="p-4 md:p-8 space-y-4">
        {students.map(student => (
          <StudentControlCard key={student.id} student={student} />
        ))}
      </div>
    </div>
  </div>
);

const StatCard: React.FC<{ label: string, value: string, icon: React.ReactNode, trend?: string, color?: string }> = ({ label, value, icon, trend, color }) => (
  <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl space-y-3 hover:border-teal-500/30 transition-all">
    <div className="flex items-center justify-between">
       <div className="text-teal-500/50">{icon}</div>
       {trend && <span className="text-[10px] bg-teal-500/10 text-teal-400 px-2 py-1 rounded-full font-bold">{trend}</span>}
    </div>
    <div>
      <div className="text-xs text-slate-500 font-bold uppercase tracking-widest">{label}</div>
      <div className={`text-2xl font-black mt-1 ${color || 'text-white'}`}>{value}</div>
    </div>
  </div>
);

const StudentControlCard: React.FC<{ student: StudentStatus }> = ({ student }) => {
  const statusConfig = {
    active: { color: 'bg-teal-500', shadow: 'shadow-teal-500/20', text: 'Excelente' },
    warning: { color: 'bg-yellow-500', shadow: 'shadow-yellow-500/20', text: 'Atenção' },
    critical: { color: 'bg-red-500', shadow: 'shadow-red-500/20', text: 'Intervir' }
  };

  const { color, shadow, text } = statusConfig[student.status];

  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 p-6 bg-slate-950/50 border border-slate-800/50 rounded-2xl hover:border-slate-700 transition-all group">
      <div className="flex items-center gap-4">
        <div className={`w-3 h-12 rounded-full ${color} ${shadow} shadow-lg transition-all group-hover:scale-y-110`}></div>
        <div>
          <h4 className="font-black text-lg">{student.name}</h4>
          <p className="text-xs text-slate-500 font-bold uppercase tracking-tight">Check-in hoje às {student.lastCheckin}</p>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-8">
        <div className="text-center">
          <div className="text-[10px] text-slate-500 font-bold uppercase mb-1">Prontidão</div>
          <div className="text-lg font-black">{student.readiness}%</div>
        </div>
        <div className="text-center min-w-[80px]">
          <div className="text-[10px] text-slate-500 font-bold uppercase mb-1">Status Bio</div>
          <div className={`text-xs font-bold uppercase tracking-widest ${student.status === 'active' ? 'text-teal-400' : student.status === 'warning' ? 'text-yellow-500' : 'text-red-400'}`}>
            {text}
          </div>
        </div>
        <button className="bg-slate-900 border border-slate-800 hover:border-teal-500 text-white font-bold px-5 py-3 rounded-xl text-xs transition-all flex items-center gap-2 group-hover:bg-slate-800">
          Ver Planilha <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

// --- Student Components ---

const StudentDashboard: React.FC<{ checkinDone: boolean, onStartCheckin: () => void, onStartWorkout: () => void, readinessFactor: number }> = ({ checkinDone, onStartCheckin, onStartWorkout, readinessFactor }) => (
  <div className="space-y-8 animate-in fade-in duration-700">
    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 flex flex-col md:flex-row items-center justify-between gap-6">
      <div className="space-y-2">
        <h2 className="text-3xl font-black">Olá, Ricardo! 👋</h2>
        <p className="text-slate-500">Pronto para o treino de hoje? Sua bio-conexão está ativa.</p>
      </div>
      {!checkinDone ? (
        <button 
          onClick={onStartCheckin}
          className="bg-teal-500 text-slate-950 font-black px-8 py-4 rounded-2xl flex items-center gap-2 hover:scale-105 transition-all shadow-lg shadow-teal-500/20"
        >
          Fazer Check-in Bio <Zap className="w-4 h-4 fill-current" />
        </button>
      ) : (
        <div className="flex items-center gap-4 bg-slate-950 px-6 py-4 rounded-2xl border border-teal-500/30">
          <div className="text-right">
            <div className="text-[10px] text-slate-500 font-bold uppercase">Status de Carga</div>
            <div className={`text-xl font-black ${readinessFactor < 1 ? 'text-yellow-500' : 'text-teal-400'}`}>
              {Math.round(readinessFactor * 100)}% Sugerido
            </div>
          </div>
          <CheckCircle2 className="w-8 h-8 text-teal-500" />
        </div>
      )}
    </div>

    <div className="grid md:grid-cols-2 gap-8">
      <div 
        onClick={checkinDone ? onStartWorkout : onStartCheckin}
        className="group cursor-pointer bg-slate-900 border border-slate-800 rounded-3xl p-10 hover:border-teal-500 transition-all space-y-4"
      >
        <div className="bg-teal-500/10 w-16 h-16 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
          <Dumbbell className="w-8 h-8 text-teal-400" />
        </div>
        <h3 className="text-2xl font-black">Treino do Dia</h3>
        <p className="text-slate-500 text-sm">Acesse sua rotina personalizada e veja os ajustes biológicos.</p>
      </div>
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-10 space-y-4 opacity-50 grayscale cursor-not-allowed">
        <div className="bg-slate-800 w-16 h-16 rounded-2xl flex items-center justify-center">
          <TrendingUp className="w-8 h-8 text-slate-500" />
        </div>
        <h3 className="text-2xl font-black">Evolução</h3>
        <p className="text-slate-500 text-sm">Gráficos de força e métricas corporais (Em breve).</p>
      </div>
    </div>
  </div>
);

const BioCheckin: React.FC<{ onComplete: (factor: number) => void }> = ({ onComplete }) => {
  const [scores, setScores] = useState({ sleep: 3, stress: 3, recovery: 3 });

  const calculate = () => {
    const avg = (scores.sleep + scores.stress + scores.recovery) / 3;
    let factor = 1.0;
    if (avg < 2.5) factor = 0.8; // Deload
    else if (avg > 4) factor = 1.1; // Overload
    onComplete(factor);
  };

  return (
    <div className="max-w-2xl mx-auto space-y-10 animate-in slide-in-from-bottom-5 duration-500">
      <div className="text-center">
        <h2 className="text-4xl font-black mb-2">Check-in de Prontidão</h2>
        <p className="text-slate-500">Sincronize seu corpo com o treino de hoje.</p>
      </div>

      <div className="space-y-12">
        <CheckinSlider label="Qualidade do Sono" icon={<Moon />} value={scores.sleep} onChange={(v) => setScores({...scores, sleep: v})} />
        <CheckinSlider label="Nível de Stress" icon={<BrainCircuit />} value={scores.stress} onChange={(v) => setScores({...scores, stress: v})} />
        <CheckinSlider label="Recuperação Muscular" icon={<Activity />} value={scores.recovery} onChange={(v) => setScores({...scores, recovery: v})} />
      </div>

      <button 
        onClick={calculate}
        className="w-full bg-teal-500 text-slate-950 font-black py-5 rounded-2xl text-xl hover:bg-teal-400 transition-all shadow-xl shadow-teal-500/20"
      >
        Gerar Treino Adaptativo
      </button>
    </div>
  );
};

const CheckinSlider: React.FC<{ label: string, icon: React.ReactNode, value: number, onChange: (v: number) => void }> = ({ label, icon, value, onChange }) => (
  <div className="space-y-4">
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-3 font-bold">
        <span className="text-teal-400">{icon}</span>
        {label}
      </div>
      <span className="text-2xl font-black text-teal-400">{value}</span>
    </div>
    <div className="flex gap-2">
      {[1, 2, 3, 4, 5].map((i) => (
        <button 
          key={i} 
          onClick={() => onChange(i)}
          className={`flex-1 h-14 rounded-xl border-2 transition-all font-black ${
            value === i ? 'bg-teal-500 border-teal-500 text-slate-950 scale-105' : 'bg-slate-900 border-slate-800 text-slate-600 hover:border-slate-700'
          }`}
        >
          {i}
        </button>
      ))}
    </div>
  </div>
);

const WorkoutView: React.FC<{ exercises: Exercise[], factor: number, onBack: () => void }> = ({ exercises, factor, onBack }) => {
  const [activeVideo, setActiveVideo] = useState<string | null>(null);

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <button onClick={onBack} className="text-slate-500 hover:text-white transition-colors flex items-center gap-2">
          <ChevronRight className="rotate-180 w-4 h-4" /> Voltar
        </button>
        {factor !== 1.0 && (
          <div className="flex items-center gap-2 bg-yellow-500/10 border border-yellow-500/20 px-4 py-2 rounded-full text-yellow-500 text-xs font-bold uppercase tracking-widest">
            <AlertTriangle className="w-4 h-4" /> Bio-Ajuste: {factor < 1 ? 'Preservação de Energia' : 'Foco em Performance'}
          </div>
        )}
      </div>

      <div className="grid gap-6">
        {exercises.map((ex) => (
          <div key={ex.id} className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden group hover:border-teal-500/50 transition-all">
            <div className="p-6 flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="flex items-center gap-6">
                <button 
                  disabled={!ex.videoUrl}
                  onClick={() => setActiveVideo(ex.videoUrl || null)}
                  className={`w-20 h-20 bg-slate-950 rounded-2xl flex items-center justify-center border border-slate-800 transition-transform relative group/btn ${ex.videoUrl ? 'cursor-pointer hover:scale-105' : 'opacity-50 cursor-not-allowed'}`}
                >
                  {ex.videoUrl && <div className="absolute inset-0 bg-teal-500/10 animate-pulse opacity-0 group-hover/btn:opacity-100 rounded-2xl transition-opacity" />}
                  <Play className={`w-8 h-8 ${ex.videoUrl ? 'text-teal-400' : 'text-slate-700'}`} />
                </button>
                <div>
                  <h4 className="text-xl font-black">{ex.name}</h4>
                  <div className="flex items-center gap-4 mt-1">
                    <span className="text-slate-500 text-sm font-bold uppercase">{ex.reps}</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-800"></span>
                    <span className="text-teal-400 text-sm font-bold uppercase">Rest: 60s</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-slate-950 px-8 py-4 rounded-2xl border border-slate-800 flex flex-col items-center">
                <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mb-1">Carga Sugerida</span>
                <div className="text-3xl font-black tracking-tight">
                  {Math.round(ex.baseWeight * factor)} <span className="text-sm text-slate-600">KG</span>
                </div>
              </div>
            </div>
            
            {/* Inline Video Player if active */}
            {activeVideo === ex.videoUrl && ex.videoUrl && (
              <div className="bg-slate-950 border-t border-slate-800 p-4 animate-in slide-in-from-top-2">
                <div className="aspect-video bg-black rounded-2xl overflow-hidden relative">
                  <video 
                    src={ex.videoUrl} 
                    controls 
                    autoPlay 
                    className="w-full h-full object-cover"
                  />
                  <button 
                    onClick={() => setActiveVideo(null)}
                    className="absolute top-4 right-4 bg-black/50 backdrop-blur-md p-2 rounded-full hover:bg-black/80 transition-all"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      <button className="w-full bg-slate-900 border border-slate-800 hover:border-teal-500 py-6 rounded-3xl font-black text-slate-400 hover:text-teal-400 transition-all">
        Finalizar Treino
      </button>
    </div>
  );
};

export default App;
