import React, { useEffect } from 'react'
import { useMoralis, useMoralisQuery } from "react-moralis";
import { useUserAddress } from "../context"

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
      enableWeb3
    } = useMoralis();
    const { userAddress } = useUserAddress()

    const { fetch } = useMoralisQuery(
      "EthTransactions",
      (query) => query.equalTo("to_address", userAddress),
      [],
      { autoFetch: false }
    );

    const basicQuery = async () => {
      const results = await fetch();
      console.log(results);
    };
  
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
      basicQuery();
    }, [isWeb3Enabled, isAuthenticated, enableWeb3, userAddress]);  
  
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
            <button onClick={() => console.log(user.getACL())}>log user data</button>
            <button onClick={() => basicQuery()}>
              get transactions
            </button>
          </div>
        )}
      </div>
    );
}
  
export { LogoutButton, WalletLinking }