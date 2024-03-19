import {
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  ElementType,
  HTMLAttributes,
  ReactNode,
} from 'react';
import { Link, LinkProps } from 'react-router-dom';

import './Button.css';

type Variant = 'primary' | 'secondary' | 'text';
type Size = 'xs' | 'sm' | 'lg' | 'xl';

type BaseProps = {
  children?: ReactNode | ReactNode[];
  to?: string;
  href?: string;
  variant?: Variant | `outline-${Variant}`;
  size?: Size;
  hasLabel?: boolean;
  noStyles?: boolean;
};
type Props<T> = T extends { to: string }
  ? LinkProps
  : T extends { href: string }
  ? AnchorHTMLAttributes<HTMLAnchorElement>
  : ButtonHTMLAttributes<HTMLButtonElement> & HTMLAttributes<HTMLButtonElement>;

function Button<T>({
  children,
  to,
  href,
  variant,
  size,
  hasLabel,
  className,
  noStyles,
  ...componentBaseProps
}: Props<T> & BaseProps) {
  let Component: ElementType = 'button';
  const componentProps: Partial<LinkProps & AnchorHTMLAttributes<HTMLAnchorElement>> = {};
  const classes = noStyles ? [className] : ['btn', className];

  variant && classes.push(`btn-${variant}`);
  size && classes.push(`btn-${size}`);
  hasLabel && classes.push('btn-has-label');

  switch (true) {
    case Boolean(to): {
      Component = Link;
      componentProps.to = to;
      break;
    }
    case Boolean(href): {
      Component = 'a';
      componentProps.href = href;
      break;
    }
    default: {
      componentProps.type = componentBaseProps.type ?? 'button';
      break;
    }
  }

  return (
    <Component {...componentBaseProps} {...componentProps} className={classes.join(' ')}>
      {children}
    </Component>
  );
}

export default Button;
