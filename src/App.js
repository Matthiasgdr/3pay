import React, { useEffect } from "react";
import { Example, LogoutButton } from "./components";
import { ThemeProvider } from "styled-components";

import { useToggleTheme } from "./components/theme/context";
import { lightTheme, darkTheme, redTheme } from "./components/theme/theme";
import { useMoralis } from "react-moralis";

const App = () => {
  const {
    authenticate,
    isWeb3Enabled,
    isAuthenticated,
    user,
    enableWeb3,
    Moralis,
  } = useMoralis();

  async function authWalletConnect() {
    const user = authenticate({
      provider: "walletconnect",
      chainId: 56,
      // mobileLinks: [
      //   "metamask",
      //   "trust",
      //   "rainbow",
      //   "argent",
      //   "imtoken",
      //   "pillar",
      // ],
      signingMessage: "Welcome!",
    });
    console.log(user);
  }

  const value = useToggleTheme();
  const themes = {
    light: lightTheme,
    dark: darkTheme,
    red: redTheme,
  };

  useEffect(() => {
    if (!isWeb3Enabled && isAuthenticated) {
      enableWeb3({ provider: "walletconnect", chainId: 56 });
      console.log("web3 activated");
    }
  }, [isWeb3Enabled, isAuthenticated, enableWeb3]);

  document.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "hidden") {
      window.localStorage.removeItem("WALLETCONNECT_DEEPLINK_CHOICE");
    }
  });

  return (
    <ThemeProvider theme={themes[value.theme] || lightTheme}>
      <div className="App">
        {!isAuthenticated && !user ?
          <h1>Wallet authentication</h1>:
          <h1>Wallet Logged in</h1>
        }

        {!isAuthenticated && !user ?
        <div>
          <button
            onClick={() => authenticate({ signingMessage: "Hello youtube" })}>
            Sign in using Metamask
          </button>
          <button
            onClick={() => authWalletConnect()}>
            Sign in using Wallet Connect
          </button>
        </div>:
        <LogoutButton />}

        <Example />
        {/* <button type="button" onClick={toggleTheme}></button>
        <button type="button" onClick={setTheme("red")}></button> */}
      </div>
    </ThemeProvider>
  );
};

export default App;
