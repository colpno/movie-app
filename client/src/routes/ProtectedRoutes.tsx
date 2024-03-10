import { Navigate, Outlet } from 'react-router-dom';

import { userKeys } from '~/apis/user/queryKey.ts';
import queryClient from '~/lib/react-query/client.ts';

function ProtectedRoutes() {
  const authenticated = queryClient.getQueryData(userKeys.apiToken());

  if (authenticated) return <Outlet />;

  return <Navigate to="/login" />;
}

export default ProtectedRoutes;
