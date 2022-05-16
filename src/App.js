import React from "react";
import { Routes, Route } from "react-router";
import { ToggleThemeProvider } from "./components/theme/context";
import { UserContextProvider } from "./hooks/useUser";
import Theme from "./components/theme";
import GlobalStyle from "./components/theme/globalStyle";
// import { useMoralis } from "react-moralis";

import AuthLayout from "./layouts/AuthLayout";
import MainLayout from "./layouts/MainLayout";

import LoginPage from "./pages/login";
import SignUpPage from "./pages/signup";
import Home from "./pages/home";

const App = () => {
  //   const { isAuthenticated } = useMoralis();
  return (
    <ToggleThemeProvider>
      <Theme>
        <UserContextProvider>
          <GlobalStyle />
          <Routes>
            <Route path="/" element={<AuthLayout />}>
              <Route path="login" element={<LoginPage />} />
              <Route path="signup" element={<SignUpPage />} />
            </Route>
            <Route path="/" element={<MainLayout />}>
              <Route path="home" element={<Home />} />
            </Route>
          </Routes>
        </UserContextProvider>
      </Theme>
    </ToggleThemeProvider>
  );
};

export default App;
