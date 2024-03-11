import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useLogin } from '~/apis/auth/login.ts';

function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { mutate: login, isSuccess: isLoggedIn } = useLogin();
  const navigate = useNavigate();

  const handleLogin = async () => {
    login({
      email,
      password,
    });
  };

  useEffect(() => {
    if (isLoggedIn) navigate('/');
  }, [isLoggedIn, navigate]);

  return (
    <div className="flex flex-col items-center justify-center p-8 bg-[#000000b0] w-[25rem] gap-8 text-white">
      <div className="title">
        <h3>Login</h3>
      </div>
      <div className="flex flex-col gap-8 [&>input]:text-black [&>input]:px-2 [&>input]:py-4 [&>input]:w-[15rem]">
        <input
          type="text"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
        <button
          className="px-2 py-4 bg-[#e50914] cursor-pointer text-white rounded-[0.2rem] font-bold text-[1.05rem]"
          onClick={handleLogin}
        >
          Login to your account
        </button>
      </div>
    </div>
  );
}

export default LoginForm;
