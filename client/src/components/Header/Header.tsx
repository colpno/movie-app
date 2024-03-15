import { Link } from 'react-router-dom';

import logo from '~/assets/logo.png';
import HeaderLoginButton from './components/HeaderLoginButton';

function Header() {
  return (
    <header className="flex items-center justify-between px-16 bg-black">
      <div>
        <Link to="/">
          <img src={logo} alt="logo" className="h-[var(--header-height)]" />
        </Link>
      </div>
      <HeaderLoginButton />
    </header>
  );
}

export default Header;
