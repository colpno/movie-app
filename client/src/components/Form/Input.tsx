import { forwardRef, InputHTMLAttributes, memo, Ref } from 'react';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  noStyle?: boolean;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ noStyle, className, ...inputProps }, ref: Ref<HTMLInputElement>) => {
    const normalVariant = 'bg-gray-200 border-gray-200 focus:border-red-500';
    const errorVariant = 'bg-red-200 border-red-500 focus:border-red-500';
    const variant = inputProps['aria-invalid'] ? errorVariant : normalVariant;

    const styles = noStyle
      ? className
      : `${variant}${
          className ? ` ${className}` : ''
        } appearance-none border-2 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white`;

    return <input className={styles} type="text" ref={ref} {...inputProps} />;
  }
);

export default memo(Input);
