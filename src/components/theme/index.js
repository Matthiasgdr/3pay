import React from "react";
import PropTypes from "prop-types";
import { MantineProvider } from "@mantine/core";

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
    <MantineProvider theme={themes[theme] || lightTheme}>
      {children}
    </MantineProvider>
  );
};

Theme.propTypes = {
  children: PropTypes.any,
};

export default Theme;
