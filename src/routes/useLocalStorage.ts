import { useState } from "react";

export function useLocalStorage(key: string, defaultValue: unknown) {
  const [storedValue, setStoredValue] = useState(() => {
    if (typeof window === "undefined") return defaultValue;

    try {
      const item = localStorage.getItem(key);
      return JSON.parse(item);
    } catch (error) {
      console.log(error);
      return defaultValue;
    }
  });

  const setValue = (value: unknown) => {
    try {
      setStoredValue(value);
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.log(error);
    }
  };

  const removeValue = () => {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.log(error);
    }
  };
  return [storedValue, setValue, removeValue];
}
