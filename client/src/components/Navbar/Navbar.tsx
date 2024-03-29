import { memo, useState } from 'react';
import { FaHome, FaTv } from 'react-icons/fa';
import { GiHamburgerMenu } from 'react-icons/gi';
import { MdFavorite, MdLocalMovies } from 'react-icons/md';
import { Link } from 'react-router-dom';

import logo from '~/assets/logo.png';
import Sidebar from '../Sidebar/Sidebar.tsx';
import NavbarLogout from './components/NavbarLogout';
import NavbarNavigation from './components/NavbarNavigation.tsx';
import NavbarSearch from './components/NavbarSearch';
import ScrollNavbar from './components/ScrollNavbar.tsx';

function Navbar() {
  const [openSidebar, setOpenSidebar] = useState(false);
  const links = [
    { title: 'Home', to: '/', icon: <FaHome /> },
    { title: 'TV Shows', to: '/tv', icon: <FaTv /> },
    { title: 'Movies', to: '/movies', icon: <MdLocalMovies /> },
    { title: 'My List', to: '/mylist', icon: <MdFavorite /> },
  ];

  return (
    <div>
      <ScrollNavbar>
        <div className="gap-2 lg:gap-8 flex items-center">
          <div className="flex items-center justify-center">
            <Link to="/">
              <img src={logo} alt="Logo" className="h-16" />
            </Link>
          </div>
          <GiHamburgerMenu
            onClick={() => setOpenSidebar(true)}
            className="text-[2rem] cursor-pointer text-white block lg:hidden"
          />
          <div className="hidden lg:block">
            <NavbarNavigation navLinks={links} />
          </div>
        </div>
        <div className="gap-4 flex items-center">
          <NavbarSearch />
          <NavbarLogout />
        </div>
      </ScrollNavbar>
      <Sidebar open={openSidebar} onClose={() => setOpenSidebar(false)} navLinks={links} />
    </div>
  );
}

export default memo(Navbar);
