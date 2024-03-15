import { memo } from 'react';

import useDebounce from '~/hooks/useDebounce';

interface NavbarSearchInputProps {
  onHover: (isHovered: boolean) => void;
  onBlur: (isBlurred: boolean) => void;
}

function NavbarSearchInput({ onHover, onBlur }: NavbarSearchInputProps) {
  const handleChange = (newValue: string) => {
    console.log('newValue:', newValue);
  };

  const debouncedFunction = useDebounce<string>(handleChange, 300);

  return (
    <input
      type="text"
      placeholder="Search"
      className="duration-300 ease-in-out bg-transparent rounded-none text-white focus:outline-none"
      onChange={({ target }) => debouncedFunction(target.value)}
      onMouseEnter={() => onHover(true)}
      onMouseLeave={() => onHover(false)}
      onBlur={() => {
        onBlur(false);
        onHover(false);
      }}
    />
  );
}

export default memo(NavbarSearchInput);
