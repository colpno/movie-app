import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useRegister } from '~/apis/auth/register.ts';
import { userKeys } from '~/apis/user/queryKey.ts';
import queryClient from '~/lib/react-query/client.ts';

function SignUpForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [formValues, setFormValues] = useState({
    email: '',
    password: '',
  });
  const { mutate: register } = useRegister();
  const user = queryClient.getQueryData(userKeys.detail);
  const navigate = useNavigate();

  const handleSignIn = async () => {
    const { email, password } = formValues;
    register({ data: { email, password } });
  };

  useEffect(() => {
    if (user) navigate('/');
  }, [user, navigate]);

  return (
    <div className="flex flex-col items-center justify-center gap-4 text-white">
      <div className="flex flex-col gap-4 text-center text-[2rem]">
        <h1 className="py-[2.5rem]">Unlimited movies, TV shows and more.</h1>
        <h4>Watch anywhere. Cancel anytime.</h4>
        <h6>Ready to watch? Enter your email to create or restart membership.</h6>
      </div>
      <div
        className={`[&>input]:text-black [&>input]:p-6 [&>input]:text-[1.2rem] [&>input]:border [&>input]:border-black [&>input:focus]:outline-none grid ${
          showPassword ? 'grid-cols-2' : 'grid-cols-[2fr_1fr]'
        }`}
      >
        <input
          type="email"
          placeholder="Email address"
          onChange={(e) => setFormValues({ ...formValues, [e.target.name]: e.target.value })}
          name="email"
          value={formValues.email}
        />
        {showPassword && (
          <input
            type="password"
            placeholder="Password"
            onChange={(e) => setFormValues({ ...formValues, [e.target.name]: e.target.value })}
            name="password"
            value={formValues.password}
          />
        )}
        {!showPassword && (
          <button
            className="px-2 py-4 bg-[#e50914] border-none cursor-pointer text-white font-bold text-[1.05rem]"
            onClick={() => setShowPassword(true)}
          >
            Get Started
          </button>
        )}
      </div>
      {showPassword && (
        <button
          className="px-2 py-4 bg-[#e50914] border-none cursor-pointer text-white font-bold text-[1.05rem] rounded-[0.2rem]"
          onClick={handleSignIn}
        >
          Log In
        </button>
      )}
    </div>
  );
}

export default SignUpForm;
