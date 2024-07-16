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
  const [theme, setTheme] = useState<Theme>('classic');

  const changeThemeHandler = (theme: Theme) => {
    console.log('set theme', theme);
    setTheme(theme);
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
