import { HeroCard } from '@/components/hero-card';
import { BackLayout } from '@/layouts/back-layout';
import { accountState } from '@/stores/state';
import { ResourceDisplay } from '@/components/resource-display';

export function HeroesPage() {
  return (
    <BackLayout
      title="Герои"
      rightContent={
        <div class="px-2">
          <ResourceDisplay icon="🧪" value={accountState.serum} />
        </div>
      }
    >
      <div>
        <div class="h-12 w-full" />
        <div class="grid grid-cols-4 gap-2 px-2">
          <HeroCard
            name="Hero 1"
            level={40}
            starLevel={2}
            upgradeLevel={1}
            heroStyle="green"
            type="F"
          />
          <HeroCard
            name="Hero 2"
            level={3}
            starLevel={4}
            upgradeLevel={2}
            heroStyle="red"
            type="S"
          />
          <HeroCard
            name="Hero 3"
            level={123}
            starLevel={5}
            upgradeLevel={7}
            heroStyle="yellow"
            type="R"
          />
          <HeroCard
            name="Hero 4"
            level={230}
            starLevel={6}
            upgradeLevel={8}
            heroStyle="blue"
            type="E"
          />
          <HeroCard
            name="Hero 5"
            level={320}
            starLevel={6}
            upgradeLevel={5}
            heroStyle="purple"
            type="R"
          />
        </div>
      </div>
    </BackLayout>
  );
}
