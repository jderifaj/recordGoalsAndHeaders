import React from "react";
import { ShotTarget } from "../types";

interface SoccerGoalSelectorProps {
  selected: ShotTarget;
  onSelect: (target: ShotTarget) => void;
}

const SoccerGoalSelector: React.FC<SoccerGoalSelectorProps> = ({
  selected,
  onSelect,
}) => {
  // Adjusted positions to be centered within the thicker goal frame
  const targets = [
    { id: ShotTarget.TOP_LEFT, pos: "top-4 left-4" },
    { id: ShotTarget.TOP_RIGHT, pos: "top-4 right-4" },
    {
      id: ShotTarget.CENTER,
      pos: "top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2",
    },
    { id: ShotTarget.BOTTOM_LEFT, pos: "bottom-4 left-4" },
    { id: ShotTarget.BOTTOM_RIGHT, pos: "bottom-4 right-4" },
  ];

  return (
    <div className="relative w-full aspect-[3/2] bg-slate-900 rounded-2xl border-4 border-slate-800 overflow-hidden shadow-2xl">
      {/* Thicker, more prominent Goal Frame (the "grey bar") */}
      <div className="absolute inset-x-4 top-4 bottom-0 border-t-[14px] border-x-[14px] border-slate-600 rounded-t-lg"></div>

      {/* Goal Net details */}
      <div className="absolute inset-x-12 top-12 bottom-0 border-t-2 border-x-2 border-white/5 rounded-t-sm"></div>

      {/* Target Nodes */}
      {targets.map((t) => (
        <button
          key={t.id}
          type="button"
          onClick={() => onSelect(t.id)}
          className={`absolute ${t.pos} w-16 h-16 rounded-full border-2 flex items-center justify-center transition-all duration-300 z-10
            ${
              selected === t.id
                ? "bg-theme border-white scale-110 shadow-lg shadow-theme/50"
                : "bg-white/5 border-white/10 hover:bg-white/20 hover:scale-105"
            }`}
        >
          {selected === t.id ? (
            <div className="w-5 h-5 bg-white rounded-full animate-pulse shadow-sm" />
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
