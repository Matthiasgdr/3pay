import React from "react";
import { BankLinking } from "./components";

import { ToggleThemeProvider } from "./components/theme/context";
import Theme from "./components/theme";
import GlobalStyle from "./components/theme/globalStyle";
import Toolbar from "./components/Toolbar";
import SignUp from "./components/account/Signup";
import Login from "./components/account/Login";
import { SignUpButton } from "./components/WalletLinking";
import { Link } from "react-router-dom";
import useUser from "./hooks/useUser";
import useWalletTransactions from "./hooks/useWalletTransactions";

const App = () => {
  const { userAddress } = useUser();
  const transactions = useWalletTransactions(userAddress && userAddress[0]);

  return (
    <ToggleThemeProvider>
      <Theme>
        <Link to="/login">login</Link>
        <Link to="/signup">signup</Link>
        <GlobalStyle />
        <BankLinking />
        <SignUpButton />
        <SignUp />
        <Login />
        <Toolbar />
        {transactions?.map((transaction) => (
          <p key={transaction.id}>
            {transaction.attributes.decimal.value.$numberDecimal} ETH
          </p>
        ))}
      </Theme>
    </ToggleThemeProvider>
  );
};

export default App;
