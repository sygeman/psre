import { BackLayout } from '../layouts/back-layout';
import { For } from 'solid-js';

export function RankPage() {
  const players = Array.from({ length: 50 }, (_, index) => ({
    id: index + 1,
    name: `Игрок ${index + 1}`,
    alliance: index % 5 === 0 ? null : `Альянс ${Math.floor(index / 5) + 1}`,
    power: 1000000 - index * 12345,
  }));

  const getRankStyle = (rank: number) => {
    switch (rank) {
      case 1:
        return 'bg-gradient-to-r from-yellow-500 to-amber-500 text-white font-bold ring-2 ring-yellow-300 ring-opacity-50 [text-shadow:_0_1px_0_rgb(0_0_0_/_40%)]';
      case 2:
        return 'bg-gradient-to-r from-slate-400 to-slate-500 text-white font-bold ring-2 ring-slate-300 ring-opacity-50 [text-shadow:_0_1px_0_rgb(0_0_0_/_40%)]';
      case 3:
        return 'bg-gradient-to-r from-amber-700 to-orange-800 text-white font-bold ring-2 ring-amber-500 ring-opacity-50 [text-shadow:_0_1px_0_rgb(0_0_0_/_40%)]';
      default:
        return 'text-slate-400';
    }
  };

  return (
    <BackLayout title="Личный Ранг по Мощи">
      <div class="flex h-full flex-col">
        <div class="flex h-12 items-center border-b border-slate-700 px-4 text-sm text-slate-400">
          <div class="w-8 text-center">Ранг</div>
          <div class="w-10" />
          <div class="flex-1 pl-4">Командир</div>
          <div>Мощь</div>
        </div>
        <div class="hide-scrollbar flex-1 overflow-y-auto">
          <div class="divide-y divide-slate-700/25">
            <For each={players}>
              {(player) => (
                <div class="flex items-center gap-4 px-4 py-2">
                  <div class={`w-8 text-center rounded-md px-1.5 py-0.5 ${getRankStyle(player.id)}`}>
                    {player.id}
                  </div>
                  <div class="flex h-10 w-10 items-center justify-center rounded bg-slate-800">
                    👤
                  </div>
                  <div class="flex flex-1 flex-col">
                    <div class="font-medium">{player.name}</div>
                    <div class="text-sm text-slate-400">
                      {player.alliance || 'Нет альянса'}
                    </div>
                  </div>
                  <div class="text-right">
                    {player.power.toLocaleString('en-US')}
                  </div>
                </div>
              )}
            </For>
          </div>
        </div>
      </div>
    </BackLayout>
  );
}
