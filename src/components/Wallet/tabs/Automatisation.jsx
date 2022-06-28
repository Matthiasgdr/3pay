import React, { useState } from "react";
import { Box, NumberInput, Text, Title } from "@mantine/core";

const Automatisation = () => {
  const [percent, setPercent] = useState(100);
  return (
    <Box>
      <Title order={2}>Transaction automatisé</Title>
      <Text>
        Pour chaque transaction, vous pouvez choisir de transferer une partie ou
        la totalité du montant en stable coin afin de ne pas être affécté par la
        fluctuation de la crypto-monnaie reçu
      </Text>
      <Box
        sx={(theme) => ({
          display: "flex",
          alignItems: "center",
          marginTop: theme.spacing.md,
        })}
      >
        <NumberInput
          min={0}
          max={100}
          label="Pourcentage de transfert"
          value={percent}
          onChange={setPercent}
        ></NumberInput>
      </Box>
    </Box>
  );
};

export default Automatisation;
