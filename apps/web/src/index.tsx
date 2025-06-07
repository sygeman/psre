import { ApolloProvider } from './apollo'
import { render } from 'solid-js/web';
import './index.css';

import { QueryClientProvider } from '@tanstack/solid-query';
import { queryClient } from '@/lib/client';
import { Main } from './main';

import { apolloClient } from './lib/apollo';

const App = () => {
  return (
    <ApolloProvider client={apolloClient}>
      <QueryClientProvider client={queryClient}>
        <Main />
      </QueryClientProvider>
    </ApolloProvider>
  );
};

render(
  () => <App />,
  document.getElementById('root')
);
