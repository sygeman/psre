import { BackButton } from '../modules/back-button';

export function ShopPage() {
  return (
    <div class="relative flex flex-col h-screen">
      <div class="h-12 flex bg-slate-800 justify-center items-center relative">
        <div class="left-0 absolute">
          <BackButton />
        </div>
        <div class="text-lg">Магазин</div>
      </div>
    </div>
  );
} 