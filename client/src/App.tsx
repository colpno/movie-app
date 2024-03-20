import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { useState } from 'react';
import { RouterProvider } from 'react-router-dom';

import Loading from './components/Loading/Loading.tsx';
import Toast from './components/Toast.tsx';
import GlobalContext from './context/GlobalContext.ts';
import queryClient from './lib/react-query/client.ts';
import { router } from './routes/routes.tsx';

function App() {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <QueryClientProvider client={queryClient}>
      <GlobalContext.Provider value={{ isLoading, setIsLoading }}>
        <RouterProvider router={router} />
      </GlobalContext.Provider>
      <Toast />
      <Loading />
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}

export default App;
