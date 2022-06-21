import React from "react";
import { Box, Title } from "@mantine/core";
import BankLinking from "../../BankLinking";

const Entreprise = () => {
  return (
    <Box>
      <Title order={2}>Lié mon compte en banque</Title>
      <BankLinking />
    </Box>
  );
};

export default Entreprise;
