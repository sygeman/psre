import { createSignal } from 'solid-js';

export type ChatChannel = 'region' | 'alliance';

export interface Message {
  id: string;
  text: string;
  sender: 'user' | 'other';
  timestamp: Date;
  author: string;
  avatar: string;
  channel: ChatChannel;
}

const [messages, setMessages] = createSignal<Message[]>([]);
const [activeChannel, setActiveChannel] = createSignal<ChatChannel>('region');
let autoMessageInterval: number | undefined;

const sendAutoMessage = () => {
  const messages = [
    'Командиры, обратите внимание на новую аномалию в секторе B-7! По предварительным данным, там обнаружены следы древней цивилизации и ценные артефакты.',
    'Разведка докладывает о крупном скоплении пиратских кораблей на границе региона. Рекомендуется усилить оборону и координировать действия флота.',
    'Срочное сообщение: в системе HD-459 обнаружено гравитационное возмущение. Все торговые маршруты временно перенаправлены через сектор C-12.',
    'Внимание всем участникам: открыт новый торговый маршрут через туманность Андромеды. Повышенные риски, но и награда соответствующая!',
    'Исследовательская станция "Альфа-9" сообщает об успешном завершении экспериментов с новым типом щитов. Приглашаются добровольцы для тестирования.',
    'Обнаружен новый тип ресурсов в астероидном поле сектора D-15. Требуется координация действий для эффективной добычи.',
    'Альянс "Северное сияние" предлагает взаимовыгодное сотрудничество в освоении новых территорий. Нужны опытные пилоты и инженеры.',
    'Внимание! В секторе E-8 зафиксирована активность неизвестной расы. Все исследовательские корабли должны соблюдать протокол безопасности.'
  ];
  
  const randomMessage = messages[Math.floor(Math.random() * messages.length)];
  const channels: ChatChannel[] = ['region', 'alliance'];
  const randomChannel = channels[Math.floor(Math.random() * channels.length)];
  
  const authors = {
    region: ['Диспетчер', 'Разведка', 'Система безопасности', 'Торговая гильдия'],
    alliance: ['Командор', 'Стратег', 'Координатор', 'Дипломат']
  };
  
  const randomAuthor = authors[randomChannel][Math.floor(Math.random() * authors[randomChannel].length)];
  
  const message: Message = {
    id: Date.now().toString(),
    text: randomMessage,
    sender: 'other',
    timestamp: new Date(),
    author: randomAuthor,
    avatar: `/avatars/${randomAuthor.toLowerCase()}.jpg`,
    channel: randomChannel
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
      avatar: '/avatars/alex.jpg',
      channel: 'region'
    },
    {
      id: '2',
      text: 'Спасибо за внимание! Уже завершил основной периметр и установил турели. Сейчас работаю над усилением защиты складов с ресурсами.',
      sender: 'user',
      timestamp: new Date(Date.now() - 3300000),
      author: 'Командир',
      avatar: '/avatars/commander.jpg',
      channel: 'region'
    },
    {
      id: '3',
      text: 'Отличная работа! А какой уровень у турелей? Я недавно обновил свои до 5 уровня, урон впечатляет.',
      sender: 'other',
      timestamp: new Date(Date.now() - 3000000),
      author: 'Алексей',
      avatar: '/avatars/alex.jpg',
      channel: 'region'
    },
    {
      id: '4',
      text: 'Пока только 3 уровень, но планирую улучшить. Для этого и нужны дополнительные ресурсы.',
      sender: 'user',
      timestamp: new Date(Date.now() - 2700000),
      author: 'Командир',
      avatar: '/avatars/commander.jpg',
      channel: 'region'
    },
    {
      id: '5',
      text: 'Приветствую всех членов альянса! У кого-нибудь есть лишние ресурсы для улучшения турелей?',
      sender: 'user',
      timestamp: new Date(Date.now() - 900000),
      author: 'Командир',
      avatar: '/avatars/commander.jpg',
      channel: 'alliance'
    },
    {
      id: '6',
      text: 'Я могу поделиться. Сколько нужно?',
      sender: 'other',
      timestamp: new Date(Date.now() - 600000),
      author: 'Мария',
      avatar: '/avatars/maria.jpg',
      channel: 'alliance'
    },
    {
      id: '7',
      text: 'Нужно примерно 5000 единиц металла для апгрейда до 4 уровня.',
      sender: 'user',
      timestamp: new Date(Date.now() - 300000),
      author: 'Командир',
      avatar: '/avatars/commander.jpg',
      channel: 'alliance'
    }
  ];

  setMessages(mockMessages);
  startAutoMessages();
};

export const chatStore = {
  messages,
  activeChannel,
  setActiveChannel,
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