// src/hooks/useLocalStorage.js
import { useState, useEffect } from 'react';

const useLocalStorage = (key, initialValue) => {
  // Initialize state with value from Local Storage or initial value
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item !== null ? parseFloat(item) : initialValue;
    } catch (error) {
      console.error(`Error reading Local Storage key "${key}":`, error);
      return initialValue;
    }
  });

  // Update Local Storage whenever the state changes
  useEffect(() => {
    try {
      window.localStorage.setItem(key, storedValue);
    } catch (error) {
      console.error(`Error setting Local Storage key "${key}":`, error);
    }
  }, [key, storedValue]);

  return [storedValue, setStoredValue];
};

export default useLocalStorage;
