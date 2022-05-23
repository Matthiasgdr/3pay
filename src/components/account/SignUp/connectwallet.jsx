import React from 'react'
import { Title, Box, Button } from '@mantine/core';
import SignUpButton from '../../WalletLinking/signup';
import PropTypes from "prop-types";

const ConnectWallet = ({ onValidate }) => {
  return (
    <>
      <Title 
        order={1}
        align="center"
        sx={{ marginBottom: "40px" }}
      >
        Connecter mon wallet
      </Title>
      <SignUpButton />
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Button variant="subtle" onClick={() => onValidate("ending")}>Passer</Button>
      </Box>
    </>
  )
}

ConnectWallet.propTypes = {
  onValidate: PropTypes.any
};

export default ConnectWallet