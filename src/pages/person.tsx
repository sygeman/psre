import { BackButton } from '../modules/back-button';
import { PointsProgressBar } from '../components/points-progress-bar';
import { accountState } from '../stores/state';
import { createSignal, Match, Switch } from 'solid-js';
import { Tab, Tabs } from '../components/tabs';
import { EquipmentPage } from '../modules/equipment-page';

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
      <div class="flex-grow overflow-auto">
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
          {/* Характеристики */}
          <div class="flex flex-col gap-2">
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

          {/* Мощь */}
          <div class="flex items-center gap-2 text-lg">
            <span>💪</span>
            <span>{Number(accountState.power).toLocaleString('en-US')}</span>
          </div>

          {/* Ресурсы */}
          <div class="grid grid-cols-2 gap-4">
            <div class="flex items-center gap-2">
              <span>🌾</span>
              <span>{Number(accountState.food).toLocaleString('en-US')}</span>
            </div>
            <div class="flex items-center gap-2">
              <span>🪵</span>
              <span>{Number(accountState.wood).toLocaleString('en-US')}</span>
            </div>
            <div class="flex items-center gap-2">
              <span>🔩</span>
              <span>{Number(accountState.steel).toLocaleString('en-US')}</span>
            </div>
            <div class="flex items-center gap-2">
              <span>🛢️</span>
              <span>{Number(accountState.fuel).toLocaleString('en-US')}</span>
            </div>
            <div class="flex items-center gap-2">
              <span>💎</span>
              <span>{Number(accountState.diamond).toLocaleString('en-US')}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 