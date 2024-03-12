import { useEffect, useRef } from 'react';

function useObserver<T extends HTMLElement>(handler: () => void) {
  const observedElement = useRef<T | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        handler();
      }
    });

    const current = observedElement?.current;

    if (current) {
      observer.observe(current);
    }

    return () => {
      if (current) {
        observer.unobserve(current);
      }
    };
  }, [handler]);

  return observedElement;
}

export default useObserver;
