import { useLocation, useNavigate } from 'react-router-dom';

function HeaderLoginButton() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const isLoginPage = pathname.includes('/login');

  return (
    <button
      className="py-2 px-4 bg-[#e50914] border-none text-white rounded-[0.2rem] font-bold text-[1.05rem]"
      onClick={() => navigate(isLoginPage ? '/signup' : '/login')}
    >
      {isLoginPage ? 'Sign In' : 'Log In'}
    </button>
  );
}

export default HeaderLoginButton;
