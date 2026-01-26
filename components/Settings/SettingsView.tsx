
import React from 'react';
import { Camera, Maximize, Fingerprint, Cake, ImageIcon, Trophy } from 'lucide-react';
import { UserSettings } from '../../types';

interface SettingsViewProps {
  settings: UserSettings;
  setSettings: (settings: UserSettings) => void;
  calculateAge: (date: string) => number;
  onImageUpload: (e: React.ChangeEvent<HTMLInputElement>, type: 'profile' | 'icon') => void;
  onSave: () => void;
}

const SettingsView: React.FC<SettingsViewProps> = ({ 
  settings, setSettings, calculateAge, onImageUpload, onSave 
}) => {
  const profileInputRef = React.useRef<HTMLInputElement>(null);
  const iconInputRef = React.useRef<HTMLInputElement>(null);

  const themePresets = [
    { name: 'Pitch', color: '#10b981' },
    { name: 'Sky', color: '#0ea5e9' },
    { name: 'Sunset', color: '#f43f5e' },
    { name: 'Royal', color: '#6366f1' },
    { name: 'Midnight', color: '#1e293b' },
    { name: 'Gold', color: '#eab308' },
  ];

  return (
    <div className="p-6 space-y-8 animate-in slide-in-from-bottom-4 duration-500">
      <h2 className="text-2xl font-black text-slate-800">Athlete Profile</h2>
      
      <section className="space-y-6">
        <div className="space-y-4">
          <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block px-1">Identity</label>
          <div className="flex flex-col items-center gap-6 bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm">
            <div className="relative">
              <div className="w-36 h-36 rounded-full overflow-hidden bg-slate-100 border-4 border-white shadow-xl flex items-center justify-center">
                {settings.profileImage ? (
                  <img 
                    src={settings.profileImage} alt="Profile" className="w-full h-full object-cover" 
                    style={{ transform: `scale(${settings.profileZoom})` }}
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-slate-300">Athlete</div>
                )}
              </div>
              <button onClick={() => profileInputRef.current?.click()} className="absolute bottom-1 right-1 bg-slate-900 text-white p-3 rounded-full shadow-lg border-4 border-white">
                <Camera className="w-5 h-5" />
              </button>
              <input type="file" ref={profileInputRef} className="hidden" accept="image/*" onChange={(e) => onImageUpload(e, 'profile')} />
            </div>

            <div className="w-full px-4 space-y-3">
              <div className="flex justify-between items-center text-[10px] font-black text-slate-400 uppercase tracking-widest">
                <span className="flex items-center gap-1"><Maximize className="w-3 h-3" /> ZOOM</span>
                <span className="text-slate-900">{Math.round(settings.profileZoom * 100)}%</span>
              </div>
              <input 
                type="range" min="1" max="3" step="0.01" value={settings.profileZoom} 
                onChange={(e) => setSettings({...settings, profileZoom: parseFloat(e.target.value)})}
                className="w-full accent-slate-900 h-1.5 bg-slate-100 rounded-lg appearance-none cursor-pointer"
              />
            </div>

            <div className="w-full space-y-4">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase ml-1 flex items-center gap-2">
                  <Fingerprint className="w-3 h-3" /> Full Name
                </label>
                <input 
                  type="text" value={settings.userName} onChange={(e) => setSettings({...settings, userName: e.target.value})}
                  className="w-full bg-slate-50 border border-slate-200 p-4 rounded-2xl text-base font-bold outline-none"
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase ml-1 flex items-center gap-2">
                  <Cake className="w-3 h-3" /> Birthdate
                </label>
                <div className="flex items-center gap-3">
                  <input 
                    type="date" value={settings.birthDate} onChange={(e) => setSettings({...settings, birthDate: e.target.value})}
                    className="flex-1 bg-slate-50 border border-slate-200 p-4 rounded-2xl text-base font-bold outline-none"
                  />
                  {settings.birthDate && (
                    <div className="bg-slate-900 text-white px-4 py-4 rounded-2xl font-black text-sm">
                      AGE: {calculateAge(settings.birthDate)}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block px-1">Branding</label>
          <div className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm">
            <div className="flex items-center justify-between gap-6">
              <div className="flex-1">
                <h4 className="font-black text-slate-800 uppercase text-xs">Brand Logo</h4>
                <p className="text-[10px] text-slate-500 font-bold mt-1">Replace default trophy icon.</p>
              </div>
              <div className="relative">
                <div className={`w-20 h-20 rounded-3xl flex items-center justify-center overflow-hidden transition-all
                    ${settings.appIcon ? 'bg-transparent border border-slate-100' : 'bg-theme shadow-xl shadow-theme/20'}`}>
                  {settings.appIcon ? (
                    <img src={settings.appIcon} alt="App Icon" className="w-full h-full object-contain p-2" />
                  ) : (
                    <Trophy className="w-8 h-8 text-white" />
                  )}
                </div>
                <button onClick={() => iconInputRef.current?.click()} className="absolute -bottom-2 -right-2 bg-slate-900 text-white p-2.5 rounded-full shadow-lg border-2 border-white">
                  <ImageIcon className="w-4 h-4" />
                </button>
                <input type="file" ref={iconInputRef} className="hidden" accept="image/*" onChange={(e) => onImageUpload(e, 'icon')} />
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block px-1">Theme</label>
          <div className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm grid grid-cols-6 gap-3">
            {themePresets.map((theme) => (
              <button
                key={theme.color}
                onClick={() => setSettings({...settings, themeColor: theme.color})}
                className={`w-full aspect-square rounded-full transition-all border-4 
                  ${settings.themeColor === theme.color ? 'border-slate-900 scale-110 shadow-lg' : 'border-white shadow-sm'}`}
                style={{ backgroundColor: theme.color }}
              />
            ))}
          </div>
        </div>

        <button onClick={onSave} className="w-full py-6 btn-theme rounded-[2rem] font-black text-sm tracking-widest shadow-2xl shadow-theme/20">
          SAVE & RETURN
        </button>
      </section>
    </div>
  );
};

export default SettingsView;
