
import React from 'react';
import { History, Plus, Settings } from 'lucide-react';

interface AppNavigationProps {
  activeView: string;
  onNavigate: (view: any) => void;
  onCreateSession: () => void;
}

const AppNavigation: React.FC<AppNavigationProps> = ({ activeView, onNavigate, onCreateSession }) => {
  return (
    <nav className="fixed bottom-0 max-w-md w-full bg-white/90 ios-blur border-t border-slate-100 px-8 py-5 flex justify-around items-center z-50 pb-safe">
      <button 
        onClick={() => onNavigate('dashboard')} 
        className={`p-3 rounded-2xl transition-all ${activeView === 'dashboard' ? 'text-theme bg-theme/5 scale-110 shadow-inner' : 'text-slate-400 hover:bg-slate-50'}`}
      >
        <History className="w-7 h-7" />
      </button>
      <div className="w-px h-8 bg-slate-100 mx-2" />
      <button 
        onClick={onCreateSession} 
        className="bg-slate-900 text-white p-4.5 rounded-full shadow-2xl -mt-14 border-[6px] border-slate-50 active:scale-90 transition-transform"
      >
        <Plus className="w-7 h-7" />
      </button>
      <div className="w-px h-8 bg-slate-100 mx-2" />
      <button 
        onClick={() => onNavigate('settings')} 
        className={`p-3 rounded-2xl transition-all ${activeView === 'settings' ? 'text-theme bg-theme/5 scale-110 shadow-inner' : 'text-slate-400 hover:bg-slate-50'}`}
      >
        <Settings className="w-7 h-7" />
      </button>
    </nav>
  );
};

export default AppNavigation;
