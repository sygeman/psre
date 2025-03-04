import { BackLayout } from '@/layouts/back-layout';
import { accountState } from '@/stores/state';
import { createSignal, Match, Switch } from 'solid-js';
import { Tab, Tabs } from '@/components/tabs';
import { EquipmentPage } from '@/modules/equipment-page';
import { PointsProgressBar } from '@/components/points-progress-bar';
import { CharacterAvatar } from '@/components/character-avatar';

const PERSON_TABS: Tab[] = [
  { id: 'equipment', label: 'Снаряжение' },
  { id: 'chip', label: 'Чип' },
  { id: 'module', label: 'Модуль' },
  { id: 'cube', label: 'Куб' },
  { id: 'biomod', label: 'Биомод' },
];

export function PersonPage() {
  const [activeTab, setActiveTab] = createSignal('equipment');

  return (
    <BackLayout title="Персонаж">
      <div class="flex flex-shrink-0 flex-col">
        <Tabs
          tabs={PERSON_TABS}
          activeTab={activeTab()}
          onTabChange={setActiveTab}
        />
      </div>

      {/* Контент вкладок */}
      <div class="hide-scrollbar flex-grow overflow-auto">
        <Switch>
          <Match when={activeTab() === 'equipment'}>
            <EquipmentPage />
          </Match>
          <Match when={activeTab() === 'chip'}>
            <div class="p-4">
              <div class="mb-4 text-lg">Чип</div>
              {/* Здесь будет контент вкладки Чип */}
            </div>
          </Match>
          <Match when={activeTab() === 'module'}>
            <div class="p-4">
              <div class="mb-4 text-lg">Модуль</div>
              {/* Здесь будет контент вкладки Модуль */}
            </div>
          </Match>
          <Match when={activeTab() === 'cube'}>
            <div class="p-4">
              <div class="mb-4 text-lg">Куб</div>
              {/* Здесь будет контент вкладки Куб */}
            </div>
          </Match>
          <Match when={activeTab() === 'biomod'}>
            <div class="p-4">
              <div class="mb-4 text-lg">Биомодификатор</div>
              {/* Здесь будет контент вкладки Биомодификатор */}
            </div>
          </Match>
        </Switch>
      </div>

      {/* Фиксированная информация внизу */}
      <div class="flex-shrink-0 border-t border-slate-700 bg-slate-900 p-4">
        <div class="flex flex-col gap-4">
          {/* Имя и лайки */}
          <div class="flex items-center gap-4">
            <div class="flex items-center gap-1">
              <span>👍</span>
              <span>
                {Number(accountState.likes || 0).toLocaleString('en-US')}
              </span>
            </div>
            <div class="font-medium">{accountState.name || 'Неизвестный'}</div>
          </div>

          {/* Аватар и прогресс бары */}
          <div class="flex gap-4">
            {/* Аватар */}
            <div class="flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-lg bg-slate-800">
              <CharacterAvatar class="h-12 w-12" />
            </div>

            {/* Прогресс бары */}
            <div class="flex flex-grow flex-col gap-2">
              <PointsProgressBar
                points={() => accountState.exp}
                max={500000}
                label="XP"
                icon="✨"
                color="bg-purple-500"
              />
              <PointsProgressBar
                points={() => accountState.stamina_points}
                label="SP"
                icon="🔋"
                color="bg-orange-500"
              />
              <PointsProgressBar
                points={() => accountState.action_points}
                label="AP"
                icon="⚡"
                color="bg-blue-500"
              />
            </div>
          </div>

          {/* Мощь и убийства */}
          <div class="grid grid-cols-2 gap-4">
            <div class="flex items-center justify-center gap-1 rounded-lg bg-slate-800 py-2">
              <span>💪</span>
              <span>
                {Number(accountState.power || 0).toLocaleString('en-US')}
              </span>
            </div>
            <div class="flex items-center justify-center gap-1 rounded-lg bg-slate-800 py-2">
              <span>💀</span>
              <span>
                {Number(accountState.kills || 0).toLocaleString('en-US')}
              </span>
            </div>
          </div>
        </div>
      </div>
    </BackLayout>
  );
}
