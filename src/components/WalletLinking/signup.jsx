import React, { useEffect } from 'react'
import { useMoralis } from "react-moralis";

const SignUpButton = () => {
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

    useEffect(() => {
      if (!isWeb3Enabled && isAuthenticated) {
        enableWeb3();
      }
    }, [isWeb3Enabled, isAuthenticated, enableWeb3]);  
  
    return (
      <div>
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
            <p>user id is: {user.get("ethAddress")}</p>
            <button onClick={() => console.log(user)}>log user data</button>
          </div>
        )}
      </div>
    );
}

export { SignUpButton }
