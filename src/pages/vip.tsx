import { HeroCard } from '../components/hero-card';
import { BackButton } from '../modules/back-button';
import { accountState } from '../stores/state';

export function VipPage() {
  return (
    <div class="relative flex flex-col h-screen">
      <div class="h-12 flex bg-slate-800 justify-center items-center relative">
        <div class="left-0 absolute">
          <BackButton />
        </div>
        <div class="text-lg">VIP Привилегии</div>
        <div class="right-0 absolute px-2">
          💎 {Number(accountState.diamond).toLocaleString('en-US')}
        </div>
      </div>
      <div>
        <div class="h-12 w-full" />
        <div class="grid grid-cols-4 gap-2 px-2">
          <HeroCard
            name="VIP 1"
            level={1}
            starLevel={1}
            upgradeLevel={0}
            heroStyle="green"
            type="V"
          />
          <HeroCard
            name="VIP 2"
            level={2}
            starLevel={2}
            upgradeLevel={0}
            heroStyle="blue"
            type="V"
          />
          <HeroCard
            name="VIP 3"
            level={3}
            starLevel={3}
            upgradeLevel={0}
            heroStyle="purple"
            type="V"
          />
          <HeroCard
            name="VIP 4"
            level={4}
            starLevel={4}
            upgradeLevel={0}
            heroStyle="red"
            type="V"
          />
          <HeroCard
            name="VIP 5"
            level={5}
            starLevel={5}
            upgradeLevel={0}
            heroStyle="yellow"
            type="V"
          />
        </div>
      </div>
    </div>
  );
} 