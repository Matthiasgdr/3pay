import React, { useEffect } from 'react'
import { useMoralis } from "react-moralis";

const LogoutButton = () => {
    const { logout, isAuthenticating } = useMoralis();
  
    return (
      <button
        onClick={() => logout()}
        disabled={isAuthenticating}>
        Logout
      </button>
    );
};

const WalletLinking = () => {
    const {
      authenticate,
      isWeb3Enabled,
      isAuthenticated,
      user,
      enableWeb3,
      Moralis,
    } = useMoralis();

    async function getEntranceTransactions() {
      const query = new Moralis.Query("EthTransactions");
      const result = query.equalTo("to_address", user.get("ethAddress"));
  
      console.log(result);
    }
  
    async function authWalletConnect() {
      const user = authenticate({
        provider: "walletconnect",
        chainId: 56,
      });
      console.log(user);
    }

    useEffect(() => {
      if (!isWeb3Enabled && isAuthenticated) {
        enableWeb3();
      }
    }, [isWeb3Enabled, isAuthenticated, enableWeb3]);  
  
    return (
      <div>
        {!isAuthenticated && !user ? (
          <h1>Wallet authentication</h1>
        ) : (
          <h1>Wallet Logged in</h1>
        )}

        {!isAuthenticated && !user ? (
          <div>
            <button onClick={() => authenticate()}>
              Sign in using Metamask
            </button>
            <button onClick={() => authWalletConnect()}>
              Sign in using Wallet Connect
            </button>
          </div>
        ) : (
          <div>
            <LogoutButton />
            <p>user id is: {user.get("ethAddress")}</p>
            <button onClick={() => console.log(user)}>log user data</button>
            <button onClick={() => getEntranceTransactions()}>
              get transactions
            </button>
          </div>
        )}
      </div>
    );
}
  
export { LogoutButton, WalletLinking }