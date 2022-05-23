import React from 'react'
import { Title, Box, Text, Button } from '@mantine/core';
import SignUpButton from '../../WalletLinking/signup';
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

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
      <Text>Pas encore de wallet ?  <Link to="create-wallet">Me créer un wallet</Link></Text>
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