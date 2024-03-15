import { useState } from 'react';
import { FaSearch } from 'react-icons/fa';

import NavbarSearchInput from './NavbarSearchInput';

function NavbarSearch() {
  const [showSearch, setShowSearch] = useState(false);
  const [inputHover, setInputHover] = useState(false);

  return (
    <div
      className={`flex gap-[0.4rem] items-center justify-center p-[0.2rem] pl-[0.5rem] ${
        showSearch ? 'border-white border' : ''
      }`}
    >
      <button
        className="bg-transparent rounded-none cursor-pointer focus:outline-none"
        onClick={() => setShowSearch(true)}
        onBlur={() => {
          if (!inputHover) {
            setShowSearch(false);
          }
        }}
      >
        <FaSearch className="text-white text-[1.2rem]" />
      </button>
      {showSearch && <NavbarSearchInput onHover={setInputHover} onBlur={setShowSearch} />}
    </div>
  );
}

export default NavbarSearch;
