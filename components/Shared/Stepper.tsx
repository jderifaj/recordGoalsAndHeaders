
import React from 'react';
import { Plus, Minus } from 'lucide-react';

interface StepperProps {
  label: string;
  value: number;
  onChange: (val: number) => void;
  min?: number;
  max?: number;
  colorClass?: string;
  horizontal?: boolean;
}

const Stepper: React.FC<StepperProps> = ({ 
  label, 
  value, 
  onChange, 
  min = 0, 
  max = 999, 
  colorClass = "", 
  horizontal = false 
}) => (
  <div className={`flex ${horizontal ? 'flex-row items-center justify-between' : 'flex-col space-y-2'} flex-1`}>
    <label className={`text-[10px] font-black text-slate-400 uppercase tracking-widest px-1 ${horizontal ? 'text-left' : 'text-center'}`}>
      {label}
    </label>
    <div className={`flex items-center bg-slate-50 border border-slate-200 rounded-2xl overflow-hidden p-1 shadow-inner ${horizontal ? 'w-32' : 'w-full'}`}>
      <button 
        type="button"
        onClick={() => onChange(Math.max(min, value - 1))}
        className="w-8 h-8 flex items-center justify-center text-slate-400 hover:text-slate-600 active:bg-slate-200 active:scale-95 transition-all rounded-xl"
      >
        <Minus className="w-3.5 h-3.5" />
      </button>
      <div className={`flex-1 text-center font-black text-sm select-none ${colorClass}`}>
        {value}
      </div>
      <button 
        type="button"
        onClick={() => onChange(Math.min(max, value + 1))}
        className="w-8 h-8 flex items-center justify-center text-slate-400 hover:text-slate-600 active:bg-slate-200 active:scale-95 transition-all rounded-xl"
      >
        <Plus className="w-3.5 h-3.5" />
      </button>
    </div>
  </div>
);

export default Stepper;
