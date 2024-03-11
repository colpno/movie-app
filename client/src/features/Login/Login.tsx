import background from '~/assets/login.jpg';
import BackgroundImage from '~/components/BackgroundImage.tsx';
import LoginForm from './components/LoginForm';

function Login() {
  return (
    <div className="relative">
      <BackgroundImage src={background} className="h-[calc(100vh-var(--header-height))]" />
      <div className="absolute top-0 left-0 w-screen h-[calc(100vh-var(--header-height))] bg-[#00000080] grid-rows-[15vh_85vh] flex flex-col items-center justify-center gap-8 h[85vh]">
        <LoginForm />
      </div>
    </div>
  );
}

export default Login;
