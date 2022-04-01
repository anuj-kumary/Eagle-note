import { createContext, useState, useContext } from 'react';
import {} from 'react/cjs/react.development';

const ThemeContext = createContext();

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('dark');

  const changeTheme = () => {
    setTheme((theme) => (theme === 'dark' ? 'light' : 'dark'));
  };

  return (
    <ThemeContext.Provider value={{ theme, changeTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
const useTheme = () => useContext(ThemeContext);

export { ThemeProvider, useTheme };
