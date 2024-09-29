export const PersonPanel = () => {
  const lvl = 40;

  return (
    <div class="text-sm bg-slate-800 w-24">
      <div class="flex size-24 bg-slate-700 relative">
        <div class="absolute left-1 top-1 bg-black px-1">{lvl}</div>
      </div>

      <div class="w-full relative flex items-center h-6 bg-black">
        <div class="flex absolute left-0 top-0 bg-orange-500 w-3/4 h-6 opacity-30"></div>
        <div class="absolute left-2">SP</div>
        <div class="w-full flex justify-center  pl-4">20 / 120</div>
      </div>

      <div class="w-full relative flex items-center h-6 bg-black">
        <div class="flex absolute left-0 top-0 bg-blue-500 w-3/4 h-6 opacity-30"></div>
        <div class="absolute left-2">AP</div>
        <div class="w-full flex justify-center  pl-4">20 / 120</div>
      </div>
    </div>
  );
};
