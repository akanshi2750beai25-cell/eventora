import React, { createContext, useContext, useEffect, useState } from 'react';//All of them can access the theme without passing props through every component.

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => {
    try {
      const savedTheme = localStorage.getItem('eventora_theme');
      return savedTheme ? savedTheme : 'dark';
    } catch {
      return 'dark';//It means React will execute this function when the state is initially created to determine the starting value.
    }
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    try {
      localStorage.setItem('eventora_theme', theme);
    } catch (e) {
      console.warn('LocalStorage error:', e);
    }
  }, [theme]);//is called the dependency array.

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'dark' ? 'light' : 'dark'));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
