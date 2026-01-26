
import React from 'react';
import { Trophy, Calendar, History, ChevronRight, Plus } from 'lucide-react';
import { Session } from '../../types';

interface DashboardViewProps {
  sessions: Session[];
  onSelectSession: (session: Session) => void;
  onCreateSession: () => void;
  calculateSessionStats: (reps: any[]) => any;
}

const DashboardView: React.FC<DashboardViewProps> = ({ 
  sessions, 
  onSelectSession, 
  onCreateSession,
  calculateSessionStats 
}) => {
  if (sessions.length === 0) {
    return (
      <div className="p-6 text-center py-24 animate-in fade-in duration-300">
        <div className="bg-slate-100 w-24 h-24 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-inner">
          <Trophy className="w-10 h-10 text-slate-300" />
        </div>
        <h3 className="text-slate-800 font-black text-xl">Your pitch is waiting</h3>
        <p className="text-slate-500 text-sm mt-2 max-w-[200px] mx-auto">Start your first session to track your accuracy and header skill.</p>
        <button 
          onClick={onCreateSession}
          className="mt-8 inline-flex items-center gap-2 btn-theme px-8 py-4 rounded-3xl font-black shadow-xl shadow-theme/20"
        >
          <Plus className="w-5 h-5" /> NEW SESSION
        </button>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-4 animate-in fade-in duration-300">
      <h2 className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Session Log</h2>
      {sessions.map(session => {
        const stats = calculateSessionStats(session.reps);
        return (
          <div 
            key={session.id} 
            onClick={() => onSelectSession(session)}
            className="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm active:scale-[0.98] transition-all cursor-pointer group"
          >
            <div className="flex justify-between items-start mb-4">
              <div className="space-y-1">
                <p className="text-[10px] font-black text-slate-400 uppercase flex items-center gap-1.5">
                  <Calendar className="w-3 h-3" /> {session.date}
                </p>
                <h3 className="font-black text-slate-800 text-lg group-hover:text-theme transition-colors">{session.location}</h3>
              </div>
              {stats.totalTaken > 0 && (
                <div className="bg-slate-50 text-theme px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-tighter border border-slate-100">
                  {stats.percentage}% ACC
                </div>
              )}
            </div>
            <div className="flex items-center justify-between text-[10px] font-black text-slate-500 uppercase tracking-widest bg-slate-50 p-3 rounded-2xl">
               <span className="flex items-center gap-2">
                <History className="w-4 h-4 text-slate-400" /> {session.reps.length} DRILLS
              </span>
              <ChevronRight className="w-4 h-4 text-slate-300" />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default DashboardView;
