import LoginForm from './components/LoginForm';

function Login() {
  return (
    <div className="absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] grid-rows-[15vh_85vh] flex flex-col items-center justify-center gap-8 h[85vh]">
      <LoginForm />
    </div>
  );
}

export default Login;
