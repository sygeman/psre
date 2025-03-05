import { AnimatedNumber } from '@/components/animated-number';
import { BackLayout } from '@/layouts/back-layout';
import { createSignal, For } from 'solid-js';

type TabType = 'info' | 'members' | 'diplomacy';

type AllianceMember = {
  id: number;
  name: string;
  rank: string;
  power: number;
  lastOnline: string;
  avatar?: string;
};

type Alliance = {
  name: string;
  tag: string;
  level: number;
  power: number;
  members: AllianceMember[];
  description: string;
};

export function AlliancePage() {
  const [activeTab, setActiveTab] = createSignal<TabType>('info');

  // Моковые данные для примера
  const alliance: Alliance = {
    name: 'Северное Сияние',
    tag: '[NS]',
    level: 5,
    power: 1250000,
    description:
      'Один из сильнейших альянсов северного региона. Мы всегда готовы принять в свои ряды активных игроков, стремящихся к развитию и взаимопомощи.',
    members: [
      {
        id: 1,
        name: 'Commander_Alex',
        rank: 'Лидер',
        power: 250000,
        lastOnline: 'Онлайн',
      },
      {
        id: 2,
        name: 'IronStar',
        rank: 'Генерал',
        power: 180000,
        lastOnline: '5 мин. назад',
      },
      {
        id: 3,
        name: 'StarDust',
        rank: 'Офицер',
        power: 150000,
        lastOnline: '1 час назад',
      },
    ],
  };

  return (
    <BackLayout title="Альянс">
      <div class="flex h-full flex-col">
        {/* Информация об альянсе */}
        <div class="border-b border-slate-700/25 p-4">
          <div class="flex items-center gap-4">
            <div class="flex h-16 w-16 items-center justify-center rounded-lg bg-slate-800 text-2xl font-bold">
              {alliance.tag}
            </div>
            <div>
              <div class="text-lg font-medium">{alliance.name}</div>
              <div class="flex items-center gap-4 text-sm text-slate-400">
                <div>Уровень {alliance.level}</div>
                <div>{alliance.power.toLocaleString('en-US')} 🔥</div>
              </div>
            </div>
          </div>
        </div>

        {/* Вкладки */}
        <div class="grid grid-cols-3 border-b border-slate-700/25">
          <button
            class={`p-4 text-sm ${
              activeTab() === 'info'
                ? 'border-b-2 border-blue-500 font-medium'
                : 'text-slate-400'
            }`}
            onClick={() => setActiveTab('info')}
          >
            Информация
          </button>
          <button
            class={`p-4 text-sm ${
              activeTab() === 'members'
                ? 'border-b-2 border-blue-500 font-medium'
                : 'text-slate-400'
            }`}
            onClick={() => setActiveTab('members')}
          >
            Участники
          </button>
          <button
            class={`p-4 text-sm ${
              activeTab() === 'diplomacy'
                ? 'border-b-2 border-blue-500 font-medium'
                : 'text-slate-400'
            }`}
            onClick={() => setActiveTab('diplomacy')}
          >
            Дипломатия
          </button>
        </div>

        {/* Контент вкладок */}
        <div class="hide-scrollbar flex-1 overflow-y-auto">
          {activeTab() === 'info' && (
            <div class="space-y-4 p-4">
              <div class="rounded-lg bg-slate-800 p-4">
                <div class="mb-2 text-sm font-medium">Описание</div>
                <div class="text-sm text-slate-400">{alliance.description}</div>
              </div>
              <div class="rounded-lg bg-slate-800 p-4">
                <div class="mb-2 text-sm font-medium">
                  Требования для вступления
                </div>
                <div class="space-y-2 text-sm text-slate-400">
                  <div>• Минимальная мощь: 50,000</div>
                  <div>• Ежедневная активность</div>
                  <div>• Участие в событиях альянса</div>
                </div>
              </div>
            </div>
          )}

          {activeTab() === 'members' && (
            <div class="divide-y divide-slate-700/25">
              <For each={alliance.members}>
                {(member) => (
                  <div class="flex items-center gap-3 p-4">
                    <div class="h-12 w-12 shrink-0 overflow-hidden rounded-full bg-slate-700">
                      {member.avatar ? (
                        <img
                          src={member.avatar}
                          alt={member.name}
                          class="h-full w-full object-cover"
                        />
                      ) : (
                        <div class="flex h-full w-full items-center justify-center text-xl font-medium">
                          {member.name[0]}
                        </div>
                      )}
                    </div>
                    <div class="min-w-0 flex-1">
                      <div class="flex items-center justify-between">
                        <div class="font-medium">{member.name}</div>
                        <div class="text-sm text-slate-400">
                          <AnimatedNumber value={member.power} /> 🔥
                        </div>
                      </div>
                      <div class="flex items-center justify-between">
                        <div class="text-sm text-slate-400">{member.rank}</div>
                        <div class="text-sm text-slate-400">
                          {member.lastOnline}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </For>
            </div>
          )}

          {activeTab() === 'diplomacy' && (
            <div class="p-4">
              <div class="rounded-lg bg-slate-800 p-4">
                <div class="mb-4 text-sm font-medium">
                  Дипломатические отношения
                </div>
                <div class="space-y-4">
                  <div>
                    <div class="mb-2 text-sm text-green-400">Союзники</div>
                    <div class="text-sm text-slate-400">
                      Нет активных союзов
                    </div>
                  </div>
                  <div>
                    <div class="mb-2 text-sm text-red-400">Враги</div>
                    <div class="text-sm text-slate-400">
                      Нет объявленных войн
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </BackLayout>
  );
}
