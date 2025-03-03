import { BackLayout } from '../layouts/back-layout';

export function RankPage() {
  return (
    <BackLayout title="Ранги">
      <div class="flex h-full flex-col">
        <div class="flex h-12 items-center justify-between border-b border-slate-700 px-4">
          <div class="flex items-center gap-2">
            <span>👑</span>
            <span>Топ игроков</span>
          </div>
          <div class="text-sm text-slate-400">Обновлено 2 мин. назад</div>
        </div>
        <div class="hide-scrollbar flex-1 overflow-y-auto">
          {/* Список игроков */}
          <div class="divide-y divide-slate-700">
            {Array.from({ length: 50 }).map((_, index) => (
              <div class="flex items-center gap-4 px-4 py-2">
                <div class="w-6 text-right text-slate-400">#{index + 1}</div>
                <div class="flex h-10 w-10 items-center justify-center rounded bg-slate-800">
                  👤
                </div>
                <div class="flex flex-1 flex-col">
                  <div class="font-medium">Игрок {index + 1}</div>
                  <div class="text-sm text-slate-400">Уровень {20 - (index % 5)}</div>
                </div>
                <div class="flex items-center gap-1">
                  <span>💪</span>
                  <span>{(1000000 - index * 12345).toLocaleString('en-US')}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </BackLayout>
  );
} 