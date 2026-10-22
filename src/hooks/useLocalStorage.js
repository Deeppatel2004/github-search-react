import { useState, useEffect } from 'react';
import { readStore } from '../helpers';

export function useLocalStorage(key, initial) {
  const [value, setValue] = useState(() =>
    readStore(localStorage.getItem(key), initial)
  );

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
}