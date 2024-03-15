import { useState } from 'react';

interface ScrollNavbarProps {
  children: React.ReactNode;
}

function ScrollNavbar({ children }: ScrollNavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);

  window.onscroll = () => {
    setIsScrolled(window.scrollY !== 0);
    return () => (window.onscroll = null);
  };

  return (
    <nav
      className={`flex h-[--navbar-height] w-full justify-between fixed top-0 z-[2] px-16 items-center duration-300 ease-in-out ${
        isScrolled ? 'bg-black' : ''
      }`}
    >
      {children}
    </nav>
  );
}

export default ScrollNavbar;
