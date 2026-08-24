import { useState, useEffect } from 'react';

/**
 * Custom hook for synchronizing state with localStorage
 * Demonstrates React state, JSON serialization, and side effects
 * @param {string} key - localStorage key
 * @param {*} initialValue - Fallback default value
 */
export function useLocalStorage(key, initialValue) {
  // Read value from localStorage or fallback
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.warn(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  });

  // Save to localStorage when state changes
  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(storedValue));
    } catch (error) {
      console.warn(`Error setting localStorage key "${key}":`, error);
    }
  }, [key, storedValue]);

  return [storedValue, setStoredValue];
}

export default useLocalStorage;
