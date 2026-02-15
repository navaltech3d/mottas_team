
import React from 'react';

interface NavProps {
  activeSection: string;
  onNavigate: (id: string) => void;
}

export const Navigation: React.FC<NavProps> = ({ activeSection, onNavigate }) => {
  const links = [
    { id: 'dashboard', label: 'Dashboard' },
    { id: 'alunos', label: 'Meus Alunos' },
    { id: 'biblioteca', label: 'Exercícios' },
    { id: 'config', label: 'Minha Marca' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 bg-slate-950/80 backdrop-blur-xl border-b border-slate-800 z-50">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-teal-500 rounded-xl flex items-center justify-center font-black text-slate-950 text-xl shadow-lg shadow-teal-500/20">M</div>
          <div className="flex flex-col">
            <span className="font-black text-lg leading-none tracking-tighter text-white">MOTTA'S <span className="text-teal-400">TEAM</span></span>
            <span className="text-[10px] text-slate-500 uppercase font-bold tracking-widest">Performance Admin</span>
          </div>
        </div>
        <div className="hidden md:flex gap-8">
          {links.map((link) => (
            <button
              key={link.id}
              onClick={() => onNavigate(link.id)}
              className={`text-xs uppercase tracking-widest font-bold transition-all ${
                activeSection === link.id ? 'text-teal-400' : 'text-slate-500 hover:text-white'
              }`}
            >
              {link.label}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-4">
           <button className="hidden lg:block text-[10px] text-slate-500 font-bold uppercase tracking-widest border border-slate-800 px-4 py-2 rounded-full hover:bg-slate-900">
             Configurações
           </button>
           <div className="w-8 h-8 bg-teal-500/10 border border-teal-500/30 rounded-full flex items-center justify-center">
             <div className="w-2 h-2 bg-teal-500 rounded-full animate-pulse"></div>
           </div>
        </div>
      </div>
    </nav>
  );
};
