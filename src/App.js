import React from "react";
import { Routes, Route } from "react-router-dom";
import { ToggleThemeProvider } from "./components/theme/context";
import { UserContextProvider } from "./hooks/useUser";
import Theme from "./components/theme";
import GlobalStyle from "./components/theme/globalStyle";

import LoginPage from "./pages/login";
import SignUpPage from "./pages/signup";
import Home from "./pages/home";

const App = () => {
  return (
    <ToggleThemeProvider>
      <Theme>
        <UserContextProvider>
          <GlobalStyle />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="login" element={<LoginPage />} />
            <Route path="signup" element={<SignUpPage />} />
          </Routes>
        </UserContextProvider>
      </Theme>
    </ToggleThemeProvider>
  );
};

export default App;
