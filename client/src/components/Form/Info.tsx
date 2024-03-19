import { HTMLAttributes, memo, ReactNode } from 'react';

export interface InfoProps extends HTMLAttributes<HTMLParagraphElement> {
  children: ReactNode;
  noStyles?: boolean;
}

function Info({ children, noStyles, className, ...pProps }: InfoProps) {
  const styles = noStyles
    ? className
    : `text-gray-600 text-xs italic${className ? ` ${className}` : ''}`;

  return (
    <p className={styles} {...pProps}>
      {children}
    </p>
  );
}

export default memo(Info);
