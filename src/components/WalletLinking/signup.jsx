import React from "react";
import { useMoralis } from "react-moralis";
import { Button, Box } from '@mantine/core';

const SignUpButton = () => {
  const { authenticate, enableWeb3 } = useMoralis();

  async function authWalletConnect() {
    enableWeb3().then(() => {
      authenticate({
        provider: "walletconnect",
        chainId: 56,
      });
    })
  }

  return (
    <>
      <Box sx={{ display: "flex", justifyContent: "center", flexDirection: "column", marginBottom: "40px" }}>
        <Button sx={(theme) => ({ marginBottom: theme.spacing.sm })} variant="light" onClick={() => enableWeb3().then(() => { authenticate() })}>Sign in using Metamask</Button>
        <Button variant="light" onClick={() => authWalletConnect()}>
          Sign in using Wallet Connect
        </Button>
      </Box>
    </>
  );
};

export default SignUpButton;
