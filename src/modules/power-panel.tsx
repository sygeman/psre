import { accountState } from '@/stores/state';
import { useNavigate } from '@solidjs/router';

export const PowerPanel = () => {
  const navigate = useNavigate();

  return (
    <div class="text flex h-8 items-center">
      <span
        class="flex h-full cursor-pointer items-center bg-yellow-700 px-2 hover:bg-yellow-600"
        onClick={() => navigate('/vip')}
      >
        VIP 1
      </span>
      <span class="flex h-full items-center gap-1 bg-slate-700 px-2">
        💪 {Number(accountState.power).toLocaleString('en-US')}
      </span>
    </div>
  );
};
