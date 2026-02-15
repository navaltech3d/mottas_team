
import React from 'react';
import { LogOut } from 'lucide-react';

interface NavProps {
  activeSection: string;
  onNavigate: (id: string) => void;
  isLoggedIn?: boolean;
  userRole?: 'personal' | 'student';
  onLogout?: () => void;
}

export const Navigation: React.FC<NavProps> = ({ activeSection, onNavigate, isLoggedIn, userRole, onLogout }) => {
  const getLinks = () => {
    if (!isLoggedIn) return [];
    if (userRole === 'personal') {
      return [
        { id: 'dashboard', label: 'Dashboard' },
        { id: 'alunos', label: 'Meus Alunos' },
        { id: 'biblioteca', label: 'Exercícios' },
        { id: 'config', label: 'Personalização' },
      ];
    }
    return [
      { id: 'dashboard', label: 'Início' },
      { id: 'workout', label: 'Treino' },
      { id: 'checkin', label: 'Bio-Checkin' },
    ];
  };

  const links = getLinks();

  return (
    <nav className="fixed top-0 left-0 right-0 bg-slate-950/80 backdrop-blur-xl border-b border-slate-800 z-50">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => onNavigate('landing')}>
          <div className="w-10 h-10 bg-teal-500 rounded-xl flex items-center justify-center font-black text-slate-950 text-xl shadow-lg shadow-teal-500/20">M</div>
          <div className="flex flex-col">
            <span className="font-black text-lg leading-none tracking-tighter text-white uppercase">MOTTA'S <span className="text-teal-400 font-black">TEAM</span></span>
            {isLoggedIn && (
              <span className="text-[10px] text-slate-500 uppercase font-bold tracking-widest leading-none mt-1">
                {userRole === 'personal' ? 'Coach Portal' : 'Athlete Portal'}
              </span>
            )}
          </div>
        </div>

        {isLoggedIn && (
          <div className="hidden md:flex gap-8">
            {links.map((link) => (
              <button
                key={link.id}
                onClick={() => onNavigate(link.id)}
                className={`text-[10px] uppercase tracking-widest font-black transition-all ${
                  activeSection === link.id ? 'text-teal-400' : 'text-slate-500 hover:text-white'
                }`}
              >
                {link.label}
              </button>
            ))}
          </div>
        )}

        <div className="flex items-center gap-4">
           {isLoggedIn ? (
             <button 
               onClick={onLogout}
               className="bg-slate-900 border border-slate-800 px-4 py-2 rounded-full text-slate-500 hover:text-red-400 transition-all flex items-center gap-2 text-xs font-bold"
             >
               Sair <LogOut className="w-3 h-3" />
             </button>
           ) : (
             <button 
               onClick={() => onNavigate('login')}
               className="bg-teal-500 hover:bg-teal-400 px-6 py-2.5 rounded-full text-slate-950 text-xs font-black uppercase tracking-widest transition-all shadow-lg shadow-teal-500/10"
             >
               Entrar
             </button>
           )}
        </div>
      </div>
    </nav>
  );
};
