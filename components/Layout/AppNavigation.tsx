import React from 'react';
import { History, Plus, Settings } from 'lucide-react';

interface AppNavigationProps {
  activeView: string;
  onNavigate: (view: any) => void;
  onCreateSession: () => void;
}

const AppNavigation: React.FC<AppNavigationProps> = ({ activeView, onNavigate, onCreateSession }) => {
  return (
    <nav className="fixed bottom-6 left-6 right-6 max-w-[calc(448px-3rem)] mx-auto glass-panel rounded-[2.5rem] px-8 py-4 flex justify-around items-center z-50 shadow-2xl">
      <button 
        onClick={() => onNavigate('dashboard')} 
        className={`p-3 rounded-2xl transition-all ${activeView === 'dashboard' ? 'text-theme bg-white/50 scale-110 shadow-lg' : 'text-slate-400 hover:bg-white/30'}`}
      >
        <History className="w-6 h-6" />
      </button>
      
      <button 
        onClick={onCreateSession} 
        className="bg-slate-900 text-white p-5 rounded-full shadow-2xl -mt-12 border-[6px] border-white/60 active:scale-90 transition-transform flex items-center justify-center"
      >
        <Plus className="w-6 h-6" />
      </button>
      
      <button 
        onClick={() => onNavigate('settings')} 
        className={`p-3 rounded-2xl transition-all ${activeView === 'settings' ? 'text-theme bg-white/50 scale-110 shadow-lg' : 'text-slate-400 hover:bg-white/30'}`}
      >
        <Settings className="w-6 h-6" />
      </button>
    </nav>
  );
};

export default AppNavigation;
