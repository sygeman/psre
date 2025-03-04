import { Component, Show } from 'solid-js';
import { Spinner } from '@/components/spinner';

type ConnectionOverlayProps = {
  isConnected: boolean;
};

export const ConnectionOverlay: Component<ConnectionOverlayProps> = (props) => {
  return (
    <Show when={!props.isConnected}>
      <div class="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
        <div class="flex flex-col items-center gap-4 text-center">
          <Spinner class="h-8 w-8" />
          <div class="text-lg font-medium">Восстановление соединения...</div>
          <div class="text-sm text-slate-400">Пожалуйста, подождите</div>
        </div>
      </div>
    </Show>
  );
};
