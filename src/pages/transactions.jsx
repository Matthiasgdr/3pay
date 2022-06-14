import React from "react";
import { Box, Title } from "@mantine/core";
import Transactions from "../components/Transactions";

const TransactionsPage = () => {
  return (
    <Box>
      <Title order={1} sx={{ marginBottom: "40px" }}>
        Historique de transactions
      </Title>
      <Transactions />
    </Box>
  );
};

export default TransactionsPage;
