import React, { createContext, useState } from 'react';

interface ThemeContextProps {
  theme: Theme;
  changeTheme: (theme: Theme) => void;
}

export type Theme = 'classic' | 'dark' | 'unicorn';

export const ThemeContext = createContext<ThemeContextProps>({
  theme: 'classic',
  changeTheme: () => {},
});

interface ProviderProps {
  children?: React.ReactNode;
}

const ThemeProvider = ({ children }: ProviderProps) => {
  const [theme, setTheme] = useState<Theme>(
    (localStorage.getItem('theme') as Theme) || 'classic'
  );

  const changeThemeHandler = (theme: Theme) => {
    setTheme(theme);
    localStorage.setItem('theme', theme);
  };
  return (
    <ThemeContext.Provider
      value={{
        theme: theme,
        changeTheme: changeThemeHandler,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
