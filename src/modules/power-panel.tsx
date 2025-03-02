import { accountState } from '../stores/state';
import { useNavigate } from '@solidjs/router';

export const PowerPanel = () => {
  const navigate = useNavigate();

  return (
    <div class="text h-8 flex items-center">
      <span 
        class="px-2 bg-yellow-700 h-full items-center flex cursor-pointer hover:bg-yellow-600"
        onClick={() => navigate('/vip')}
      >
        VIP 1
      </span>
      <span class="px-2 bg-slate-700 h-full items-center flex">
        P {Number(accountState.power).toLocaleString('en-US')}
      </span>
    </div>
  );
};
