import { Link, useLocation, useNavigate } from 'react-router-dom';

import logo from '~/assets/logo.png';

function Header() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const isLoginPage = pathname.includes('/login');

  return (
    <header className="flex items-center justify-between px-16 bg-black">
      <div>
        <Link to="/">
          <img src={logo} alt="logo" className="h-[var(--header-height)]" />
        </Link>
      </div>
      <button
        className="py-2 px-4 bg-[#e50914] border-none text-white rounded-[0.2rem] font-bold text-[1.05rem]"
        onClick={() => navigate(isLoginPage ? '/signup' : '/login')}
      >
        {isLoginPage ? 'Sign In' : 'Log In'}
      </button>
    </header>
  );
}

export default Header;
