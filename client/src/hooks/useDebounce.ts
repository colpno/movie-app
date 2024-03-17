import { useEffect, useState } from 'react';

function useDebounce(delay: number) {
  const [onChangeValue, setOnChangeValue] = useState('');
  const [debouncedValue, setDebouncedValue] = useState(onChangeValue);

  const handleChange = (newValue: string) => setOnChangeValue(newValue);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(onChangeValue);
    }, delay);

    return () => clearTimeout(handler);
  }, [onChangeValue, delay]);

  return {
    debouncedValue,
    onChangeValue,
    handleChange,
  };
}

export default useDebounce;
