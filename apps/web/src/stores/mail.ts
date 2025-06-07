import { createStore } from 'solid-js/store';

export type Mail = {
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

const DEMO_MAILS: Mail[] = [
  {
    id: 1,
    title: 'Добро пожаловать!',
    message:
      'Добро пожаловать в игру! Примите этот подарок в знак нашей благодарности.',
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

const [mailState, setMailState] = createStore({
  mails: DEMO_MAILS,
});

export const mailStore = {
  get mails() {
    return mailState.mails;
  },
  get unreadCount() {
    return mailState.mails.filter((mail) => !mail.isRead).length;
  },
  markAsRead(id: number) {
    setMailState('mails', (mails) =>
      mails.map((mail) => (mail.id === id ? { ...mail, isRead: true } : mail))
    );
  },
};
