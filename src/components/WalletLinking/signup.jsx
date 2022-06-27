import React from "react";
import { useMoralis, useChain } from "react-moralis";
import { Button, Box, Text } from "@mantine/core";
import PropTypes from "prop-types";

const SignUpButton = ({ onConnect = () => {} }) => {
  const { authenticate, isAuthenticated, enableWeb3, Moralis } = useMoralis();
  const { account } = useChain();

  async function authWalletConnect() {
    enableWeb3().then(() => {
      authenticate({
        provider: "walletconnect",
        chainId: 56,
      });
    });
  }

  async function connectMetaMask() {
    const web3 = await enableWeb3();
    const currentAccount = web3.provider.selectedAddress;
    try {
      await Moralis.link(currentAccount, {
        signingMessage: `Connectez-vous à Leepay!`,
      }).then(() => {
        onConnect("ending");
      });
    } catch (err) {
      alert(err);
    }
  }

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        marginBottom: "40px",
      }}
    >
      {!isAuthenticated ? (
        <>
          <Button
            sx={(theme) => ({ marginBottom: theme.spacing.sm })}
            variant="light"
            onClick={connectMetaMask}
          >
            Connecter mon wallet avec Metamask
          </Button>
          <Button variant="light" disabled onClick={() => authWalletConnect()}>
            Sign in using Wallet Connect
          </Button>
        </>
      ) : (
        <Text sx={(theme) => ({ border: '2px solid '+ theme.colors.grey[2], borderRadius: '5px', padding: '30px 32px', color: theme.colors.grey[7], fontSize: theme.fontSizes.small })}>{account}</Text>
      )}
    </Box>
  );
};

SignUpButton.propTypes = {
  onConnect: PropTypes.func,
};

export default SignUpButton;
