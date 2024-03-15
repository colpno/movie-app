import { memo } from 'react';
import { Link } from 'react-router-dom';

import logo from '../assets/logo.png';
import NavbarLogout from './components/NavbarLogout';
import NavbarNavigation from './components/NavbarNavigation.tsx';
import NavbarSearch from './components/NavbarSearch';
import ScrollNavbar from './components/ScrollNavbar.tsx';

function Navbar() {
  return (
    <div>
      <ScrollNavbar>
        <div className="gap-8 flex items-center">
          <div className="flex items-center justify-center">
            <Link to="/">
              <img src={logo} alt="Logo" className="h-16" />
            </Link>
          </div>
          <NavbarNavigation />
        </div>
        <div className="gap-4 flex items-center">
          <NavbarSearch />
          <NavbarLogout />
        </div>
      </ScrollNavbar>
    </div>
  );
}

export default memo(Navbar);
