import { BackButton } from '../modules/back-button';
import { accountState } from '../stores/state';
import { createSignal, Match, Switch } from 'solid-js';
import { Tab, Tabs } from '../components/tabs';
import { EquipmentPage } from '../modules/equipment-page';
import { PointsProgressBar } from '../components/points-progress-bar';
import { CharacterAvatar } from '../components/character-avatar';

const PERSON_TABS: Tab[] = [
  { id: 'equipment', label: 'Снаряжение' },
  { id: 'chip', label: 'Чип' },
  { id: 'module', label: 'Модуль' },
  { id: 'cube', label: 'Куб' },
  { id: 'biomod', label: 'Биомодификатор' },
];

export function PersonPage() {
  const [activeTab, setActiveTab] = createSignal('equipment');

  return (
    <div class="relative flex flex-col h-screen">
      <div class="flex flex-col flex-shrink-0">
        <div class="h-12 flex bg-slate-800 justify-center items-center relative">
          <div class="left-0 absolute">
            <BackButton />
          </div>
          <div class="text-lg">Персонаж</div>
        </div>
        <Tabs
          tabs={PERSON_TABS}
          activeTab={activeTab()}
          onTabChange={setActiveTab}
        />
      </div>

      {/* Контент вкладок */}
      <div class="flex-grow overflow-auto hide-scrollbar">
        <Switch>
          <Match when={activeTab() === 'equipment'}>
            <EquipmentPage />
          </Match>
          <Match when={activeTab() === 'chip'}>
            <div class="p-4">
              <div class="text-lg mb-4">Чип</div>
              {/* Здесь будет контент вкладки Чип */}
            </div>
          </Match>
          <Match when={activeTab() === 'module'}>
            <div class="p-4">
              <div class="text-lg mb-4">Модуль</div>
              {/* Здесь будет контент вкладки Модуль */}
            </div>
          </Match>
          <Match when={activeTab() === 'cube'}>
            <div class="p-4">
              <div class="text-lg mb-4">Куб</div>
              {/* Здесь будет контент вкладки Куб */}
            </div>
          </Match>
          <Match when={activeTab() === 'biomod'}>
            <div class="p-4">
              <div class="text-lg mb-4">Биомодификатор</div>
              {/* Здесь будет контент вкладки Биомодификатор */}
            </div>
          </Match>
        </Switch>
      </div>

      {/* Фиксированная информация внизу */}
      <div class="flex-shrink-0 p-4 bg-slate-900 border-t border-slate-700">
        <div class="flex flex-col gap-4">
          {/* Имя и лайки */}
          <div class="flex items-center gap-4">
            <div class="flex items-center gap-1">
              <span>👍</span>
              <span>{Number(accountState.likes || 0).toLocaleString('en-US')}</span>
            </div>
            <div class="font-medium">
              {accountState.name || 'Неизвестный'}
            </div>
          </div>

          {/* Аватар и прогресс бары */}
          <div class="flex gap-4">
            {/* Аватар */}
            <div class="w-16 h-16 bg-slate-800 rounded-lg flex items-center justify-center flex-shrink-0">
              <CharacterAvatar class="w-12 h-12" />
            </div>

            {/* Прогресс бары */}
            <div class="flex flex-col gap-2 flex-grow">
              <PointsProgressBar
                points={() => accountState.exp}
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
            <div class="flex items-center gap-1 justify-center bg-slate-800 rounded-lg py-2">
              <span>💪</span>
              <span>{Number(accountState.power || 0).toLocaleString('en-US')}</span>
            </div>
            <div class="flex items-center gap-1 justify-center bg-slate-800 rounded-lg py-2">
              <span>💀</span>
              <span>{Number(accountState.kills || 0).toLocaleString('en-US')}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 