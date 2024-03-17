import { useState } from 'react';

export interface LoginFormValues {
  email: string;
  password: string;
}

interface LoginFormProps {
  onSubmit: (formValues: LoginFormValues) => void;
}

function LoginForm({ onSubmit }: LoginFormProps) {
  const [formValues, setFormValues] = useState({
    email: '',
    password: '',
  });

  const onEmailChange = (newEmail: string) =>
    setFormValues((prev) => ({ ...prev, email: newEmail }));
  const onPasswordChange = (newPassword: string) =>
    setFormValues((prev) => ({ ...prev, password: newPassword }));

  return (
    <div className="flex flex-col items-center justify-center p-8 bg-[#000000b0] w-[25rem] gap-8 text-white">
      <div className="title">
        <h3>Login</h3>
      </div>
      <div className="flex flex-col gap-8 [&>input]:text-black [&>input]:px-2 [&>input]:py-4 [&>input]:w-[15rem]">
        <input
          type="text"
          placeholder="Email"
          onChange={(e) => onEmailChange(e.target.value)}
          value={formValues.email}
        />
        <input
          type="password"
          placeholder="Password"
          onChange={(e) => onPasswordChange(e.target.value)}
          value={formValues.password}
        />
        <button
          className="px-2 py-4 bg-[#e50914] cursor-pointer text-white rounded-[0.2rem] font-bold text-[1.05rem]"
          onClick={() => onSubmit(formValues)}
        >
          Login to your account
        </button>
      </div>
    </div>
  );
}

export default LoginForm;
