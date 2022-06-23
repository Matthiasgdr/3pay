import React from "react";
import { Box, Title } from "@mantine/core";
import SignUpButton from "../../WalletLinking/signup";

const Entreprise = () => {
  return (
    <Box>
      <Title order={2}>Connexion à mon wallet de crypto-monnaies</Title>
      <SignUpButton />
    </Box>
  );
};

export default Entreprise;
