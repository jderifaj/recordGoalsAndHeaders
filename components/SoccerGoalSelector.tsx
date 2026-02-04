import React from 'react';
import { ShotTarget } from '../types';

interface SoccerGoalSelectorProps {
  selected: ShotTarget;
  onSelect: (target: ShotTarget) => void;
}

const SoccerGoalSelector: React.FC<SoccerGoalSelectorProps> = ({ selected, onSelect }) => {
  const targets = [
    { id: ShotTarget.TOP_LEFT, pos: 'top-4 left-4' },
    { id: ShotTarget.TOP_RIGHT, pos: 'top-4 right-4' },
    { id: ShotTarget.CENTER, pos: 'top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2' },
    { id: ShotTarget.BOTTOM_LEFT, pos: 'bottom-4 left-4' },
    { id: ShotTarget.BOTTOM_RIGHT, pos: 'bottom-4 right-4' },
  ];

  return (
    <div className="relative w-full aspect-[3/2] glass-panel-dark rounded-[2rem] overflow-hidden">
      {/* Goal Frame */}
      <div className="absolute inset-x-4 top-4 bottom-0 border-t-[14px] border-x-[14px] border-white/10 rounded-t-2xl"></div>
      
      {/* Target Nodes */}
      {targets.map((t) => (
        <button
          key={t.id}
          type="button"
          onClick={() => onSelect(t.id)}
          className={`absolute ${t.pos} w-16 h-16 rounded-full border-2 flex items-center justify-center transition-all duration-300 z-10
            ${selected === t.id 
              ? 'bg-theme border-white scale-110 shadow-[0_0_25px_rgba(16,185,129,0.6)]' 
              : 'bg-white/5 border-white/10 hover:bg-white/20'}`}
        >
          {selected === t.id ? (
            <div className="w-5 h-5 bg-white rounded-full animate-pulse" />
          ) : (
            <div className="w-2 h-2 bg-white/30 rounded-full" />
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
