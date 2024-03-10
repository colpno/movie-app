import { createSyncStoragePersister } from '@tanstack/query-sync-storage-persister';
import { QueryClient } from '@tanstack/react-query';
import { persistQueryClient } from '@tanstack/react-query-persist-client';

import { userKeys } from '~/apis/user/queryKey.ts';
import { videoKeys } from '~/apis/video/queryKey.ts';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      gcTime: Infinity,
      refetchOnMount: false,
      refetchOnReconnect: false,
    },
  },
});

const localStoragePersister = createSyncStoragePersister({
  storage: window.localStorage,
});

const persistKeys = [
  JSON.stringify(userKeys.detail),
  JSON.stringify(userKeys.apiToken()),
  JSON.stringify(videoKeys.trailer),
];

persistQueryClient({
  queryClient,
  persister: localStoragePersister,
  dehydrateOptions: {
    shouldDehydrateQuery: ({ queryKey }) => {
      return persistKeys.includes(JSON.stringify(queryKey));
    },
  },
  maxAge: Infinity,
});

export default queryClient;
