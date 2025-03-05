import { useNavigate } from '@solidjs/router';
import { arrowLeft } from 'solid-heroicons/outline';
import { Icon } from 'solid-heroicons';

export function BackButton() {
  const navigate = useNavigate();

  return (
    <button
      class="relative flex size-10 cursor-pointer items-center justify-center rounded-lg bg-slate-700/50 transition-all hover:bg-slate-600/50 active:scale-95 before:absolute before:inset-0 before:rounded-lg before:border before:border-white/10"
      onClick={() => navigate(-1)}
    >
      <div class="absolute inset-0 rounded-lg bg-gradient-to-b from-white/10 to-transparent" />
      <Icon path={arrowLeft} class="size-5 relative z-10" />
    </button>
  );
}
