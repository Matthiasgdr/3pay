import React, { useContext, useState } from "react";
import PropTypes from "prop-types";

export const ToggleContext = React.createContext();

export const ToggleThemeProvider = ({ children }) => {
  const [theme, setThemeState] = useState("light");

  const toggleTheme = () => {
    setThemeState((prev) => (prev === "light" ? "dark" : "light"));
  };

  const setTheme = (t) => {
    setThemeState(t);
  };

  return (
    <ToggleContext.Provider value={{ theme, toggleTheme, setTheme }}>
      {children}
    </ToggleContext.Provider>
  );
};

export const useToggleTheme = () => {
  const context = useContext(ToggleContext);
  return { ...context };
};

ToggleThemeProvider.propTypes = {
  children: PropTypes.any,
};

export default { ToggleThemeProvider, useToggleTheme };
