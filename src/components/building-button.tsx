import { JSX } from 'solid-js';

type BuildingButtonProps = {
  onClick: (e: MouseEvent) => void;
  disabled?: boolean;
  color: string;
  icon: JSX.Element;
  label: string;
  timer?: string;
  pulseAnimation?: boolean;
};

export function BuildingButton(props: BuildingButtonProps) {
  return (
    <div class="relative flex flex-col items-center w-12">
      <div class="relative w-12 h-12">
        <button 
          onClick={props.onClick}
          disabled={props.disabled}
          class={`w-full h-full rounded-full flex items-center justify-center transition-colors ${
            props.pulseAnimation
              ? `animate-[pulse_2s_ease-in-out_infinite] ${props.color.replace('-900', '-700')} cursor-pointer`
              : `bg-slate-900 ${props.disabled ? 'cursor-not-allowed opacity-50' : ''}`
          }`}
        >
          <span 
            class={`flex items-center justify-center w-8 h-8 rounded-full ${props.color}`}
          >
            {props.icon}
          </span>
          
          {props.timer && (
            <div class="absolute inset-0 flex items-center justify-center text-xs text-white/60 bg-black/50 rounded-full">
              {props.timer}
            </div>
          )}
        </button>
      </div>
      <span class="mt-1 text-xs text-white/60">{props.label}</span>
    </div>
  );
}