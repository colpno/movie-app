import { useRegister } from '~/apis/auth/register.ts';
import SignUpForm, { SignUpFormValues } from '~/features/SignUp/components/SignUpForm.tsx';
import SignUpQuotes from '~/features/SignUp/components/SignUpQuotes.tsx';
import useAuthenticate from '~/hooks/useAuthenticate.ts';

function SignUpPage() {
  useAuthenticate();
  const { mutate: register } = useRegister();

  const handleSubmit = async (formValues: SignUpFormValues) => {
    const { email, password } = formValues;
    register({ email, password });
  };

  return (
    <div className="absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] grid grid-row-[15vh 85v]">
      <div className="flex flex-col items-center justify-center gap-4 text-white">
        <SignUpQuotes />
        <SignUpForm onSubmit={handleSubmit} />
      </div>
    </div>
  );
}

export default SignUpPage;
