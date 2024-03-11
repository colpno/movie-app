import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { RouterProvider } from 'react-router-dom';

import Toast from './components/Toast.tsx';
import queryClient from './lib/react-query/client.ts';
import { routes } from './routes/index.tsx';

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={routes} />
      <Toast />
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}

export default App;
