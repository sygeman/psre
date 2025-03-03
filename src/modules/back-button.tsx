import { useNavigate } from '@solidjs/router';
import { arrowLeft } from 'solid-heroicons/outline';
import { Icon } from 'solid-heroicons';

export function BackButton() {
  const navigate = useNavigate();

  return (
    <button
      class="flex cursor-pointer items-center px-4 transition-colors hover:text-gray-600"
      onClick={() => navigate(-1)}
    >
      <Icon path={arrowLeft} class="size-6" />
    </button>
  );
}
