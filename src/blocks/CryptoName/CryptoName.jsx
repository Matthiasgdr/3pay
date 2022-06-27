import React from "react";
import PropTypes from "prop-types";
import { Box, Text } from "@mantine/core";

const CryptoName = ({ crypto }) => {
  return (
    <Box
      sx={(theme) => ({
        display: "flex",
        alignItems: "center",
      })}
    >
      <Box sx={(theme) => ({ marginRight: theme.spacing.md })}>
        {crypto.icon}
      </Box>
      <Box>
        <Text color="blue" weight="bold">
          {crypto.name}
        </Text>
        <Text
          sx={(theme) => ({
            color: theme.colors.grey[5],
          })}
          weight="500"
        >
          {crypto.symbol}
        </Text>
      </Box>
    </Box>
  );
};

CryptoName.propTypes = {
  crypto: PropTypes.object,
};

export default CryptoName;
