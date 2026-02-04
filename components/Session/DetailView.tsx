import React from 'react';
import { Trophy, Sparkles, Download, Trash2, Star } from 'lucide-react';
import { Session, DrillType, ShotTarget } from '../../types';

interface DetailViewProps {
  session: Session;
  isCoachAnalyzing: boolean;
  coachFeedback: string | null;
  onAnalyze: () => void;
  onShare: () => void;
  onDelete: () => void;
  calculateSessionStats: (reps: any[]) => any;
}

const formatTarget = (target?: ShotTarget) => {
  if (!target) return '';
  const map: Record<string, string> = {
    [ShotTarget.TOP_LEFT]: 'Upper Left',
    [ShotTarget.TOP_RIGHT]: 'Upper Right',
    [ShotTarget.BOTTOM_LEFT]: 'Lower Left',
    [ShotTarget.BOTTOM_RIGHT]: 'Lower Right',
    [ShotTarget.CENTER]: 'Center',
    [ShotTarget.CROSSBAR]: 'Crossbar',
    [ShotTarget.POST]: 'Post'
  };
  return map[target as any] || target;
};

const DetailView: React.FC<DetailViewProps> = ({ 
  session, isCoachAnalyzing, coachFeedback, onAnalyze, onShare, onDelete, calculateSessionStats 
}) => {
  const stats = calculateSessionStats(session.reps);
  const headerReps = session.reps.filter(r => r.drillType === DrillType.HEADER);
  const totalHeaderAttempts = headerReps.reduce((sum, r) => sum + (r.shotsTaken || 0), 0);
  const totalHeaderSuccess = headerReps.reduce((sum, r) => sum + (r.shotsMade || 0), 0);
  const clearanceRate = totalHeaderAttempts > 0 ? 
    ((totalHeaderSuccess / totalHeaderAttempts) * 100).toFixed(0) : 0;

  return (
    <div className="p-6 space-y-8 animate-in fade-in duration-300">
      <div className="glass-panel p-8 rounded-[2.5rem] relative overflow-hidden">
         <div className="absolute top-0 right-0 p-6">
            <div className="bg-theme/10 text-theme p-4 rounded-2xl border border-theme/20 backdrop-blur-md">
              <Trophy className="w-7 h-7" />
            </div>
         </div>
         <p className="text-[10px] font-black text-slate-500 uppercase mb-2 tracking-[0.2em] opacity-60">{session.date}</p>
         <h2 className="text-3xl font-black text-slate-900 mb-8 pr-16">{session.location || 'Local Field'}</h2>

         <div className="grid grid-cols-2 gap-6">
            <div className="text-center p-5 bg-white/40 rounded-[2rem] border border-white/60 shadow-sm">
              <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1 opacity-70">Shoot Accuracy</p>
              <p className="text-2xl font-black text-theme">{stats.percentage}%</p>
            </div>
            <div className="text-center p-5 bg-white/40 rounded-[2rem] border border-white/60 shadow-sm">
              <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1 opacity-70">Clearance Rate</p>
              <p className="text-2xl font-black text-slate-900">{clearanceRate}%</p>
            </div>
         </div>
      </div>

      <section className="space-y-4">
         <div className="flex items-center justify-between px-1">
           <h3 className="font-black text-[10px] text-slate-500 uppercase tracking-widest opacity-70">Coach Breakdown</h3>
           {!coachFeedback && !isCoachAnalyzing && (
             <button onClick={onAnalyze} className="text-[10px] font-black text-theme flex items-center gap-1.5 glass-button px-4 py-2 rounded-full border border-theme/20">
               <Sparkles className="w-3.5 h-3.5" /> GENERATE ANALYSIS
             </button>
           )}
         </div>
         <div className="glass-panel-dark text-white p-8 rounded-[2.5rem] relative overflow-hidden min-h-[120px] flex items-center">
            {isCoachAnalyzing ? (
              <div className="flex items-center gap-4 py-4 w-full justify-center">
                <div className="w-2.5 h-2.5 bg-theme rounded-full animate-bounce [animation-delay:-0.3s] shadow-[0_0_15px_rgba(16,185,129,0.5)]"></div>
                <div className="w-2.5 h-2.5 bg-theme rounded-full animate-bounce [animation-delay:-0.15s] shadow-[0_0_15px_rgba(16,185,129,0.5)]"></div>
                <div className="w-2.5 h-2.5 bg-theme rounded-full animate-bounce shadow-[0_0_15px_rgba(16,185,129,0.5)]"></div>
              </div>
            ) : coachFeedback ? (
              <p className="text-base leading-relaxed font-medium italic opacity-95 border-l-4 border-theme pl-6">"{coachFeedback}"</p>
            ) : (
              <p className="text-sm opacity-50 font-medium italic">Ready for your AI Coach analysis? Tap analyze to see your results.</p>
            )}
         </div>
      </section>

      <section className="space-y-4">
        <h3 className="font-black text-[10px] text-slate-500 uppercase tracking-widest px-1 opacity-70">Drill Breakdown</h3>
        {session.reps.map((rep) => {
          const successRate = (rep.shotsTaken && rep.shotsTaken > 0) ? (rep.shotsMade || 0) / rep.shotsTaken : 0;
          const isHighSuccess = successRate >= 0.7;
          const isPerfect = rep.shotsMade === rep.shotsTaken && rep.shotsTaken! > 0;

          return (
            <div key={rep.id} className="glass-panel p-5 rounded-[2rem] flex justify-between items-center">
              <div className="flex items-center gap-5">
                <div className={`w-12 h-12 relative rounded-2xl flex items-center justify-center font-black text-[10px] shadow-lg ${rep.drillType === DrillType.SHOOTING ? 'bg-theme text-white' : 'bg-white/50 text-slate-600 shadow-inner'}`}>
                   {isPerfect && (
                     <div className="absolute -top-1.5 -right-1.5 bg-white rounded-full p-0.5 shadow-md border border-slate-100">
                       <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                     </div>
                   )}
                   {rep.drillType === DrillType.SHOOTING ? rep.foot : 'HEAD'}
                </div>
                <div>
                  <p className="font-black text-slate-900 text-sm mb-0.5">{rep.exerciseName}</p>
                  <p className="text-[10px] text-slate-500 font-bold uppercase tracking-[0.15em] opacity-80">
                    {rep.drillType === DrillType.SHOOTING ? formatTarget(rep.targetArea) : `Longest: ${rep.distance || '0'}FT`}
                  </p>
                </div>
              </div>
              <div className="text-right">
                 <p className={`font-black text-lg ${isHighSuccess ? 'text-green-600' : 'text-slate-900'}`}>{rep.shotsMade} / {rep.shotsTaken}</p>
              </div>
            </div>
          );
        })}
      </section>

      <div className="grid grid-cols-2 gap-4 pt-4 pb-24">
        <button onClick={onShare} className="flex items-center justify-center gap-3 bg-white/40 backdrop-blur-md border border-white/60 py-5 rounded-[1.5rem] font-black text-[10px] text-slate-800 shadow-md glass-button">
          <Download className="w-4 h-4" /> EXPORT
        </button>
        <button onClick={onDelete} className="flex items-center justify-center gap-3 bg-red-50/50 backdrop-blur-md border border-red-100/50 py-5 rounded-[1.5rem] font-black text-[10px] text-red-600 glass-button">
          <Trash2 className="w-4 h-4" /> DELETE
        </button>
      </div>
    </div>
  );
};

export default DetailView;
