import React from "react";
import { Routes, Route } from "react-router";
import { ToggleThemeProvider } from "./theme/context";
import { UserContextProvider } from "./hooks/useUser";
import { ConnexionProvider } from "./hooks/useConnected";
import Theme from "./theme";
import GlobalStyle from "./theme/globalStyle";

import AuthLayout from "./layouts/AuthLayout";
import MainLayout from "./layouts/MainLayout";

import LoginPage from "./pages/login";
import SignUpPage from "./pages/signup";
import Home from "./pages/home";

const App = () => {
  return (
    <ToggleThemeProvider>
      <Theme>
        <UserContextProvider>
          <GlobalStyle />
          <ConnexionProvider>
            <Routes>
              <Route path="/" element={<MainLayout />}>
                <Route path="" element={<Home />} />
              </Route>
              <Route path="/" element={<AuthLayout />}>
                <Route path="login" element={<LoginPage />} />
                <Route path="signup" element={<SignUpPage />} />
              </Route>
            </Routes>
          </ConnexionProvider>
        </UserContextProvider>
      </Theme>
    </ToggleThemeProvider>
  );
};

export default App;
