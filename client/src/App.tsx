import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { RouterProvider } from 'react-router-dom';

import Toast from './components/Toast.tsx';
import queryClient from './lib/react-query/client.ts';
import { router } from './routes/routes.tsx';

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <Toast />
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}

export default App;
