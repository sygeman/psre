import { createSignal, For, onMount, createEffect, onCleanup } from 'solid-js';
import { chatStore, type Message } from '../stores/chat';
import { BackButton } from '../modules/back-button';
import { Icon } from 'solid-heroicons';
import { paperAirplane, arrowDown } from 'solid-heroicons/outline';

export default function ChatPage() {
  const [newMessage, setNewMessage] = createSignal('');
  const [showScrollButton, setShowScrollButton] = createSignal(false);
  const [isFirstRender, setIsFirstRender] = createSignal(true);
  let chatContainerRef: HTMLDivElement | undefined;
  let textareaRef: HTMLTextAreaElement | undefined;

  const isNearBottom = () => {
    if (chatContainerRef) {
      const threshold = 100; // пикселей от нижней границы
      const position = chatContainerRef.scrollHeight - chatContainerRef.scrollTop - chatContainerRef.clientHeight;
      return position <= threshold;
    }
    return true;
  };

  const forceScrollToBottom = () => {
    if (chatContainerRef) {
      chatContainerRef.scrollTop = chatContainerRef.scrollHeight;
    }
  };

  const scrollToBottom = () => {
    if (chatContainerRef && isNearBottom()) {
      chatContainerRef.scrollTop = chatContainerRef.scrollHeight;
    }
  };

  const adjustTextareaHeight = () => {
    if (textareaRef) {
      textareaRef.style.height = 'auto';
      textareaRef.style.height = Math.min(textareaRef.scrollHeight, 150) + 'px';
    }
  };

  const handleScroll = () => {
    if (chatContainerRef) {
      setShowScrollButton(!isNearBottom());
    }
  };

  onMount(() => {
    scrollToBottom();
    adjustTextareaHeight();
    // Добавляем слушатель события прокрутки
    chatContainerRef?.addEventListener('scroll', handleScroll);
  });

  onCleanup(() => {
    // Удаляем слушатель события прокрутки
    chatContainerRef?.removeEventListener('scroll', handleScroll);
  });

  createEffect(() => {
    // Если это первый рендер и контейнер готов
    if (isFirstRender() && chatContainerRef) {
      forceScrollToBottom();
      setIsFirstRender(false);
    }
  });

  createEffect(() => {
    // Вызываем scrollToBottom при изменении списка сообщений
    chatStore.messages();
    // Скроллим только если пользователь близко к низу
    setTimeout(scrollToBottom, 0);
  });

  const handleInput = (e: Event) => {
    const target = e.target as HTMLTextAreaElement;
    setNewMessage(target.value);
    adjustTextareaHeight();
  };

  const handleSendMessage = (e: Event) => {
    e.preventDefault();
    if (!newMessage().trim()) return;

    const message: Message = {
      id: Date.now().toString(),
      text: newMessage(),
      sender: 'user',
      timestamp: new Date(),
      author: 'Командир',
      avatar: '/avatars/commander.jpg'
    };

    chatStore.addMessage(message);
    setNewMessage('');
    if (textareaRef) {
      textareaRef.style.height = 'auto';
    }
    forceScrollToBottom(); // Принудительная прокрутка при отправке сообщения
  };

  return (
    <div class="relative flex flex-col h-screen bg-slate-900">
      <div class="h-12 flex bg-slate-800 justify-center items-center relative">
        <div class="left-0 absolute">
          <BackButton />
        </div>
        <div class="text-lg">Чат</div>
      </div>
      <div 
        class="flex-1 overflow-y-auto p-4 space-y-6"
        ref={chatContainerRef}
      >
        <For each={chatStore.messages()}>
          {(message) => (
            <div
              class={`flex items-start gap-4 ${
                message.sender === 'user' ? 'flex-row-reverse' : 'flex-row'
              }`}
            >
              <div class="w-16 h-16 bg-slate-600 overflow-hidden shrink-0">
                <img 
                  src={message.avatar} 
                  alt={message.author}
                  class="w-full h-full object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="%23ffffff"%3E%3Cpath d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"%2F%3E%3C%2Fsvg%3E';
                  }}
                />
              </div>
              <div class={`flex flex-col gap-1.5 ${message.sender === 'user' ? 'items-end' : 'items-start'}`}>
                <span class="text-sm font-medium text-gray-300">{message.author}</span>
                <div
                  class={`rounded-lg p-3 ${
                    message.sender === 'user'
                      ? 'bg-blue-500 text-white'
                      : 'bg-slate-700 text-gray-100'
                  }`}
                >
                  <p>{message.text}</p>
                </div>
              </div>
            </div>
          )}
        </For>
      </div>
      {/* Кнопка прокрутки вниз */}
      {showScrollButton() && (
        <button
          onClick={forceScrollToBottom}
          class="fixed bottom-24 right-4 w-10 h-10 bg-blue-500 text-white rounded-full shadow-lg flex items-center justify-center hover:bg-blue-600 transition-colors"
          title="К новым сообщениям"
        >
          <Icon path={arrowDown} class="w-5 h-5" />
        </button>
      )}
      <form onSubmit={handleSendMessage} class="p-4 bg-slate-800 border-t border-slate-700">
        <div class="flex space-x-2">
          <textarea
            ref={textareaRef}
            rows={1}
            value={newMessage()}
            onInput={handleInput}
            placeholder="Введите сообщение..."
            class="flex-1 px-4 py-2 bg-slate-700 text-white border-slate-600 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400 resize-none min-h-[40px] max-h-[150px]"
          />
          <button
            type="submit"
            class="w-10 h-10 flex items-center justify-center bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 shrink-0"
            title="Отправить"
          >
            <Icon path={paperAirplane} class="w-5 h-5 -rotate-45" />
          </button>
        </div>
      </form>
    </div>
  );
} 