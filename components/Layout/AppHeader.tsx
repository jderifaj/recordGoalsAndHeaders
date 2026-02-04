import React from 'react';
import { ArrowLeft, Trophy, User, Quote } from 'lucide-react';
import { UserSettings } from '../../types';

interface AppHeaderProps {
  view: string;
  onBack: () => void;
  onSettings: () => void;
  settings: UserSettings;
  activeQuote?: string | null;
}

const AppHeader: React.FC<AppHeaderProps> = ({ view, onBack, onSettings, settings, activeQuote }) => {
  const isSessionView = view === 'new-session' || view === 'session-detail';

  return (
    <header className="px-6 pt-safe pb-4 bg-white/30 backdrop-blur-lg border-b border-white/40 sticky top-0 z-50">
      <div className="pt-6 flex items-center justify-between gap-4">
        {view !== 'dashboard' ? (
          <div className="flex items-center gap-2 flex-1 min-w-0">
            <button onClick={onBack} className="p-2 -ml-2 text-slate-600 hover:text-slate-900 transition-colors flex-shrink-0 bg-white/20 rounded-xl glass-button">
              <ArrowLeft className="w-5 h-5" />
            </button>
            
            {isSessionView && activeQuote && (
              <div className="quote-animate flex-1 min-w-0">
                <div 
                  className="px-3 py-2 rounded-xl flex items-start gap-2 shadow-sm border border-white/50 backdrop-blur-md"
                  style={{ backgroundColor: '#8bc34a7d' }}
                >
                  <Quote className="w-3 h-3 text-slate-800 mt-0.5 flex-shrink-0 opacity-60" />
                  <p className="text-[10px] sm:text-[11px] font-bold italic text-slate-900 leading-tight line-clamp-2">
                    {activeQuote}
                  </p>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="flex items-center gap-3">
            <div 
              className={`w-10 h-10 rounded-2xl flex items-center justify-center overflow-hidden transition-all shadow-lg
                ${settings.appIcon ? 'bg-transparent border-0' : 'bg-theme/90'}`}
            >
              {settings.appIcon ? (
                <img src={settings.appIcon} alt="Icon" className="w-full h-full object-contain" />
              ) : (
                <Trophy className="w-5 h-5 text-white" />
              )}
            </div>
            <h1 className="text-xl font-black tracking-tight text-slate-800">{settings.appTitle}</h1>
          </div>
        )}
        
        {view === 'dashboard' && (
          <button 
            onClick={onSettings}
            className="w-10 h-10 rounded-2xl border border-white/60 flex items-center justify-center overflow-hidden bg-white/40 backdrop-blur-md shadow-lg"
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
              <User className="w-5 h-5 text-slate-500" />
            )}
          </button>
        )}
      </div>
    </header>
  );
};

export default AppHeader;
