
import React from 'react';
import { ArrowLeft, Trophy, User } from 'lucide-react';
import { UserSettings } from '../../types';

interface AppHeaderProps {
  view: string;
  onBack: () => void;
  onSettings: () => void;
  settings: UserSettings;
}

const AppHeader: React.FC<AppHeaderProps> = ({ view, onBack, onSettings, settings }) => {
  return (
    <header className="px-6 pt-safe pb-6 bg-white border-b border-slate-200 sticky top-0 z-50">
      {/* Container with additional padding to handle status bar translucency */}
      <div className="pt-6 flex justify-between items-center">
        {view !== 'dashboard' ? (
          <button onClick={onBack} className="p-2 -ml-2 text-slate-500 hover:text-slate-800 transition-colors">
            <ArrowLeft className="w-6 h-6" />
          </button>
        ) : (
          <div className="flex items-center gap-3">
            <div 
              className={`w-10 h-10 rounded-xl flex items-center justify-center overflow-hidden transition-all
                ${settings.appIcon ? 'bg-transparent border-0' : 'bg-theme shadow-lg shadow-theme/20'}`}
            >
              {settings.appIcon ? (
                <img src={settings.appIcon} alt="Icon" className="w-full h-full object-contain" />
              ) : (
                <Trophy className="w-5 h-5 text-white" />
              )}
            </div>
            <h1 className="text-xl font-bold tracking-tight text-slate-800">{settings.appTitle}</h1>
          </div>
        )}
        
        {view === 'dashboard' && (
          <button 
            onClick={onSettings}
            className="w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center overflow-hidden bg-slate-50 shadow-inner"
          >
            {settings.profileImage ? (
              <div className="w-full h-full relative">
                <img 
                  src={settings.profileImage} 
                  alt="User" 
                  className="w-full h-full object-cover" 
                  style={{ transform: `scale(${settings.profileZoom})` }}
                />
              </div>
            ) : (
              <User className="w-5 h-5 text-slate-400" />
            )}
          </button>
        )}
      </div>
    </header>
  );
};

export default AppHeader;
