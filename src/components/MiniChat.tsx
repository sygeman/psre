import { For } from "solid-js";
import { useNavigate } from '@solidjs/router';
import { chatStore } from '../stores/chat';

export function MiniChat() {
  const navigate = useNavigate();
  
  const handleClick = () => {
    navigate('/chat');
  };

  return (
    <div 
      class="bg-slate-800/80 backdrop-blur-sm p-2 cursor-pointer hover:bg-slate-800/90 transition-colors w-full"
      onClick={handleClick}
    >
      <div class="space-y-0.5">
        <For each={chatStore.getLastMessages(2)}>{(message) => (
          <div class="text-sm text-gray-100 truncate">
            <span class="font-medium">{message.author}: </span>
            {message.text}
          </div>
        )}</For>
        {chatStore.messages().length === 0 && (
          <p class="text-gray-400 text-xs text-center">Нет сообщений</p>
        )}
      </div>
    </div>
  );
}
