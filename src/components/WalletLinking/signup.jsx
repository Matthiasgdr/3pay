import React from "react";
import { useMoralis } from "react-moralis";
import { useUser } from "../../hooks/useUser";
import LogoutButton from "./logout";

const SignUpButton = () => {
  const { authenticate, isWeb3Enabled, isAuthenticated, enableWeb3 } =
    useMoralis();
  const { user } = useUser();

  async function authWalletConnect() {
    const user = authenticate({
      provider: "walletconnect",
      chainId: 56,
    });
    console.log(user);
  }

  const handleEnableWeb3 = () => {
    if (!isWeb3Enabled && isAuthenticated) {
      enableWeb3();
    }
  };

  return (
    <div>
      <div>
        <button onClick={() => authenticate()}>Sign in using Metamask</button>
        <button onClick={() => authWalletConnect()}>
          Sign in using Wallet Connect
        </button>
      </div>
      <div>
        <p>user id is: {user.get("ethAddress")}</p>
        <button onClick={() => console.log(user)}>log user data</button>
        <button onClick={handleEnableWeb3}>enable web3</button>
        <LogoutButton />
      </div>
    </div>
  );
};

export default SignUpButton;
