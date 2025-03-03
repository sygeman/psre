import { BackButton } from '../modules/back-button';

export function VipPage() {
  return (
    <div class="relative flex h-screen flex-col">
      <div class="relative flex h-12 items-center justify-center bg-slate-800">
        <div class="absolute left-0">
          <BackButton />
        </div>
        <div class="text-lg">VIP Привилегии</div>
      </div>
    </div>
  );
}
