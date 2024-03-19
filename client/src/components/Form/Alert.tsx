import { HTMLAttributes, memo, ReactNode } from 'react';

export interface AlertProps extends HTMLAttributes<HTMLParagraphElement> {
  children: ReactNode;
  noStyles?: boolean;
}

function Alert({ children, noStyles, className, ...pProps }: AlertProps) {
  const styles = noStyles
    ? className
    : `text-red-500 text-xs italic${className ? ` ${className}` : ''}`;

  return (
    <p className={styles} {...pProps}>
      {children}
    </p>
  );
}

export default memo(Alert);
