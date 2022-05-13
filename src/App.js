import React from "react";
import { BankLinking } from "./components";

import { ToggleThemeProvider } from "./components/theme/context";
import Theme from "./components/theme";
import GlobalStyle from "./components/theme/globalStyle";
import Toolbar from "./components/Toolbar";
import SignUp from "./components/account/Signup";
import Login from "./components/account/Login";
import { SignUpButton } from "./components/WalletLinking";

const App = () => {
  return (
    <ToggleThemeProvider>
      <Theme>
        <GlobalStyle />
        <BankLinking />
        <SignUpButton />
        <SignUp />
        <Login />
        <Toolbar />
      </Theme>
    </ToggleThemeProvider>
  );
};

export default App;
