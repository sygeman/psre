import { For, createSignal } from "solid-js";
import { useNavigate } from '@solidjs/router';
import { chatStore, type ChatChannel } from '../stores/chat';
import { Icon } from 'solid-heroicons';
import { globeAlt, userGroup } from 'solid-heroicons/outline';

export function MiniChat() {
  const navigate = useNavigate();
  const [activeChannel, setActiveChannel] = createSignal<ChatChannel>('region');
  const [touchStart, setTouchStart] = createSignal(0);
  const [isAnimating, setIsAnimating] = createSignal(false);
  
  const handleClick = () => {
    navigate('/chat', { state: { activeChannel: activeChannel() } });
  };

  const handleTouchStart = (e: TouchEvent) => {
    setTouchStart(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: TouchEvent) => {
    const touchEnd = e.changedTouches[0].clientX;
    const diff = touchEnd - touchStart();
    
    if (Math.abs(diff) > 50 && !isAnimating()) {
      setIsAnimating(true);
      if (diff > 0 && activeChannel() === 'alliance') {
        setActiveChannel('region');
      } else if (diff < 0 && activeChannel() === 'region') {
        setActiveChannel('alliance');
      }
      setTimeout(() => setIsAnimating(false), 300);
    }
  };

  const MessageContainer = (props: { channel: ChatChannel }) => (
    <div class="flex min-w-0">
      <div class="flex-shrink-0 w-[44px] h-[44px] bg-slate-700/50 flex items-center justify-center">
        <Icon 
          path={props.channel === 'region' ? globeAlt : userGroup} 
          class="w-5 h-5 text-gray-300"
        />
      </div>
      <div class="flex-1 space-y-0.5 min-w-0 ml-3">
        <For each={chatStore.messages()
          .filter(m => m.channel === props.channel)
          .slice(-2)
        }>{(message) => (
          <div class="text-sm text-gray-100 truncate leading-[22px] max-w-full">
            <span class="font-medium">{message.author}: </span>
            {message.text}
          </div>
        )}</For>
        {chatStore.messages().filter(m => m.channel === props.channel).length === 0 && (
          <div class="h-[44px] flex items-center justify-center">
            <p class="text-gray-400 text-xs">Нет сообщений</p>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div 
      class="bg-slate-800/80 backdrop-blur-sm p-2 cursor-pointer hover:bg-slate-800/90 transition-colors w-full relative h-[76px] overflow-hidden"
      onClick={handleClick}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Индикаторы каналов */}
      <div class="flex justify-center gap-2 mb-1.5">
        <div 
          class={`w-1.5 h-1.5 rounded-full transition-colors ${
            activeChannel() === 'region' 
              ? 'bg-blue-500' 
              : 'bg-slate-600'
          }`}
        />
        <div 
          class={`w-1.5 h-1.5 rounded-full transition-colors ${
            activeChannel() === 'alliance' 
              ? 'bg-blue-500' 
              : 'bg-slate-600'
          }`}
        />
      </div>

      <div class="relative h-[44px] overflow-hidden">
        <div 
          class="absolute inset-0 transition-transform duration-300 ease-out" 
          style={{
            "z-index": activeChannel() === 'region' ? 2 : 1,
            transform: `translateX(${activeChannel() === 'region' ? '0' : '-100%'})`
          }}
        >
          <MessageContainer channel="region" />
        </div>
        <div 
          class="absolute inset-0 transition-transform duration-300 ease-out" 
          style={{
            "z-index": activeChannel() === 'alliance' ? 2 : 1,
            transform: `translateX(${activeChannel() === 'alliance' ? '0' : '100%'})`
          }}
        >
          <MessageContainer channel="alliance" />
        </div>
      </div>
    </div>
  );
}
