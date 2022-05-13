import React from "react";
import { BankLinking } from "./components";

import { ToggleThemeProvider } from "./components/theme/context";
import Theme from "./components/theme";
import GlobalStyle from "./components/theme/globalStyle";
import Toolbar from "./components/Toolbar";
import { SignUpButton } from "./components/WalletLinking";
import { Link } from "react-router-dom";

const App = () => {
  return (
    <ToggleThemeProvider>
      <Theme>
        <Link to="/login">login</Link>
        <Link to="/signup">signup</Link>
        <GlobalStyle />
        <BankLinking />
        <SignUpButton />
        <Toolbar />
      </Theme>
    </ToggleThemeProvider>
  );
};

export default App;
