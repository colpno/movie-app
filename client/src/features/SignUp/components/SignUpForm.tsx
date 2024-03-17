import { useState } from 'react';

export interface SignUpFormValues {
  email: string;
  password: string;
}

interface SignUpFormProps {
  onSubmit: (formValues: SignUpFormValues) => void;
}

function SignUpForm({ onSubmit }: SignUpFormProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [formValues, setFormValues] = useState({
    email: '',
    password: '',
  });

  const onEmailChange = (newEmail: string) =>
    setFormValues((prev) => ({ ...prev, email: newEmail }));
  const onPasswordChange = (newPassword: string) =>
    setFormValues((prev) => ({ ...prev, password: newPassword }));

  return (
    <>
      <div
        className={`[&>input]:text-black [&>input]:p-6 [&>input]:text-[1.2rem] [&>input]:border [&>input]:border-black [&>input:focus]:outline-none grid ${
          showPassword ? 'grid-cols-2' : 'grid-cols-[2fr_1fr]'
        }`}
      >
        <input
          type="email"
          placeholder="Email address"
          onChange={(e) => onEmailChange(e.target.value)}
          name="email"
          value={formValues.email}
        />
        {showPassword && (
          <input
            type="password"
            placeholder="Password"
            onChange={(e) => onPasswordChange(e.target.value)}
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
          onClick={() => onSubmit(formValues)}
        >
          Sign up
        </button>
      )}
    </>
  );
}

export default SignUpForm;
