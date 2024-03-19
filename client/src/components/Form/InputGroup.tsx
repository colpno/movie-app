import { HTMLAttributes, memo } from 'react';

import Alert, { AlertProps } from './Alert.tsx';
import Info, { InfoProps } from './Info.tsx';
import Input, { InputProps } from './Input.tsx';
import Label, { LabelProps } from './Label.tsx';

interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
  noStyles?: boolean;
}

interface InputGroupProps {
  input: Omit<InputProps, 'name'> & { name: string };
  label?: Omit<LabelProps, 'htmlFor'> & { htmlFor: string };
  error?: string;
  alert?: Partial<AlertProps>;
  info?: Partial<InfoProps>;
  container?: ContainerProps;
  required?: boolean;
}

function InputGroup({ error, label, alert, info, input, container, required }: InputGroupProps) {
  const containerStyles = container?.noStyles
    ? container.className
    : `w-full px-3 mb-6 md:mb-0${container?.className ? ` ${container.className}` : ''}`;

  return (
    <div className={containerStyles} {...container}>
      {label && (
        <Label {...label} required={required}>
          {label.children}
        </Label>
      )}
      <Input {...input} aria-invalid={!!error} />
      {error && (
        <Alert className="mt-2" {...alert}>
          {error}
        </Alert>
      )}
      {info && <Info {...info}>{info.children}</Info>}
    </div>
  );
}

export default memo(InputGroup);
