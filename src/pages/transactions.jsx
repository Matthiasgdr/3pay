import React from "react";
import useWalletTransactions from "../hooks/useWalletTransactions";
import { Box, Title } from "@mantine/core";
import { useUser } from "../hooks/useUser";
import Transactions from "../components/Transactions";

const TransactionsPage = () => {
  const { user } = useUser();
  const currentUserAddress = user.attributes.accounts;

  const transactions = useWalletTransactions(
    currentUserAddress && currentUserAddress[0]
  );

  return (
    <Box>
      <Title order={1} align="center" sx={{ marginBottom: "40px" }}>
        Historique de transactions
      </Title>
      <Transactions cryptoTransactions={transactions} />
    </Box>
  );
};

export default TransactionsPage;
