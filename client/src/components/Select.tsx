import { memo, useId } from 'react';

import useSelect from '~/hooks/useSelect.ts';
import { SelectOption } from '~/types/form.ts';

export interface SelectProps {
  onChange: (option: SelectOption) => void;
  options: SelectOption[];
  className?: string;
}

function Select({ onChange, options, className }: SelectProps) {
  const { option, handleChange } = useSelect({ options, onChange });
  const uuid = useId();

  return (
    <select
      className={`flex cursor-pointer text-[1.4rem] bg-[#00000066] text-white ${className ?? ''}`}
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
