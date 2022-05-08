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
    enableWeb3
  } = useMoralis();

  async function authWalletConnect() {
    const user = authenticate({
      provider: "walletconnect",
      chainId: 56,
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
      enableWeb3();
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
            onClick={() => authenticate({ signingMessage: "Welcome to 3pay" })}>
            Sign in using Metamask
          </button>
          <button
            onClick={() => authWalletConnect()}>
            Sign in using Wallet Connect
          </button>
        </div>:
        <div>
          <LogoutButton />
          <p>user id is: {user.id}</p>
          <button onClick={() => console.log(user)}>log user data</button>
        </div>
        }

        <Example />
        {/* <button type="button" onClick={toggleTheme}></button>
        <button type="button" onClick={setTheme("red")}></button> */}
      </div>
    </ThemeProvider>
  );
};

export default App;
