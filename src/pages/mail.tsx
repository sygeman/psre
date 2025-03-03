import { BackLayout } from '../layouts/back-layout';
import { createSignal, For } from 'solid-js';

type Mail = {
  id: number;
  title: string;
  message: string;
  date: string;
  isRead: boolean;
  hasReward?: {
    type: 'food' | 'wood' | 'steel' | 'fuel' | 'diamond' | 'serum' | 'exp';
    amount: number;
  };
};

// Временные данные для демонстрации
const DEMO_MAILS: Mail[] = [
  {
    id: 1,
    title: 'Добро пожаловать!',
    message: 'Добро пожаловать в игру! Примите этот подарок в знак нашей благодарности.',
    date: '2024-03-20',
    isRead: false,
    hasReward: { type: 'diamond', amount: 100 },
  },
  {
    id: 2,
    title: 'Ежедневный бонус',
    message: 'Ваш ежедневный бонус готов к получению!',
    date: '2024-03-19',
    isRead: false,
    hasReward: { type: 'serum', amount: 50 },
  },
  {
    id: 3,
    title: 'Системное уведомление',
    message: 'Технические работы запланированы на 25 марта.',
    date: '2024-03-18',
    isRead: true,
  },
];

export function MailPage() {
  const [mails, setMails] = createSignal(DEMO_MAILS);

  const getRewardIcon = (type: Mail['hasReward']['type']) => {
    switch (type) {
      case 'food':
        return '🌾';
      case 'wood':
        return '🪵';
      case 'steel':
        return '🔩';
      case 'fuel':
        return '🛢️';
      case 'diamond':
        return '💎';
      case 'serum':
        return '🧪';
      case 'exp':
        return '✨';
    }
  };

  const handleMailClick = (mail: Mail) => {
    if (!mail.isRead) {
      setMails(prev =>
        prev.map(m =>
          m.id === mail.id ? { ...m, isRead: true } : m
        )
      );
    }
  };

  return (
    <BackLayout title="Почта">
      <div class="flex h-full flex-col">
        <div class="hide-scrollbar flex-1 overflow-y-auto">
          <div class="divide-y divide-slate-700/25">
            <For each={mails()}>
              {(mail) => (
                <div
                  class={`flex cursor-pointer flex-col gap-2 p-4 transition-colors hover:bg-slate-800 ${
                    !mail.isRead ? 'bg-slate-800/50' : ''
                  }`}
                  onClick={() => handleMailClick(mail)}
                >
                  <div class="flex items-center justify-between">
                    <div class="flex items-center gap-2">
                      {!mail.isRead && (
                        <div class="size-2 rounded-full bg-blue-500" />
                      )}
                      <div class="font-medium">{mail.title}</div>
                    </div>
                    <div class="text-sm text-slate-400">{mail.date}</div>
                  </div>
                  <div class="text-sm text-slate-400">{mail.message}</div>
                  {mail.hasReward && (
                    <div class="flex items-center gap-1 text-sm">
                      <span>Награда:</span>
                      <span>{getRewardIcon(mail.hasReward.type)}</span>
                      <span>{mail.hasReward.amount.toLocaleString('en-US')}</span>
                    </div>
                  )}
                </div>
              )}
            </For>
          </div>
        </div>
      </div>
    </BackLayout>
  );
} 