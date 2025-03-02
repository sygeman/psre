import { useNavigate } from '@solidjs/router';
import { arrowLeft } from 'solid-heroicons/outline';
import { Icon } from 'solid-heroicons';

export function BackButton() {
  const navigate = useNavigate();

  return (
    <button
      class="px-4 cursor-pointer flex items-center hover:text-gray-600 transition-colors"
      onClick={() => navigate(-1)}
    >
      <Icon path={arrowLeft} class="size-6" />
    </button>
  );
}
