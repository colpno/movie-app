import { useContext, useEffect } from 'react';

import GlobalContext from '~/context/GlobalContext.ts';

function useLoading(isLoading: boolean) {
  const { setIsLoading } = useContext(GlobalContext);

  useEffect(() => {
    setIsLoading(isLoading);
  }, [isLoading, setIsLoading]);
}

export default useLoading;
