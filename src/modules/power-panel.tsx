import { accountState } from "../stores/state";

export const PowerPanel = () => {
  return (
    <div class="text h-8 flex items-center">
      <span class="px-2 bg-yellow-700 h-full items-center flex">VIP 1</span>
      <span class="px-2 bg-slate-700 h-full items-center flex">P {Number(accountState.power).toLocaleString('en-US')}</span>
    </div>
  );
};
