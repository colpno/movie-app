import { useCallback, useRef } from 'react';

type Callback<T> = (...args: T[]) => void;

function useDebounce<
  TCallbackArgs,
  TCallback extends Callback<TCallbackArgs> = Callback<TCallbackArgs>
>(callback: TCallback, delay: number): TCallback {
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const debouncedCallback = useCallback(
    (...args: TCallbackArgs[]) => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      timeoutRef.current = setTimeout(() => {
        callback(...args);
      }, delay);
    },
    [callback, delay]
  );

  return debouncedCallback as TCallback;
}

export default useDebounce;
