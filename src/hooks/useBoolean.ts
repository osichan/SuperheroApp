import { useCallback, useState } from "react";

interface UseBooleanReturn {
  value: boolean;
  toggle(): void;
  setTrue(): void;
  setFalse(): void;
  setBoolean(value: boolean): void;
  setValue(value: boolean): void;
  reset(): void;
}

export function useBoolean(initialValue = false): UseBooleanReturn {
  const [value, setValue] = useState(initialValue);

  const toggle = useCallback(() => setValue((prev) => !prev), []);
  const setTrue = useCallback(() => setValue(true), []);
  const setFalse = useCallback(() => setValue(false), []);
  const reset = useCallback(() => setValue(initialValue), [initialValue]);
  const setBoolean = useCallback((value: boolean) => setValue(value), []);

  return {
    value,
    toggle,
    setTrue,
    setFalse,
    setBoolean,
    reset,
    setValue,
  };
}
