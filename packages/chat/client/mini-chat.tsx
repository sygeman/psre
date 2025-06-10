import { For, createEffect, createSignal, onCleanup } from "solid-js";
import { useNavigate } from "@solidjs/router";
import { chatStore, type ChatChannel } from "@psre/stores";
import { Icon } from "solid-heroicons";
import { globeAlt, userGroup } from "solid-heroicons/outline";
import {
  createMutation,
  createSubscription,
  gql,
  useApollo,
} from "@psre/apollo";
import {
  CreateMessageMutation,
  CreateMessageMutationVariables,
  GetNewChatMessagesSubscription,
  GetNewChatMessagesSubscriptionVariables,
} from "./mini-chat.gql.types";

export function MiniChat() {
  const navigate = useNavigate();
  const [touchStart, setTouchStart] = createSignal(0);
  const [isAnimating, setIsAnimating] = createSignal(false);
  const apolloClient = useApollo();

  // apolloClient.query<GetChatMessagesQuery, GetChatMessagesQueryVariables>({
  //     query: gql`
  //       query GetChatMessages($chatId: String!) {
  //         chatMessages(chatId: $chatId) {
  //           id
  //           content
  //           accountId
  //           chatId
  //           createdAt
  //         }
  //       }
  //     `,
  //     variables: {
  //       chatId: '1',
  //     }
  //   }).then((data) => {
  //     console.log(data?.data.chatMessages);
  //   });

  const [createMessage] = createMutation<
    CreateMessageMutation,
    CreateMessageMutationVariables
  >(gql`
    mutation CreateMessage($input: SendMessageInput!) {
      createChatMessage(input: $input)
    }
  `);

  // const data = createSubscription<
  //   GetNewChatMessagesSubscription,
  //   GetNewChatMessagesSubscriptionVariables
  // >(
  //   gql`
  //     subscription GetNewChatMessages($chatId: String!) {
  //       createdChatMessage(chatId: $chatId) {
  //         id
  //         content
  //         accountId
  //         chatId
  //         createdAt
  //       }
  //     }
  //   `,
  //   { variables: { chatId: "1" } },
  // );

  // createEffect(() => {
  //   if (!data.loading) {
  //     console.log(data().createdChatMessage);
  //   }
  // });

  const subscription = apolloClient
    .subscribe<
      GetNewChatMessagesSubscription,
      GetNewChatMessagesSubscriptionVariables
    >({
      query: gql`
        subscription GetNewChatMessages($chatId: String!) {
          createdChatMessage(chatId: $chatId) {
            id
            content
            accountId
            chatId
            createdAt
          }
        }
      `,
      variables: {
        chatId: "1",
      },
    })
    .subscribe({
      // error: reject,
      next: ({ data }) => {
        console.log(data?.createdChatMessage);
      },
    });

  onCleanup(() => subscription.unsubscribe());

  setInterval(() => {
    createMessage({
      variables: {
        input: {
          chatId: "1",
          content: "12312312",
        },
      },
    });
  }, 1000);

  const handleClick = () => {
    navigate("/chat", { state: { activeChannel: chatStore.activeChannel } });
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
      if (diff > 0 && chatStore.activeChannel === "alliance") {
        chatStore.setActiveChannel("region");
      } else if (diff < 0 && chatStore.activeChannel === "region") {
        chatStore.setActiveChannel("alliance");
      }
      setTimeout(() => setIsAnimating(false), 300);
    } else if (Math.abs(diff) <= 5) {
      // Если это был клик (очень маленькое движение), а не свайп
      handleClick();
    }
  };

  const MessageContainer = (props: { channel: ChatChannel }) => (
    <div class="flex min-w-0">
      <div class="ml-2 flex h-[44px] w-[44px] flex-shrink-0 flex-col items-center">
        <div class="flex h-9 w-9 items-center justify-center rounded-full bg-slate-900 before:absolute before:inset-0 before:rounded-full before:border before:border-white/20 relative">
          <Icon
            path={props.channel === "region" ? globeAlt : userGroup}
            class="h-5 w-5 text-gray-200/90"
          />
        </div>
        {/* Индикаторы каналов под иконкой */}
        <div class="mt-1 flex gap-1">
          <div
            class={`h-1.5 w-1.5 rounded-full transition-colors ${
              chatStore.activeChannel === "region"
                ? "bg-blue-500"
                : "bg-slate-600"
            }`}
          />
          <div
            class={`h-1.5 w-1.5 rounded-full transition-colors ${
              chatStore.activeChannel === "alliance"
                ? "bg-blue-500"
                : "bg-slate-600"
            }`}
          />
        </div>
      </div>
      <div class="ml-2 max-w-[calc(100%-60px)] min-w-0 flex-1 space-y-0.5 pr-2">
        <For
          each={chatStore.messages
            .filter((m) => m.channel === props.channel)
            .slice(-2)}
        >
          {(message) => (
            <div class="max-w-full min-w-0 text-sm leading-[22px] text-gray-400/90 flex">
              <span class="font-medium select-none text-gray-200/90 flex-shrink-0">
                {message.author}:
              </span>
              <span class="select-none truncate ml-1">{message.text}</span>
            </div>
          )}
        </For>
        {chatStore.messages.filter((m) => m.channel === props.channel)
          .length === 0 && (
          <div class="flex h-[44px] items-center justify-center">
            <p class="text-xs text-gray-500/80 select-none">Нет сообщений</p>
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
      <div class="relative overflow-hidden bg-slate-800/80 backdrop-blur-sm before:absolute before:inset-x-0 before:top-0 before:border-t before:border-white/10">
        <div class="py-2">
          <div class="relative h-[44px]">
            <div
              class="absolute inset-0 transition-transform duration-300 ease-out"
              style={{
                "z-index": chatStore.activeChannel === "region" ? 2 : 1,
                transform: `translateX(${chatStore.activeChannel === "region" ? "0" : "-100%"})`,
              }}
            >
              <MessageContainer channel="region" />
            </div>
            <div
              class="absolute inset-0 transition-transform duration-300 ease-out"
              style={{
                "z-index": chatStore.activeChannel === "alliance" ? 2 : 1,
                transform: `translateX(${chatStore.activeChannel === "alliance" ? "0" : "100%"})`,
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
