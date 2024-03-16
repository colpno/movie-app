import { useEffect } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

import { userKeys } from '~/apis/user/queryKey.ts';
import queryClient from '~/lib/react-query/client.ts';
import { emitToast } from '~/utils/toast.ts';

function ProtectedRoutes() {
  const authenticated = queryClient.getQueryData(userKeys.apiToken());

  useEffect(() => {
    !authenticated && emitToast('Unauthorized', 'error');
  }, [authenticated]);

  if (authenticated) return <Outlet />;

  return <Navigate to="/login" />;
}

export default ProtectedRoutes;
