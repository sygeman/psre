import { BackLayout } from "@/layouts/back-layout"
import { For } from "solid-js"
import { mailStore, type Mail } from "@/stores/mail"

export function MailPage() {
  const getRewardIcon = (type: Mail["hasReward"]["type"]) => {
    switch (type) {
      case "food":
        return "🌾"
      case "wood":
        return "🪵"
      case "steel":
        return "🔩"
      case "fuel":
        return "🛢️"
      case "diamond":
        return "💎"
      case "serum":
        return "🧪"
      case "exp":
        return "✨"
    }
  }

  return (
    <BackLayout title="Почта">
      <div class="flex h-full flex-col">
        <div class="hide-scrollbar flex-1 overflow-y-auto">
          <div class="divide-y divide-slate-700/25">
            <For each={mailStore.mails}>
              {(mail) => (
                <div
                  class={`flex cursor-pointer flex-col gap-2 p-4 transition-colors hover:bg-slate-800 ${
                    !mail.isRead ? "bg-slate-800/50" : ""
                  }`}
                  onClick={() => mailStore.markAsRead(mail.id)}
                >
                  <div class="flex items-center justify-between">
                    <div class="flex items-center gap-2">
                      {!mail.isRead && <div class="size-2 rounded-full bg-blue-500" />}
                      <div class="font-medium">{mail.title}</div>
                    </div>
                    <div class="text-sm text-slate-400">{mail.date}</div>
                  </div>
                  <div class="text-sm text-slate-400">{mail.message}</div>
                  {mail.hasReward && (
                    <div class="flex items-center gap-1 text-sm">
                      <span>Награда:</span>
                      <span>{getRewardIcon(mail.hasReward.type)}</span>
                      <span>{mail.hasReward.amount.toLocaleString("en-US")}</span>
                    </div>
                  )}
                </div>
              )}
            </For>
          </div>
        </div>
      </div>
    </BackLayout>
  )
}
