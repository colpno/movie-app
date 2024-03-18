import { useEffect, useState } from 'react';

function useToggle(
  initialValue: boolean,
  handleToggleOn?: () => void,
  handleToggleOff?: () => void
) {
  const [isToggle, setIsToggle] = useState(initialValue);

  const handleToggle = () => setIsToggle((prev) => !prev);

  useEffect(() => {
    if (isToggle && handleToggleOn) {
      handleToggleOn();
    }
    if (!isToggle && handleToggleOff) {
      handleToggleOff();
    }
  }, [isToggle, handleToggleOn, handleToggleOff]);

  return { isToggle, handleToggle };
}

export default useToggle;
