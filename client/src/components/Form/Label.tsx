import { LabelHTMLAttributes, memo, ReactNode } from 'react';

export interface LabelProps extends LabelHTMLAttributes<HTMLLabelElement> {
  children: ReactNode;
  noStyle?: boolean;
  required?: boolean;
}

function Label({ children, noStyle, className, required, ...labelProps }: LabelProps) {
  const styles = noStyle
    ? className
    : `block text-gray-300 font-bold md:text-left mb-1 md:mb-0 pr-4${
        className ? ` ${className}` : ''
      }`;

  return (
    <label className={styles} {...labelProps}>
      {children}
      {required && <span className="text-red-500 ml-1">*</span>}
    </label>
  );
}

export default memo(Label);
