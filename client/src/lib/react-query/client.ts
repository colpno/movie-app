import { createSyncStoragePersister } from '@tanstack/query-sync-storage-persister';
import { QueryClient } from '@tanstack/react-query';
import { persistQueryClient } from '@tanstack/react-query-persist-client';

import { userKeys } from '~/apis/user/queryKey.ts';
import { videoKeys } from '~/apis/video/queryKey.ts';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      gcTime: Infinity,
      refetchOnReconnect: false,
      refetchOnWindowFocus: false,
    },
  },
});

const localStoragePersister = createSyncStoragePersister({
  storage: window.localStorage,
});

const persistKeys = [userKeys.detail, userKeys.apiToken(), videoKeys.trailer];

persistQueryClient({
  queryClient,
  persister: localStoragePersister,
  dehydrateOptions: {
    shouldDehydrateQuery: ({ queryKey }) => {
      return persistKeys.some((key) => JSON.stringify(key) === JSON.stringify(queryKey));
    },
  },
  maxAge: Infinity,
});

export default queryClient;
