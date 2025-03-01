import { HeroCard } from "../components/hero-card";
import { BackButton } from "../modules/back-button";
import { accountState } from "../stores/state";

export function HeroesPage() {

  return (
    <div class="relative flex flex-col h-screen">
      <div class="h-12 flex bg-slate-800 justify-center items-center relative">
        <div class="left-0 absolute"><BackButton /></div>
        <div class="text-lg">Герои</div>
        <div class="right-0 absolute px-2">S {Number(accountState.serum).toLocaleString('en-US')}</div>
      </div>
      <div>
      <div class="h-12 w-full"></div>
      <div class="grid grid-cols-4 gap-4 px-4">
        <HeroCard
          name="Hero 1"
          level={40}
          starLevel={2}
          upgradeLevel={1}
          style="green"
          type="F"
        />
        <HeroCard
          name="Hero 2"
          level={3}
          starLevel={4}
          upgradeLevel={2}
          style="red"
          type="S"
        />
        <HeroCard
          name="Hero 3"
          level={123}
          starLevel={5}
          upgradeLevel={7}
          style="yellow"
          type="R"
        />
        <HeroCard
          name="Hero 4"
          level={230}
          starLevel={6}
          upgradeLevel={8}
          style="blue"
          type="E"
        />
        <HeroCard
          name="Hero 5"
          level={320}
          starLevel={6}
          upgradeLevel={5}
          style="purple"
          type="R"
        />
      </div>
      </div>
    </div>
  );
}
