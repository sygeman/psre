import { Match, Switch, type JSX } from "solid-js"
import { useQuery } from "@tanstack/solid-query"
import { AuthTelegram } from "./auth-screen"
import { authService } from "./auth.service"

export const AuthGuard = (props: { children: JSX.Element }) => {
  const checkTokenQuery = useQuery(() => ({
    queryKey: ["auth"],
    queryFn: () => authService.checkToken(),
  }))

  return (
    <Switch>
      <Match when={checkTokenQuery.isPending}>
        <div class="min-h-screen flex items-center justify-center bg-black">
          <div class="text-center space-y-6">
            <div class="flex justify-center">
              <div class="size-16 border-4 border-slate-800 border-t-blue-500 rounded-full animate-spin" />
            </div>
          </div>
        </div>
      </Match>
      <Match when={checkTokenQuery.error}>{"An error has occurred: " + (checkTokenQuery.error as Error).message}</Match>
      <Match when={checkTokenQuery.data}>{props.children}</Match>
      <Match when={!checkTokenQuery.data}>
        <AuthTelegram />
      </Match>
    </Switch>
  )
}
