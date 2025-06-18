import { createSignal, For, onMount, createEffect, onCleanup } from "solid-js";
import { chatStore, type ChatChannel } from "./store";
import { BackLayout } from "@/layouts/back-layout";
import { Icon } from "solid-heroicons";
import { paperAirplane, arrowDown } from "solid-heroicons/outline";
import { useLocation } from "@solidjs/router";
import { CharacterAvatar } from "@/components/character-avatar";
import { createChat } from "./create-chat";

type LocationState = {
  activeChannel?: ChatChannel;
};

export function ChatPage() {
  const location = useLocation<LocationState>();
  const initialChannel = location.state?.activeChannel || "region";
  const [newMessage, setNewMessage] = createSignal("");
  const [showScrollButton, setShowScrollButton] = createSignal(false);
  const [isFirstRender, setIsFirstRender] = createSignal(true);
  let chatContainerRef: HTMLDivElement | undefined;
  let textareaRef: HTMLTextAreaElement | undefined;
  const { messages, createMessage } = createChat();

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
      textareaRef.style.height = "auto";
      textareaRef.style.height = Math.min(textareaRef.scrollHeight, 150) + "px";
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
    chatContainerRef?.addEventListener("scroll", handleScroll);
  });

  onCleanup(() => {
    // Удаляем слушатель события прокрутки
    chatContainerRef?.removeEventListener("scroll", handleScroll);
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
    const _ = messages();
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
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage(e);
    }
  };

  const handleSendMessage = (e: Event) => {
    e.preventDefault();
    const message = newMessage().trim();
    if (message) {
      createMessage(message);
      setNewMessage("");
      if (textareaRef) {
        textareaRef.style.height = "40px";
      }
      scrollToBottom();
    }
  };

  const ChatInput = (
    <form
      onSubmit={handleSendMessage}
      class="flex h-[72px] items-center border-t border-slate-700 bg-slate-800 p-4"
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
  );

  return (
    <BackLayout title="Чат" bottomContent={ChatInput}>
      <div class="flex flex-col h-full">
        <div class="flex flex-shrink-0 flex-col">
          <div class="flex bg-slate-800">
            <button
              class={`flex-1 cursor-pointer px-4 py-2 text-sm font-medium transition-colors ${
                chatStore.activeChannel === "region"
                  ? "bg-slate-700 text-white"
                  : "text-slate-400 hover:text-slate-200"
              }`}
              onClick={() => chatStore.setActiveChannel("region")}
            >
              Регион
            </button>
            <button
              class={`flex-1 cursor-pointer px-4 py-2 text-sm font-medium transition-colors ${
                chatStore.activeChannel === "alliance"
                  ? "bg-slate-700 text-white"
                  : "text-slate-400 hover:text-slate-200"
              }`}
              onClick={() => chatStore.setActiveChannel("alliance")}
            >
              Альянс
            </button>
          </div>
        </div>
        <div
          class="scrollbar flex-1 space-y-4 overflow-x-hidden overflow-y-auto p-3 bg-slate-900"
          ref={chatContainerRef}
        >
          <For each={messages()}>
            {(message) => (
              <div
                class={`flex max-w-full min-w-0 items-start gap-3 ${
                  false ? "flex-row-reverse" : "flex-row"
                }`}
              >
                <div class="h-12 w-12 shrink-0 overflow-hidden rounded bg-slate-600">
                  <CharacterAvatar class="size-12" />
                </div>
                <div
                  class={`flex max-w-[calc(100%-3.5rem)] min-w-0 flex-col gap-1 ${false ? "items-end" : "items-start"}`}
                >
                  <span class="text-xs font-medium text-gray-400">
                    {message?.author?.name}
                  </span>
                  <div
                    class={`max-w-full rounded-lg px-3 py-2 break-words backdrop-blur-sm ${
                      false
                        ? "bg-white/20 backdrop-blur-3xl text-white"
                        : "bg-white/10 backdrop-blur-3xl text-gray-100"
                    }`}
                  >
                    <p class="text-sm">{message.content}</p>
                  </div>
                </div>
              </div>
            )}
          </For>
        </div>
        {showScrollButton() && (
          <button
            onClick={forceScrollToBottom}
            class="fixed right-4 bottom-24 flex h-10 w-10 items-center justify-center rounded-full bg-blue-500 text-white shadow-lg transition-colors hover:bg-blue-600"
            title="К новым сообщениям"
          >
            <Icon path={arrowDown} class="h-5 w-5" />
          </button>
        )}
      </div>
    </BackLayout>
  );
}
