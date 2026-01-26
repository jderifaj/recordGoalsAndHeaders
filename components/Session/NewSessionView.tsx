
import React from 'react';
import { Calendar, MapPin, Target, ArrowUpCircle, Ruler, Trash2 } from 'lucide-react';
import { Session, DrillType, ShotTarget, Rep } from '../../types';
import SoccerGoalSelector from '../SoccerGoalSelector';
import Stepper from '../Shared/Stepper';

interface NewSessionViewProps {
  activeSession: Session;
  setActiveSession: (session: Session) => void;
  drillType: DrillType;
  setDrillType: (type: DrillType) => void;
  exerciseName: string;
  setExerciseName: (name: string) => void;
  repTarget: ShotTarget;
  setRepTarget: (target: ShotTarget) => void;
  attempts: number;
  setAttempts: (val: number) => void;
  successes: number;
  setSuccesses: (val: number) => void;
  longestClearance: string;
  setLongestClearance: (val: string) => void;
  editingRepId: string | null;
  onAddRep: () => void;
  onEditRep: (rep: Rep) => void;
  onDeleteRep: (id: string) => void;
  onCancelEdit: () => void;
  onComplete: () => void;
}

const NewSessionView: React.FC<NewSessionViewProps> = (props) => {
  const { 
    activeSession, setActiveSession, drillType, setDrillType, exerciseName, 
    setExerciseName, repTarget, setRepTarget, attempts, setAttempts, 
    successes, setSuccesses, longestClearance, setLongestClearance,
    editingRepId, onAddRep, onEditRep, onDeleteRep, onCancelEdit, onComplete 
  } = props;

  return (
    <div className="p-6 space-y-8 animate-in fade-in duration-300">
      <section className="space-y-1">
        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Live Session Context</label>
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center gap-3 bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
            <Calendar className="w-4 h-4 text-slate-400" />
            <input 
              type="date" value={activeSession.date} 
              onChange={(e) => setActiveSession({...activeSession, date: e.target.value})} 
              className="text-xs font-black focus:outline-none bg-transparent w-full" 
            />
          </div>
          <div className="flex items-center gap-3 bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
            <MapPin className="w-4 h-4 text-slate-400" />
            <input 
              type="text" value={activeSession.location} 
              onChange={(e) => setActiveSession({...activeSession, location: e.target.value})} 
              className="text-xs font-black focus:outline-none bg-transparent w-full" 
            />
          </div>
        </div>
      </section>

      <section className="bg-white p-8 rounded-[2.5rem] shadow-2xl shadow-slate-200/50 border border-slate-100 space-y-8">
        <div className="flex flex-col gap-6">
          <div className="flex p-1.5 bg-slate-100 rounded-2xl">
            <button 
              onClick={() => { setDrillType(DrillType.SHOOTING); if (!editingRepId) setExerciseName('Shooting Drill'); }}
              className={`flex-1 py-3 rounded-xl text-[10px] font-black transition-all flex items-center justify-center gap-2 ${drillType === DrillType.SHOOTING ? 'bg-white shadow-sm text-slate-900 scale-100' : 'text-slate-400'}`}
            >
              <Target className={`w-4 h-4 ${drillType === DrillType.SHOOTING ? 'text-theme' : ''}`} /> SHOOTING
            </button>
            <button 
              onClick={() => { setDrillType(DrillType.HEADER); if (!editingRepId) setExerciseName('Header Practice'); }}
              className={`flex-1 py-3 rounded-xl text-[10px] font-black transition-all flex items-center justify-center gap-2 ${drillType === DrillType.HEADER ? 'bg-white shadow-sm text-slate-900 scale-100' : 'text-slate-400'}`}
            >
              <ArrowUpCircle className={`w-4 h-4 ${drillType === DrillType.HEADER ? 'text-theme' : ''}`} /> HEADER
            </button>
          </div>

          <div className="space-y-6">
            <div>
              <label className="text-[10px] font-black text-slate-400 uppercase block mb-2 px-1">Drill Identification</label>
              <input 
                type="text" value={exerciseName} onChange={(e) => setExerciseName(e.target.value)}
                placeholder="Name this drill..."
                className="w-full bg-slate-50 border border-slate-200 p-4 rounded-2xl text-sm font-bold focus:ring-4 focus:ring-theme/5 outline-none transition-all"
              />
            </div>

            {drillType === DrillType.SHOOTING ? (
              <>
                <div>
                  <label className="text-[10px] font-black text-slate-400 uppercase block mb-3 px-1">Target Zone Accuracy</label>
                  <SoccerGoalSelector selected={repTarget} onSelect={setRepTarget} />
                </div>
                <div className="space-y-3 pt-2">
                  <Stepper 
                    horizontal label="Shots Taken" value={attempts} min={1}
                    onChange={(val) => { setAttempts(val); if (successes > val) setSuccesses(val); }}
                  />
                  <Stepper 
                    horizontal label="Shots Made" value={successes} max={attempts}
                    colorClass="text-theme" onChange={setSuccesses}
                  />
                </div>
              </>
            ) : (
              <div className="space-y-8">
                <div className="space-y-3 pt-2">
                  <Stepper 
                    horizontal label="# of Attempts" value={attempts} min={1}
                    onChange={(val) => { setAttempts(val); if (successes > val) setSuccesses(val); }}
                  />
                  <Stepper 
                    horizontal label="Successful Clearances" value={successes} max={attempts}
                    colorClass="text-theme" onChange={setSuccesses}
                  />
                </div>
                <div>
                  <label className="text-[10px] font-black text-slate-400 uppercase block mb-2 px-1">Longest Clearance (Feet)</label>
                  <div className="relative">
                     <input 
                      type="number" value={longestClearance} onChange={(e) => setLongestClearance(e.target.value)}
                      placeholder="e.g. 45"
                      className="w-full bg-slate-50 border border-slate-200 p-4 pr-12 rounded-2xl text-lg font-black outline-none transition-all focus:ring-4 focus:ring-theme/5"
                    />
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-300">
                       <Ruler className="w-5 h-5" />
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div className="flex gap-3 pt-2">
              {editingRepId && (
                <button onClick={onCancelEdit} className="flex-1 bg-slate-100 text-slate-600 py-5 rounded-[1.5rem] font-black text-xs tracking-widest transition-all">
                  CANCEL
                </button>
              )}
              <button 
                onClick={onAddRep}
                className="flex-[2] btn-theme py-5 rounded-[1.5rem] font-black text-xs tracking-widest shadow-xl shadow-theme/20"
              >
                {editingRepId ? 'CONFIRM EDIT' : 'RECORD REP'}
              </button>
            </div>
          </div>
        </div>
      </section>

      {activeSession.reps.length > 0 && (
        <section className="space-y-4 pt-4 animate-in slide-in-from-bottom-2 duration-500">
          <div className="flex justify-between items-center px-1">
            <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Recorded Drills ({activeSession.reps.length})</h3>
          </div>
          <div className="space-y-3">
            {activeSession.reps.map((rep) => (
              <div 
                key={rep.id} onClick={() => onEditRep(rep)}
                className={`bg-white p-4 rounded-3xl border transition-all flex justify-between items-center group cursor-pointer active:scale-[0.98]
                  ${editingRepId === rep.id ? 'border-theme ring-4 ring-theme/5 shadow-inner' : 'border-slate-200 shadow-sm hover:border-slate-300'}`}
              >
                <div className="flex gap-4 items-center">
                   <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${rep.drillType === DrillType.SHOOTING ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-600'}`}>
                      {rep.drillType === DrillType.SHOOTING ? <Target className="w-5 h-5"/> : <ArrowUpCircle className="w-5 h-5"/>}
                   </div>
                   <div>
                      <p className="font-black text-slate-800 text-sm">{rep.exerciseName}</p>
                      <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest mt-0.5">
                        {rep.drillType === DrillType.SHOOTING ? `${rep.shotsMade}/${rep.shotsTaken} GOALS` : `${rep.shotsMade}/${rep.shotsTaken} SUCCESS`}
                      </p>
                   </div>
                </div>
                <button 
                  onClick={(e) => { e.stopPropagation(); onDeleteRep(rep.id); }} 
                  className="p-2.5 text-slate-300 hover:text-red-500 transition-colors bg-slate-50 rounded-xl"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </section>
      )}

      <div className="pt-6">
        <button 
          onClick={onComplete}
          disabled={activeSession.reps.length === 0}
          className={`w-full py-6 rounded-[2rem] font-black text-sm tracking-widest transition-all shadow-2xl
            ${activeSession.reps.length > 0 ? 'bg-slate-900 text-white shadow-slate-900/20' : 'bg-slate-200 text-slate-400'}`}
        >
          COMPLETE SESSION
        </button>
      </div>
    </div>
  );
};

export default NewSessionView;
