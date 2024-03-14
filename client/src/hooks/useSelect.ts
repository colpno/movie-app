import { useState } from 'react';

import { SelectOption } from '~/types/form.ts';

interface UseSelectProps {
  options: SelectOption[];
  onChange: (option: SelectOption) => void;
}

function useSelect({ options, onChange }: UseSelectProps) {
  const [selectedOption, setSelectedOption] = useState({
    label: options[0].label,
    value: options[0].value,
  });

  const handleChange = (newValue: string) => {
    const selectedOption = options.find((option) => option.value === newValue)!;
    setSelectedOption(selectedOption);
    onChange(selectedOption);
  };

  return { option: selectedOption, handleChange };
}

export default useSelect;
