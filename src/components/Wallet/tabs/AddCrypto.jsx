import React from "react";
import { Box, Title } from "@mantine/core";

import ListAssets from "../../ListAssets/ListAssets";

const AddCrypto = () => {
  return (
    <Box>
      <Title sx={(theme) => ({ marginBottom: theme.spacing.md })} order={3}>
        Ajouter une crypto-monnaie a votre wallet
      </Title>
      <ListAssets />
    </Box>
  );
};

export default AddCrypto;
