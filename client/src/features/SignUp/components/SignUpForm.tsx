import { useState } from 'react';
import { z } from 'zod';

import Button from '~/components/Button/Button.tsx';
import Form from '~/components/Form/Form.tsx';
import InputGroup from '~/components/Form/InputGroup.tsx';

export interface SignUpFormValues {
  email: string;
  password: string;
}

interface SignUpFormProps {
  onSubmit: (formValues: SignUpFormValues) => void;
}

const schema = z
  .object({
    email: z.string().email().trim(),
    password: z.string().min(8).regex(/\S/).trim(),
  })
  .required();

function SignUpForm({ onSubmit }: SignUpFormProps) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <>
      <Form<SignUpFormValues>
        onSubmit={onSubmit}
        validationSchema={schema}
        className={`[&_input]:text-black [&_input]:p-6 [&_input]:text-[1.2rem] [&_input]:border [&_input]:border-black [&_input:focus]:outline-none grid ${
          showPassword
            ? "grid-cols-2 [grid-template-areas:'email_password''submit_submit']"
            : "grid-cols-[2fr_1fr] [grid-template-areas:'email_started']"
        }`}
      >
        {({ errors, register }) => (
          <>
            <InputGroup
              input={{ ...register('email'), placeholder: 'Email address' }}
              alert={{ className: 'bg-black' }}
              container={{ className: `margin-0 [grid-area:email]` }}
              error={errors.email?.message}
              required
            />
            {showPassword ? (
              <>
                <InputGroup
                  input={{ ...register('password'), placeholder: 'Password', type: 'password' }}
                  alert={{ className: 'bg-black' }}
                  container={{ className: 'margin-0 [grid-area:password]' }}
                  error={errors.password?.message}
                  required
                />
                <Button
                  type="submit"
                  noStyles
                  className={`px-6 py-4 mt-8 bg-[#e50914] border-none cursor-pointer text-white font-bold text-[1.05rem] rounded-[0.2rem] [grid-area:submit] justify-self-center`}
                >
                  Sign up
                </Button>
              </>
            ) : (
              <Button
                noStyles
                className="px-2 py-4 bg-[#e50914] border-none cursor-pointer text-white font-bold text-[1.05rem] [grid-area:started]"
                onClick={() => setShowPassword(true)}
              >
                Get Started
              </Button>
            )}
          </>
        )}
      </Form>
    </>
  );
}

export default SignUpForm;
