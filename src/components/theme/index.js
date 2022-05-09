import React from "react";
import PropTypes from "prop-types";
import { ThemeProvider } from "styled-components";

import { useToggleTheme } from "./context";
import { lightTheme, darkTheme, redTheme } from "./theme";

const Theme = ({ children }) => {
  const { theme } = useToggleTheme();

  const themes = {
    light: lightTheme,
    dark: darkTheme,
    red: redTheme,
  };

  return (
    <ThemeProvider theme={themes[theme] || lightTheme}>
      {children}
    </ThemeProvider>
  );
};

Theme.propTypes = {
  children: PropTypes.any,
};

export default Theme;
