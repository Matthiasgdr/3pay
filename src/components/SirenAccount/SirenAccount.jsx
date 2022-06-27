import React from 'react'
import { Box, Text } from "@mantine/core";
import { useMoralis } from "react-moralis";

const SirenAccount = () => {
  const { Moralis } = useMoralis();
  const user = Moralis.User.current();
  const { siren } = user.attributes;
  return (
    <Box sx={(theme) => ({ marginTop: theme.spacing.md })}>
      <Text sx={(theme) => ({ color: theme.colors.grey[7], marginBottom: theme.spacing.sm, fontWeight: 600 })}>Numéro de Siren</Text>
      <Text sx={(theme) => ({ padding: '12px 16px', border: '2px solid' + theme.colors.grey[2], maxWidth: 397 })}>{siren}</Text>
    </Box>
  )
}

export default SirenAccount