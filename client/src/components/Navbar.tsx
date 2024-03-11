import { memo, useState } from 'react';
import { FaPowerOff, FaSearch } from 'react-icons/fa';
import { Link } from 'react-router-dom';

import { useLogout } from '~/apis/auth/logout.ts';
import { userKeys } from '~/apis/user/queryKey.ts';
import queryClient from '~/lib/react-query/client.ts';
import logo from '../assets/logo.png';

function Navbar() {
  const [showSearch, setShowSearch] = useState(false);
  const [inputHover, setInputHover] = useState(false);
  const links = [
    { name: 'Home', link: '/' },
    { name: 'TV Shows', link: '/tv' },
    { name: 'Movies', link: '/movies' },
    { name: 'My List', link: '/mylist' },
  ];
  const { mutate: logout } = useLogout();
  const user = queryClient.getQueryData(userKeys.detail);
  const isLoggedIn = Boolean(user);
  const [isScrolled, setIsScrolled] = useState(false);

  window.onscroll = () => {
    setIsScrolled(window.scrollY === 0 ? false : true);
    return () => (window.onscroll = null);
  };

  return (
    <div>
      <nav
        className={`flex h-[--navbar-height] w-full justify-between fixed top-0 z-[2] px-16 items-center duration-300 ease-in-out ${
          isScrolled ? 'bg-black' : ''
        }`}
      >
        <div className="gap-8 flex items-center">
          <div className="flex items-center justify-center">
            <Link to="/">
              <img src={logo} alt="Logo" className="h-16" />
            </Link>
          </div>
          <ul className="list-none flex gap-8">
            {links.map(({ name, link }) => {
              return (
                <li key={name}>
                  <Link to={link} className="text-white no-underline">
                    {name}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
        <div className="gap-4 flex items-center">
          <div
            className={`flex gap-[0.4rem] items-center justify-center p-[0.2rem] pl-[0.5rem] ${
              showSearch ? 'border-white border' : ''
            }`}
          >
            <button
              className="bg-transparent rounded-none cursor-pointer focus:outline-none"
              onFocus={() => setShowSearch(true)}
              onBlur={() => {
                if (!inputHover) {
                  setShowSearch(false);
                }
              }}
            >
              <FaSearch className="text-[#f34242] text-[1.2rem]" />
            </button>
            <input
              type="text"
              placeholder="Search"
              className="w-0 opacity-0 invisible duration-300 ease-in-out bg-transparent rounded-none text-white focus:outline-none"
              onMouseEnter={() => setInputHover(true)}
              onMouseLeave={() => setInputHover(false)}
              onBlur={() => {
                setShowSearch(false);
                setInputHover(false);
              }}
            />
          </div>
          {isLoggedIn && (
            <button onClick={() => logout()}>
              <FaPowerOff className="text-white" />
            </button>
          )}
        </div>
      </nav>
    </div>
  );
}

export default memo(Navbar);
