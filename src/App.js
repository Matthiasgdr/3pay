import React from "react";
import { Example, WalletLinking } from "./components";
import { ThemeProvider } from "styled-components";

import { useToggleTheme } from "./components/theme/context";
import { lightTheme, darkTheme, redTheme } from "./components/theme/theme";

const App = () => {
  const value = useToggleTheme();
  const themes = {
    light: lightTheme,
    dark: darkTheme,
    red: redTheme,
  };

  return (
    <ThemeProvider theme={themes[value.theme] || lightTheme}>
      <div className="App">
        <WalletLinking />
        <Example />
        {/* <button type="button" onClick={toggleTheme}></button>
        <button type="button" onClick={setTheme("red")}></button> */}
      </div>
    </ThemeProvider>
  );
};

export default App;
