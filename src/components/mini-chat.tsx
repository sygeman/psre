import { For, createSignal } from 'solid-js';
import { useNavigate } from '@solidjs/router';
import { chatStore, type ChatChannel } from '@/stores/chat';
import { Icon } from 'solid-heroicons';
import { globeAlt, userGroup } from 'solid-heroicons/outline';

export function MiniChat() {
  const navigate = useNavigate();
  const [touchStart, setTouchStart] = createSignal(0);
  const [isAnimating, setIsAnimating] = createSignal(false);

  const handleClick = () => {
    navigate('/chat', { state: { activeChannel: chatStore.activeChannel() } });
  };

  const handleTouchStart = (e: TouchEvent) => {
    setTouchStart(e.touches[0].clientX);
  };

  const handleTouchMove = (e: TouchEvent) => {
    e.preventDefault(); // Предотвращаем скролл страницы при свайпе
  };

  const handleTouchEnd = (e: TouchEvent) => {
    e.preventDefault(); // Предотвращаем открытие страницы после свайпа
    const touchEnd = e.changedTouches[0].clientX;
    const diff = touchEnd - touchStart();

    if (Math.abs(diff) > 50 && !isAnimating()) {
      setIsAnimating(true);
      if (diff > 0 && chatStore.activeChannel() === 'alliance') {
        chatStore.setActiveChannel('region');
      } else if (diff < 0 && chatStore.activeChannel() === 'region') {
        chatStore.setActiveChannel('alliance');
      }
      setTimeout(() => setIsAnimating(false), 300);
    } else if (Math.abs(diff) <= 5) {
      // Если это был клик (очень маленькое движение), а не свайп
      handleClick();
    }
  };

  const MessageContainer = (props: { channel: ChatChannel }) => (
    <div class="flex min-w-0">
      <div class="ml-2 flex h-[44px] w-[44px] flex-shrink-0 items-center justify-center">
        <div class="flex h-9 w-9 items-center justify-center rounded-full bg-slate-900">
          <Icon
            path={props.channel === 'region' ? globeAlt : userGroup}
            class="h-5 w-5 text-gray-300"
          />
        </div>
      </div>
      <div class="ml-2 max-w-[calc(100%-60px)] min-w-0 flex-1 space-y-0.5">
        <For
          each={chatStore
            .messages()
            .filter((m) => m.channel === props.channel)
            .slice(-2)}
        >
          {(message) => (
            <div class="max-w-full min-w-0 truncate text-sm leading-[22px] text-gray-100">
              <span class="font-medium select-none">{message.author}: </span>
              <span class="select-none">{message.text}</span>
            </div>
          )}
        </For>
        {chatStore.messages().filter((m) => m.channel === props.channel)
          .length === 0 && (
          <div class="flex h-[44px] items-center justify-center">
            <p class="text-xs text-gray-400 select-none">Нет сообщений</p>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div
      class="relative w-full cursor-pointer overflow-hidden select-none"
      onClick={handleClick}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Индикаторы каналов */}
      <div class="mb-1.5 flex justify-center">
        <div class="inline-flex gap-2 rounded-full bg-slate-800/80 px-2 py-1 backdrop-blur-sm">
          <div
            class={`h-1.5 w-1.5 rounded-full transition-colors ${
              chatStore.activeChannel() === 'region'
                ? 'bg-blue-500'
                : 'bg-slate-600'
            }`}
          />
          <div
            class={`h-1.5 w-1.5 rounded-full transition-colors ${
              chatStore.activeChannel() === 'alliance'
                ? 'bg-blue-500'
                : 'bg-slate-600'
            }`}
          />
        </div>
      </div>

      <div class="relative overflow-hidden bg-slate-800/80 backdrop-blur-sm">
        <div class="py-2">
          <div class="relative h-[44px]">
            <div
              class="absolute inset-0 transition-transform duration-300 ease-out"
              style={{
                'z-index': chatStore.activeChannel() === 'region' ? 2 : 1,
                transform: `translateX(${chatStore.activeChannel() === 'region' ? '0' : '-100%'})`,
              }}
            >
              <MessageContainer channel="region" />
            </div>
            <div
              class="absolute inset-0 transition-transform duration-300 ease-out"
              style={{
                'z-index': chatStore.activeChannel() === 'alliance' ? 2 : 1,
                transform: `translateX(${chatStore.activeChannel() === 'alliance' ? '0' : '100%'})`,
              }}
            >
              <MessageContainer channel="alliance" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
