import { createSignal, For, onMount, createEffect, onCleanup } from 'solid-js';
import { chatStore, type ChatChannel } from '@/stores/chat';
import { BackLayout } from '@/layouts/back-layout';
import { Icon } from 'solid-heroicons';
import { paperAirplane, arrowDown } from 'solid-heroicons/outline';
import { useLocation } from '@solidjs/router';

type LocationState = {
  activeChannel?: ChatChannel;
};

export default function ChatPage() {
  const location = useLocation<LocationState>();
  const initialChannel = location.state?.activeChannel || 'region';
  const [newMessage, setNewMessage] = createSignal('');
  const [showScrollButton, setShowScrollButton] = createSignal(false);
  const [isFirstRender, setIsFirstRender] = createSignal(true);
  let chatContainerRef: HTMLDivElement | undefined;
  let textareaRef: HTMLTextAreaElement | undefined;

  const isNearBottom = () => {
    if (chatContainerRef) {
      const threshold = 100; // пикселей от нижней границы
      const position =
        chatContainerRef.scrollHeight -
        chatContainerRef.scrollTop -
        chatContainerRef.clientHeight;
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
    chatStore.setActiveChannel(initialChannel);
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
    const _ = chatStore.messages;
    // Скроллим только если пользователь близко к низу
    setTimeout(scrollToBottom, 0);
  });

  createEffect(() => {
    // Следим за изменением активного канала
    const _ = chatStore.activeChannel;
    // При смене канала прокручиваем чат вниз
    forceScrollToBottom();
  });

  const handleInput = (e: InputEvent) => {
    const target = e.target as HTMLTextAreaElement;
    setNewMessage(target.value);
    adjustTextareaHeight();
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage(e);
    }
  };

  const handleSendMessage = (e: Event) => {
    e.preventDefault();
    const message = newMessage().trim();
    if (message) {
      chatStore.addMessage({
        id: Date.now().toString(),
        text: message,
        author: 'User',
        avatar: '',
        channel: chatStore.activeChannel,
        sender: 'user',
        timestamp: new Date(),
      });
      setNewMessage('');
      if (textareaRef) {
        textareaRef.style.height = '40px';
      }
      scrollToBottom();
    }
  };

  return (
    <BackLayout title="Чат">
      <div class="flex flex-shrink-0 flex-col">
        <div class="flex border-b border-slate-700">
          <button
            class={`flex-1 cursor-pointer border-b-2 px-4 py-2 text-sm font-medium transition-colors ${
              chatStore.activeChannel === 'region'
                ? 'border-blue-500 text-blue-500'
                : 'border-transparent text-gray-400 hover:bg-slate-700/50 hover:text-gray-200'
            }`}
            onClick={() => chatStore.setActiveChannel('region')}
          >
            Регион
          </button>
          <button
            class={`flex-1 cursor-pointer border-b-2 px-4 py-2 text-sm font-medium transition-colors ${
              chatStore.activeChannel === 'alliance'
                ? 'border-blue-500 text-blue-500'
                : 'border-transparent text-gray-400 hover:bg-slate-700/50 hover:text-gray-200'
            }`}
            onClick={() => chatStore.setActiveChannel('alliance')}
          >
            Альянс
          </button>
        </div>
      </div>
      <div
        class="scrollbar flex-1 space-y-4 overflow-x-hidden overflow-y-auto p-3"
        ref={chatContainerRef}
      >
        <For
          each={chatStore.messages
            .filter((m) => m.channel === chatStore.activeChannel)}
        >
          {(message) => (
            <div
              class={`flex max-w-full min-w-0 items-start gap-3 ${
                message.sender === 'user' ? 'flex-row-reverse' : 'flex-row'
              }`}
            >
              <div class="h-10 w-10 shrink-0 overflow-hidden rounded bg-slate-600">
                <img
                  src={message.avatar}
                  alt={message.author}
                  class="h-full w-full object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src =
                      'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="%23ffffff"%3E%3Cpath d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"%2F%3E%3C%2Fsvg%3E';
                  }}
                />
              </div>
              <div
                class={`flex max-w-[calc(100%-3.5rem)] min-w-0 flex-col gap-1 ${message.sender === 'user' ? 'items-end' : 'items-start'}`}
              >
                <span class="text-xs font-medium text-gray-400">
                  {message.author}
                </span>
                <div
                  class={`max-w-full rounded-lg px-3 py-2 break-words ${
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
          class="fixed right-4 bottom-24 flex h-10 w-10 items-center justify-center rounded-full bg-blue-500 text-white shadow-lg transition-colors hover:bg-blue-600"
          title="К новым сообщениям"
        >
          <Icon path={arrowDown} class="h-5 w-5" />
        </button>
      )}
      <form
        onSubmit={handleSendMessage}
        class="flex h-[72px] flex-shrink-0 items-center border-t border-slate-700 bg-slate-800 p-4"
      >
        <div class="flex w-full space-x-2">
          <textarea
            ref={textareaRef}
            rows={1}
            value={newMessage()}
            onInput={handleInput}
            onKeyDown={handleKeyDown}
            placeholder="Введите сообщение..."
            class="scrollbar h-[40px] max-h-[150px] min-h-[40px] flex-1 resize-none rounded-lg border border-slate-600 bg-slate-700 px-4 py-2 text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
          <button
            type="submit"
            class="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-500 text-white hover:bg-blue-600 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            title="Отправить"
          >
            <Icon path={paperAirplane} class="h-5 w-5 -rotate-45" />
          </button>
        </div>
      </form>
    </BackLayout>
  );
}
