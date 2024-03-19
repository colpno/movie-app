import { memo, SelectHTMLAttributes, useId } from 'react';

import useSelect from '~/hooks/useSelect.ts';
import { SelectOption } from '~/types/form.ts';

type HTMLSelectProps = Omit<SelectHTMLAttributes<HTMLSelectElement>, 'value' | 'onChange'>;

export interface SelectProps extends HTMLSelectProps {
  onChange: (option: SelectOption) => void;
  options: SelectOption[];
  noStyles?: boolean;
}

function Select({ onChange, options, className, noStyles, ...selectProps }: SelectProps) {
  const { option, handleChange } = useSelect({ options, onChange });
  const uuid = useId();
  const styles = noStyles
    ? className
    : `bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500${
        className ? ` ${className}` : ''
      }`;

  return (
    <select
      {...selectProps}
      className={styles}
      value={option.value}
      onChange={({ target }) => handleChange(target.value)}
    >
      {options.map((option, index) => {
        return (
          <option value={option.value} key={`${index}${uuid}`}>
            {option.label}
          </option>
        );
      })}
    </select>
  );
}

export default memo(Select);
