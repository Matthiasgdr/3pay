import React from 'react'
import useWalletTransactions from "../hooks/useWalletTransactions";
import { useMoralis } from "react-moralis";
import { Box, Title } from "@mantine/core";

const Transactions = () => {
  const { Moralis } = useMoralis();
  const currentUserAddress = Moralis.User.current().attributes.accounts;
  
  const transactions = useWalletTransactions(currentUserAddress && currentUserAddress[0]);

  return (
    <Box>
      <Title order={1}
        align="center"
        sx={{ marginBottom: "40px" }}
      >
        Historique de transactions
      </Title>
      {transactions?.map((transaction) => (
        <p key={transaction.id}>
          {transaction.attributes.decimal.value.$numberDecimal} ETH
        </p>
      ))}
    </Box>
  )
}

export default Transactions