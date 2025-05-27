import { For } from "solid-js";
import { SlotMachine } from './slot-machine';
import { SLOTS_CONFIG } from '@/constants/slots';

export function SlotMachinePage() {
  return (
    <div class="h-full flex flex-col">
      {/* Заголовок и описание */}
      <div class="flex-shrink-0 p-4 border-b border-slate-700/25">
        <h1 class="text-2xl font-bold text-white mb-2">Испытай удачу</h1>
        <p class="text-slate-400 text-sm leading-relaxed">
          Попытайте удачу и выиграйте ценные ресурсы! В этой мини-игре вы можете получить:
        </p>
        <div class="mt-3 space-y-2">
          <For each={Object.entries(SLOTS_CONFIG.REWARDS)}>{([symbol, reward]) => (
            <div class="flex items-center gap-2 text-sm">
              <span class="text-xl">{symbol}</span>
              <span class="text-slate-300">
                {reward.amount.toLocaleString('ru-RU')} {reward.name}
              </span>
            </div>
          )}</For>
        </div>
        <p class="mt-3 text-sm text-slate-500">
          У вас есть {SLOTS_CONFIG.ATTEMPTS.MAX} попыток, которые восстанавливаются каждые {SLOTS_CONFIG.ATTEMPTS.RESTORE_TIME / 1000} секунд.
        </p>
      </div>

      {/* Слот-машина */}
      <div class="flex-1">
        <SlotMachine />
      </div>
    </div>
  );
} 