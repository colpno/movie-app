import { useLogin } from '~/apis/auth/login.ts';
import LoginForm, { LoginFormValues } from '~/features/Login/components/LoginForm.tsx';
import useLoading from '~/hooks/useLoading.ts';

function LoginPage() {
  const { mutate: login, isPending } = useLogin();

  useLoading(isPending);

  const handleSubmit = async ({ email, password }: LoginFormValues) => {
    login({
      email,
      password,
    });
  };

  return (
    <div className="absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] grid-rows-[15vh_85vh] flex flex-col items-center justify-center gap-8 h[85vh]">
      <LoginForm onSubmit={handleSubmit} />
    </div>
  );
}

export default LoginPage;
