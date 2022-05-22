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
    <MantineProvider
      theme={themes[theme] || lightTheme}
      styles={{
        Input: { root: { height: "48px", color: "red" } },
        Button: { root: { height: "48px", padding: "0px 48px" } },
        Checkbox: {
          label: {
            fontSize: "14px",
            cursor: "pointer",
            lineHeight: "normal",
            color: themes[theme].colors.grey,
          },
          input: { cursor: "pointer" },
        },
      }}
    >
      {children}
    </MantineProvider>
  );
};

Theme.propTypes = {
  children: PropTypes.any,
};

export default Theme;
