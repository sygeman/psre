import { createSignal } from 'solid-js';

export interface Message {
  id: string;
  text: string;
  sender: 'user' | 'other';
  timestamp: Date;
  author: string;
  avatar: string;
}

const [messages, setMessages] = createSignal<Message[]>([]);
let autoMessageInterval: number | undefined;

const sendAutoMessage = () => {
  const messages = [
    'Привет, как дела?',
    'Проверяем работу скролла',
    'Тестовое сообщение',
    'Автоматическая отправка работает',
    'Скролл должен прокручиваться вниз'
  ];
  
  const randomMessage = messages[Math.floor(Math.random() * messages.length)];
  const message: Message = {
    id: Date.now().toString(),
    text: randomMessage,
    sender: 'other',
    timestamp: new Date(),
    author: 'Система',
    avatar: '/avatars/system.jpg'
  };

  chatStore.addMessage(message);
};

const startAutoMessages = () => {
  if (!autoMessageInterval) {
    autoMessageInterval = setInterval(sendAutoMessage, 3000);
  }
};

const stopAutoMessages = () => {
  if (autoMessageInterval) {
    clearInterval(autoMessageInterval);
    autoMessageInterval = undefined;
  }
};

const initializeMockMessages = () => {
  const mockMessages: Message[] = [
    {
      id: '1',
      text: 'Заметил, что твоя база активно развивается. Как продвигается строительство нового оборонительного комплекса на северном фланге?',
      sender: 'other',
      timestamp: new Date(Date.now() - 3600000),
      author: 'Алексей',
      avatar: '/avatars/alex.jpg'
    },
    {
      id: '2',
      text: 'Спасибо за внимание! Уже завершил основной периметр и установил турели. Сейчас работаю над усилением защиты складов с ресурсами.',
      sender: 'user',
      timestamp: new Date(Date.now() - 3300000),
      author: 'Командир',
      avatar: '/avatars/commander.jpg'
    },
    {
      id: '3',
      text: 'Отличная работа! А какой уровень у турелей? Я недавно обновил свои до 5 уровня, урон впечатляет.',
      sender: 'other',
      timestamp: new Date(Date.now() - 3000000),
      author: 'Алексей',
      avatar: '/avatars/alex.jpg'
    },
    {
      id: '4',
      text: 'Пока только 3 уровень, но планирую улучшить. Для этого и нужны дополнительные ресурсы.',
      sender: 'user',
      timestamp: new Date(Date.now() - 2700000),
      author: 'Командир',
      avatar: '/avatars/commander.jpg'
    },
    {
      id: '5',
      text: 'Для завершения работ по укреплению казармы срочно требуется дополнительно 2000 единиц металла и 1500 энергетических кристаллов.',
      sender: 'user',
      timestamp: new Date(Date.now() - 900000),
      author: 'Командир',
      avatar: '/avatars/commander.jpg'
    },
    {
      id: '6',
      text: 'Могу поделиться ресурсами. У меня как раз есть излишки после недавней торговой экспедиции. Когда тебе будет удобно провести обмен?',
      sender: 'other',
      timestamp: new Date(Date.now() - 600000),
      author: 'Алексей',
      avatar: '/avatars/alex.jpg'
    },
    {
      id: '7',
      text: 'Было бы отлично встретиться через час. Как раз закончу текущую миссию.',
      sender: 'user',
      timestamp: new Date(Date.now() - 300000),
      author: 'Командир',
      avatar: '/avatars/commander.jpg'
    },
    {
      id: '8',
      text: 'Договорились! Кстати, слышал о новом событии на следующей неделе? Будет турнир по защите баз.',
      sender: 'other',
      timestamp: new Date(Date.now() - 240000),
      author: 'Алексей',
      avatar: '/avatars/alex.jpg'
    },
    {
      id: '9',
      text: 'Да, уже готовлюсь. Собираюсь участвовать. Надеюсь успеть улучшить все системы обороны к началу.',
      sender: 'user',
      timestamp: new Date(Date.now() - 180000),
      author: 'Командир',
      avatar: '/avatars/commander.jpg'
    },
    {
      id: '10',
      text: 'Отлично! Я тоже участвую. Может потренируемся вместе перед турниром? Можем устроить тестовые атаки на базы друг друга.',
      sender: 'other',
      timestamp: new Date(Date.now() - 120000),
      author: 'Алексей',
      avatar: '/avatars/alex.jpg'
    }
  ];

  setMessages(mockMessages);
  // Запускаем автоматическую отправку сообщений сразу после инициализации
  startAutoMessages();
};

export const chatStore = {
  messages,
  addMessage: (message: Message) => {
    const currentMessages = messages();
    const newMessages = [...currentMessages, message];
    if (newMessages.length > 40) {
      // Оставляем только последние 40 сообщений
      setMessages(newMessages.slice(-40));
    } else {
      setMessages(newMessages);
    }
  },
  getLastMessages: (count: number) => {
    return messages().slice(-count);
  },
  initializeMockMessages,
  startAutoMessages,
  stopAutoMessages
}; 