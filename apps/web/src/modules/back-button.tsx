import { useNavigate } from '@solidjs/router';
import { arrowLeft } from 'solid-heroicons/outline';
import { Icon } from 'solid-heroicons';

export function BackButton() {
  const navigate = useNavigate();

  return (
    <button
      class="group relative flex h-full aspect-square cursor-pointer items-center justify-center transition-all active:translate-y-[1px]"
      onClick={() => navigate(-1)}
    >
      {/* Эффект при наведении */}
      <div class="absolute inset-0 bg-white/5 opacity-0 transition-opacity duration-200 group-hover:opacity-100" />
      
      {/* Разделитель справа */}
      <div class="absolute right-0 h-full w-[1px] bg-slate-700" />
      <div class="absolute right-[1px] h-full w-[1px] bg-black/20" />
      
      {/* Иконка */}
      <Icon 
        path={arrowLeft} 
        class="relative z-10 size-5 text-slate-300 transition-colors duration-200 group-hover:text-slate-200" 
      />
    </button>
  );
}
