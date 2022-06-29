import React from "react";
import { Box, Text, Title } from "@mantine/core";
import { useMoralis } from "react-moralis";

const SirenAccount = () => {
  const { Moralis } = useMoralis();
  const user = Moralis.User.current();
  const { siren } = user.attributes;
  return (
    <Box sx={(theme) => ({ marginTop: theme.spacing.lg })}>
      <Title
        order={2}
        sx={(theme) => ({
          marginBottom: theme.spacing.sm,
        })}
      >
        Numéro de Siren
      </Title>
      <Text
        sx={(theme) => ({
          padding: "12px 16px",
          border: "2px solid" + theme.colors.grey[2],
          maxWidth: 400,
        })}
      >
        {siren}
      </Text>
    </Box>
  );
};

export default SirenAccount;
