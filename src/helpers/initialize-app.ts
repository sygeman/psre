import { directus } from '@/lib/directus';
import { GET_ACCOUNT } from '@/graphql/queries';
import { updateStateFromData } from '@/stores/state';
import { chatStore } from '@/stores/chat';
import { accountStateSubscription } from '@/subscriptions/account-state';
import { chatSubscription } from '@/subscriptions/chat';
import { initAllianceHelp } from '@/stores/alliance';

// WebSocket соединение
let ws: WebSocket | null = null;

const initWebSocket = () => {
  const wsUrl = `ws://localhost:4000/ws`;
  
  try {
    ws = new WebSocket(wsUrl);
    
    ws.onopen = () => {
      console.log('WebSocket соединение установлено');
    };
    
    ws.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        console.log('WebSocket сообщение получено:', data);
        
        // Обработка разных типов сообщений
        switch (data.type) {
          case 'welcome':
            console.log('Добро пожаловать в WebSocket');
            break;
          case 'echo':
            console.log('Echo ответ:', data.data);
            break;
          default:
            console.log('Неизвестный тип сообщения:', data);
        }
      } catch (error) {
        console.error('Ошибка парсинга WebSocket сообщения:', error);
      }
    };
    
    ws.onclose = () => {
      console.log('WebSocket соединение закрыто');
      // Переподключение через 3 секунды
      setTimeout(initWebSocket, 3000);
    };
    
    ws.onerror = (error) => {
      console.error('WebSocket ошибка:', error);
    };
    
  } catch (error) {
    console.error('Не удалось установить WebSocket соединение:', error);
  }
};

export const sendWebSocketMessage = (message: any) => {
  if (ws && ws.readyState === WebSocket.OPEN) {
    ws.send(typeof message === 'string' ? message : JSON.stringify(message));
  } else {
    console.warn('WebSocket не подключен');
  }
};

export const initializeApp = async () => {
  try {
    await directus.connect();

    // Инициализация WebSocket соединения
    initWebSocket();

    // Будем получать на основе авторизации
    const accountId = 'ba12e291-2e9c-452e-ae06-81c1a885390e';

    const accountQuery = await directus.query(GET_ACCOUNT, {
      id: accountId,
    });

    const account = accountQuery?.psre_account_by_id;

    console.log(account);

    const state = account?.state[0];
    const stateId = state?.id;
    const regionChatId = account?.region_id?.chat_id?.id;
    const allianceChatId = account?.alliance_id?.chat_id?.id;

    chatStore.setChatIds(regionChatId, allianceChatId);
    chatStore.addMessagesToChannel('region', account.region_id.chat_id.messages)
    chatStore.addMessagesToChannel('alliance', account.alliance_id.chat_id.messages)
    
    updateStateFromData(state);
    accountStateSubscription(stateId);
    chatSubscription('region', regionChatId);
    chatSubscription('alliance', allianceChatId);

    // Инициализация увеличения помощи альянса
    initAllianceHelp();

    return true;
  } catch (error) {
    console.error('Не удалось инициализировать приложение:', error);
    return false;
  }
};
