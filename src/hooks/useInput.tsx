import { ChangeEvent, useState } from 'react';

function useInput(
  defaultValue: string = ''
): [
  string,
  (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
] {
  const [value, setValue] = useState<string>(defaultValue);

  const onValueChangeHandler = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setValue(event.target.value);
  };

  return [value, onValueChangeHandler];
}

export { useInput };
