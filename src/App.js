import React from "react";
import { Routes, Route } from "react-router";
import { ToggleThemeProvider } from "./theme/context";
import { UserContextProvider } from "./hooks/useUser";
import Theme from "./theme";
import GlobalStyle from "./theme/globalStyle";

import AuthLayout from "./layouts/AuthLayout";
import MainLayout from "./layouts/MainLayout";

import LoginPage from "./pages/login";
import SignUpPage from "./pages/signup";
import Home from "./pages/home";
import Transactions from "./pages/transactions";
import Settings from "./pages/settings";
import Wallet from "./pages/wallet";
import Placement from "./pages/placement";

const App = () => {
  return (
    <ToggleThemeProvider>
      <Theme>
        <UserContextProvider>
          <GlobalStyle />
          <Routes>
            <Route path="/" element={<MainLayout />}>
              <Route path="" element={<Home />} />
              <Route path="transactions" element={<Transactions />} />
              <Route path="settings" element={<Settings />} />
              <Route path="wallet" element={<Wallet />} />
              <Route path="placement" element={<Placement />} />
            </Route>
            <Route path="/" element={<AuthLayout />}>
              <Route path="login" element={<LoginPage />} />
              <Route path="signup" element={<SignUpPage />} />
            </Route>
          </Routes>
        </UserContextProvider>
      </Theme>
    </ToggleThemeProvider>
  );
};

export default App;
