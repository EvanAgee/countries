import React, { useEffect, useMemo, useState } from "react";

export const ThemeContext = React.createContext({
  darkModeActive: false,
  toggleDark: (newVal: boolean) => {},
});

export interface IThemeProviderProps {
  children: React.ReactNode;
}

export const ThemeProvider: React.FC<IThemeProviderProps> = ({
  children,
}: IThemeProviderProps) => {
  const [darkModeActive, toggleDark] = useState(false);
  const state = useMemo(
    () => ({ darkModeActive, toggleDark }),
    [darkModeActive, toggleDark]
  );

  // Auto-set dark mode based on user's OS preference
  useEffect(() => {
    const storedDarkMode = localStorage.getItem("darkMode") || null;
    if (storedDarkMode !== null) {
      const darkMode = storedDarkMode === "true";
      if (darkMode !== darkModeActive) {
        toggleDark(darkMode);
      }
    } else {
      if (window?.matchMedia("(prefers-color-scheme: dark)").matches) {
        toggleDark(true);
      }
    }
  }, []);

  return (
    <ThemeContext.Provider value={state}>{children}</ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = React.useContext(ThemeContext);
  return { ...context };
};
