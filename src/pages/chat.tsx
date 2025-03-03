import { createSignal, For, onMount, createEffect, onCleanup } from 'solid-js';
import { chatStore, type Message, type ChatChannel } from '../stores/chat';
import { BackButton } from '../modules/back-button';
import { Icon } from 'solid-heroicons';
import { paperAirplane, arrowDown } from 'solid-heroicons/outline';
import { useLocation } from "@solidjs/router";

type LocationState = {
  activeChannel?: ChatChannel;
};

export default function ChatPage() {
  const location = useLocation<LocationState>();
  const initialChannel = location.state?.activeChannel || 'region';
  const [newMessage, setNewMessage] = createSignal('');
  const [showScrollButton, setShowScrollButton] = createSignal(false);
  const [isFirstRender, setIsFirstRender] = createSignal(true);
  const [activeChannel, setActiveChannel] = createSignal<ChatChannel>(initialChannel);
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

  createEffect(() => {
    // Следим за изменением активного канала
    activeChannel();
    // При смене канала прокручиваем чат вниз
    forceScrollToBottom();
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
      avatar: '/avatars/commander.jpg',
      channel: activeChannel()
    };

    chatStore.addMessage(message);
    setNewMessage('');
    if (textareaRef) {
      textareaRef.style.height = 'auto';
    }
    forceScrollToBottom();
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage(e);
    }
  };

  return (
    <div class="relative flex flex-col h-screen bg-slate-900">
      <div class="flex-shrink-0 bg-slate-800">
        <div class="h-12 flex justify-center items-center relative">
          <div class="left-0 absolute">
            <BackButton />
          </div>
          <div class="text-lg">Чат</div>
        </div>
        <div class="flex border-b border-slate-700">
          <button
            class={`flex-1 px-4 py-2 text-sm font-medium transition-colors border-b-2 cursor-pointer ${
              activeChannel() === 'region'
                ? 'text-blue-500 border-blue-500'
                : 'text-gray-400 border-transparent hover:text-gray-200 hover:bg-slate-700/50'
            }`}
            onClick={() => setActiveChannel('region')}
          >
            Регион
          </button>
          <button
            class={`flex-1 px-4 py-2 text-sm font-medium transition-colors border-b-2 cursor-pointer ${
              activeChannel() === 'alliance'
                ? 'text-blue-500 border-blue-500'
                : 'text-gray-400 border-transparent hover:text-gray-200 hover:bg-slate-700/50'
            }`}
            onClick={() => setActiveChannel('alliance')}
          >
            Альянс
          </button>
        </div>
      </div>
      <div 
        class="flex-1 overflow-y-auto overflow-x-hidden p-3 space-y-4 [scrollbar-width:thin] [scrollbar-color:rgb(51,65,85)_transparent] [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-slate-700 [&::-webkit-scrollbar-thumb]:rounded"
        ref={chatContainerRef}
      >
        <For each={chatStore.messages().filter(m => m.channel === activeChannel())}>
          {(message) => (
            <div
              class={`flex items-start gap-3 max-w-full ${
                message.sender === 'user' ? 'flex-row-reverse' : 'flex-row'
              }`}
            >
              <div class="w-10 h-10 bg-slate-600 overflow-hidden shrink-0 rounded">
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
              <div class={`flex flex-col gap-1 min-w-0 ${message.sender === 'user' ? 'items-end' : 'items-start'}`}>
                <span class="text-xs font-medium text-gray-400">{message.author}</span>
                <div
                  class={`rounded-lg px-3 py-2 max-w-full break-words ${
                    message.sender === 'user'
                      ? 'bg-blue-500 text-white'
                      : 'bg-slate-700 text-gray-100'
                  }`}
                >
                  <p class="text-sm">{message.text}</p>
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
      <form onSubmit={handleSendMessage} class="flex-shrink-0 h-[72px] p-4 bg-slate-800 border-t border-slate-700 flex items-center">
        <div class="flex space-x-2 w-full">
          <textarea
            ref={textareaRef}
            rows={1}
            value={newMessage()}
            onInput={handleInput}
            onKeyDown={handleKeyDown}
            placeholder="Введите сообщение..."
            class="flex-1 h-[40px] px-4 py-2 bg-slate-700 text-white border-slate-600 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400 resize-none overflow-y-auto"
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