import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';
import { FieldErrors, FieldValues, SubmitHandler, useForm, UseFormRegister } from 'react-hook-form';
import { ZodSchema } from 'zod';

interface FormChildrenProps<T extends FieldValues> {
  register: UseFormRegister<T>;
  errors: FieldErrors<T>;
}

type HTMLFormProps = Omit<React.FormHTMLAttributes<HTMLFormElement>, 'children' | 'onSubmit'>;

interface FormProps<T extends FieldValues> extends HTMLFormProps {
  children: (useFormReturn: FormChildrenProps<T>) => React.ReactNode;
  onSubmit: (data: T) => void;
  validationSchema: ZodSchema;
}

function Form<T extends FieldValues>({
  children,
  onSubmit,
  validationSchema,
  ...formProps
}: FormProps<T>) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<T>({
    resolver: zodResolver(validationSchema),
  });
  const submitHandler: SubmitHandler<T> = (data) => onSubmit(data);

  return (
    <form onSubmit={handleSubmit(submitHandler)} {...formProps}>
      {children({ register, errors })}
    </form>
  );
}

export default Form;
