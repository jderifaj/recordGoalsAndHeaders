
import React from 'react';
import { ShotTarget } from '../types';

interface SoccerGoalSelectorProps {
  selected: ShotTarget;
  onSelect: (target: ShotTarget) => void;
}

const SoccerGoalSelector: React.FC<SoccerGoalSelectorProps> = ({ selected, onSelect }) => {
  const targets = [
    { id: ShotTarget.TOP_LEFT, pos: 'top-2 left-2' },
    { id: ShotTarget.TOP_RIGHT, pos: 'top-2 right-2' },
    { id: ShotTarget.CENTER, pos: 'top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2' },
    { id: ShotTarget.BOTTOM_LEFT, pos: 'bottom-2 left-2' },
    { id: ShotTarget.BOTTOM_RIGHT, pos: 'bottom-2 right-2' },
  ];

  return (
    <div className="relative w-full aspect-[3/2] bg-slate-900 rounded-2xl border-4 border-slate-800 overflow-hidden shadow-2xl">
      {/* Goal Posts */}
      <div className="absolute inset-x-10 top-10 bottom-0 border-t-4 border-x-4 border-white/20 rounded-t-lg"></div>
      
      {/* Target Nodes */}
      {targets.map((t) => (
        <button
          key={t.id}
          type="button"
          onClick={() => onSelect(t.id)}
          className={`absolute ${t.pos} w-14 h-14 rounded-full border-2 flex items-center justify-center transition-all duration-300 z-10
            ${selected === t.id 
              ? 'bg-theme border-white scale-110 shadow-lg shadow-theme/50' 
              : 'bg-white/5 border-white/10 hover:bg-white/20 hover:scale-105'}`}
        >
          {selected === t.id ? (
            <div className="w-4 h-4 bg-white rounded-full animate-pulse" />
          ) : (
            <div className="w-1.5 h-1.5 bg-white/20 rounded-full" />
          )}
        </button>
      ))}
      
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-[10px] text-white/20 uppercase tracking-[0.2em] font-black">
        TAP TARGET ZONE
      </div>
    </div>
  );
};

export default SoccerGoalSelector;
