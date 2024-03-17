import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { userKeys } from '~/apis/user/queryKey.ts';
import queryClient from '~/lib/react-query/client.ts';

function useAuthenticate() {
  const user = queryClient.getQueryData(userKeys.detail);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) navigate('/');
  }, [user, navigate]);
}

export default useAuthenticate;
