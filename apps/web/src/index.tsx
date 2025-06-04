import { render } from 'solid-js/web';
import './index.css';

import { QueryClientProvider } from '@tanstack/solid-query';
import { queryClient } from '@/lib/client';
import { AuthGuard } from '@/modules/auth/auth.guard';
import { Main } from './main';

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthGuard>
        <Main />
      </AuthGuard>
    </QueryClientProvider>
  );
};

render(
  () => <App />,
  document.getElementById('root')
);
