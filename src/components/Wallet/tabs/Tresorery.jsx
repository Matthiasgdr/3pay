import React from "react";
import { Box, Title } from "@mantine/core";
import Assets from "../../Dashboard/components/Assets";

const Tresorery = () => {
  return (
    <Box>
      <Title sx={(theme) => ({ marginBottom: theme.spacing.md })} order={3}>
        Ma trésorerie
      </Title>
      <Assets />
    </Box>
  );
};

export default Tresorery;
