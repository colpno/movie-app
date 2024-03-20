import { useContext, useEffect } from 'react';

import GlobalContext from '~/context/GlobalContext';

function useLoading(isLoading: boolean) {
  const { setIsLoading } = useContext(GlobalContext);

  useEffect(() => {
    setIsLoading(isLoading);

    return () => {
      setIsLoading(false);
    };
  }, [isLoading, setIsLoading]);
}

export default useLoading;
