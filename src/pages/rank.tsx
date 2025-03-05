import { BackLayout } from '@/layouts/back-layout';
import { For } from 'solid-js';
import { AnimatedNumber } from '@/components/animated-number';
import { CharacterAvatar } from '@/components/character-avatar';

export function RankPage() {
  const players = Array.from({ length: 100 }, (_, index) => ({
    id: index + 1,
    name: `Игрок ${index + 1}`,
    alliance: index % 5 === 0 ? null : `Альянс ${Math.floor(index / 5) + 1}`,
    power: Math.floor(1000000 * Math.pow(0.99, index)), // Экспоненциальное уменьшение мощи
  }));

  // Предположим, что это данные текущего игрока
  const currentPlayer = {
    id: 15,
    name: 'Игрок 15',
    alliance: 'Альянс 3',
    power: Math.floor(1000000 * Math.pow(0.99, 14)), // Соответствующая мощь для 15-го места
  };

  const getRowStyle = (rank: number) => {
    switch (rank) {
      case 1:
        return `
          relative overflow-hidden
          before:absolute before:inset-0 
          before:bg-gradient-to-r before:from-yellow-500/10 before:via-yellow-400/20 before:to-yellow-500/10
          after:absolute after:inset-0 
          after:bg-[radial-gradient(circle_at_50%_50%,rgba(234,179,8,0.1),transparent_60%)]
          after:animate-[pulse_3s_ease-in-out_infinite]
        `;
      case 2:
        return `
          relative overflow-hidden
          before:absolute before:inset-0 
          before:bg-gradient-to-r before:from-slate-400/10 before:via-slate-300/20 before:to-slate-400/10
          after:absolute after:inset-0 
          after:bg-[radial-gradient(circle_at_50%_50%,rgba(226,232,240,0.1),transparent_60%)]
          after:animate-[pulse_3s_ease-in-out_infinite]
        `;
      case 3:
        return `
          relative overflow-hidden
          before:absolute before:inset-0 
          before:bg-gradient-to-r before:from-amber-600/10 before:via-amber-500/20 before:to-amber-600/10
          after:absolute after:inset-0 
          after:bg-[radial-gradient(circle_at_50%_50%,rgba(217,119,6,0.1),transparent_60%)]
          after:animate-[pulse_3s_ease-in-out_infinite]
        `;
      default:
        return '';
    }
  };

  const getRankStyle = (rank: number) => {
    switch (rank) {
      case 1:
        return `
          bg-gradient-to-br from-yellow-500/90 to-amber-400/90 
          text-white font-bold 
          relative overflow-hidden
          px-2.5 py-1
          before:absolute before:inset-0
          before:bg-gradient-to-r before:from-transparent before:via-white/20 before:to-transparent
          before:animate-[shine_2s_ease-in-out_infinite]
        `;
      case 2:
        return `
          bg-gradient-to-br from-slate-600/80 to-slate-500/80
          text-white font-bold
          relative overflow-hidden
          px-2.5 py-1
          before:absolute before:inset-0
          before:bg-gradient-to-r before:from-transparent before:via-white/20 before:to-transparent
          before:animate-[shine_2s_ease-in-out_infinite]
        `;
      case 3:
        return `
          bg-gradient-to-br from-orange-900/90 to-amber-800/90
          text-white font-bold
          relative overflow-hidden
          px-2.5 py-1
          before:absolute before:inset-0
          before:bg-gradient-to-r before:from-transparent before:via-white/20 before:to-transparent
          before:animate-[shine_2s_ease-in-out_infinite]
        `;
      default:
        return 'bg-slate-800 text-slate-400 px-1.5 py-0.5';
    }
  };

  const PlayerRow = (player: typeof players[0]) => (
    <div 
      class={`relative flex items-center gap-4 px-4 py-2 group hover:bg-slate-800/30 transition-colors ${getRowStyle(player.id)}`}
    >
      {player.id <= 3 && (
        <div class="absolute inset-0 opacity-30">
          <div class="absolute w-12 h-12 -left-6 -top-6 bg-white/10 rounded-full blur-xl animate-[pulse_3s_ease-in-out_infinite]" />
          <div class="absolute w-12 h-12 -right-6 -bottom-6 bg-white/10 rounded-full blur-xl animate-[pulse_3s_ease-in-out_infinite_0.5s]" />
        </div>
      )}
      
      <div class={`w-10 rounded-md text-center ${getRankStyle(player.id)}`}>
        {player.id}
      </div>
      <div class="h-10 w-10 relative z-10">
        <CharacterAvatar class="h-10 w-10" />
      </div>
      <div class="flex flex-1 flex-col relative z-10">
        <div class="font-medium text-amber-50/90">{player.name}</div>
        <div class="text-sm text-slate-400">
          {player.alliance || 'Нет альянса'}
        </div>
      </div>
      <div class="text-right text-amber-50/90 relative z-10">
        <AnimatedNumber value={player.power} compact={false} />
      </div>
    </div>
  );

  const CurrentPlayerRow = (
    <div class="border-t border-slate-700 bg-slate-800">
      {PlayerRow(currentPlayer)}
    </div>
  );

  return (
    <BackLayout 
      title="Личный Ранг по Мощи"
      bottomContent={CurrentPlayerRow}
    >
      <div class="flex flex-col h-full">
        <div class="flex h-10 shrink-0 items-center border-b border-slate-700 px-4 text-xs text-slate-400 bg-slate-950 sticky top-0 z-20">
          <div class="w-10 text-center">Ранг</div>
          <div class="w-10" />
          <div class="flex-1 pl-4">Командир</div>
          <div>Мощь</div>
        </div>

        <div class="flex-1 overflow-y-auto">
          <div class="divide-y divide-slate-700/25">
            <For each={players}>
              {(player) => PlayerRow(player)}
            </For>
          </div>
        </div>
      </div>
    </BackLayout>
  );
}
