export const ResourcesPanel = () => {
  const food = 400;
  const wood = 400;
  const steal = 400;
  const fuel = 400;
  const diamond = 400;

  return (
    <div class="grid px-4 w-full h-8 grid-cols-5">
      <div class="flex items-center">F {food}</div>
      <div class="flex items-center">W {wood}</div>
      <div class="flex items-center">S {steal}</div>
      <div class="flex items-center">F {fuel}</div>
      <div class="flex items-center">D {diamond}+</div>
    </div>
  );
};
