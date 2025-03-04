import { Component, For, Show } from 'solid-js';
import { chatStore } from '@/stores/chat';
import { formatTime } from '@/helpers/format-time';

export const MiniChat: Component = () => {
  return (
    <div class="flex flex-col h-full">
      <div class="flex-1 overflow-y-auto p-4 space-y-4">
        <For each={chatStore.messages}>
          {(message) => (
            <div
              class={`flex ${
                message.sender === 'user' ? 'justify-end' : 'justify-start'
              }`}
            >
              <div
                class={`max-w-[80%] rounded-lg p-3 ${
                  message.sender === 'user'
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-200 text-gray-800'
                }`}
              >
                <div class="flex items-center gap-2 mb-1">
                  <img
                    src={message.avatar}
                    alt={message.author}
                    class="w-6 h-6 rounded-full"
                  />
                  <span class="font-medium">{message.author}</span>
                  <span class="text-xs opacity-75">
                    {formatTime(message.timestamp)}
                  </span>
                </div>
                <p class="text-sm">{message.text}</p>
              </div>
            </div>
          )}
        </For>
      </div>
      <div class="p-4 border-t">
        <div class="flex gap-2">
          <input
            type="text"
            placeholder="Введите сообщение..."
            class="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button class="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500">
            Отправить
          </button>
        </div>
      </div>
    </div>
  );
}; 