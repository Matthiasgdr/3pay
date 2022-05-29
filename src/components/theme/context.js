import React, { useContext, useState } from "react";

export const ToggleContext = React.createContext();

export const ThemeContext = () => {
  const [theme, setThemeState] = useState("light");

  const toggleTheme = () => {
    setThemeState(theme === "light" ? "dark" : "light");
  };

  const setTheme = (t) => {
    setThemeState(t);
  };

  return <ToggleContext.Provider value={{ theme, toggleTheme, setTheme }} />;
};

export const useToggleTheme = () => {
  const context = useContext(ToggleContext);
  return { ...context };
};

ThemeContext.propTypes = {};

export default { ThemeContext, useToggleTheme };
