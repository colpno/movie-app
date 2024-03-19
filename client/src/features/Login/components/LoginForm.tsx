import { z } from 'zod';

import Button from '~/components/Button/Button.tsx';
import Form from '~/components/Form/Form.tsx';
import InputGroup from '~/components/Form/InputGroup.tsx';

export interface LoginFormValues {
  email: string;
  password: string;
}

interface LoginFormProps {
  onSubmit: (formValues: LoginFormValues) => void;
}

const schema = z
  .object({
    email: z.string().email().trim(),
    password: z.string().min(8).regex(/\S/).trim(),
  })
  .required();

function LoginForm({ onSubmit }: LoginFormProps) {
  return (
    <div className="flex flex-col items-center justify-center p-8 bg-[#000000b0] w-[25rem] gap-8 text-white">
      <div className="title">
        <h2>Login</h2>
      </div>
      <Form<LoginFormValues>
        onSubmit={onSubmit}
        validationSchema={schema}
        className="flex flex-col gap-8"
      >
        {({ register, errors }) => (
          <>
            <InputGroup
              label={{ children: 'Email', htmlFor: 'email' }}
              input={{ ...register('email') }}
              error={errors.email?.message}
              required
            />
            <InputGroup
              label={{ children: 'Password', htmlFor: 'password' }}
              input={{ ...register('password'), type: 'password' }}
              error={errors.password?.message}
              required
            />
            <Button
              className="px-2 py-4 bg-[#e50914] cursor-pointer text-white rounded-[0.2rem] font-bold text-[1.05rem]"
              type="submit"
            >
              Login to your account
            </Button>
          </>
        )}
      </Form>
    </div>
  );
}

export default LoginForm;
