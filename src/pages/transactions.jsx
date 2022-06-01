import React from "react";
import useWalletTransactions from "../hooks/useWalletTransactions";
import { Box, Title, Table } from "@mantine/core";
import { useUser } from "../hooks/useUser";

const Transactions = () => {
  console.log(
    "LOG ~ file: useBankTransaction.jsx ~ line 16 ~ listAccounts",
    process.env.BANK_PROXY_URL
  );
  const { user } = useUser();
  const currentUserAddress = user.attributes.accounts;
  function padTo2Digits(num) {
    return num.toString().padStart(2, "0");
  }

  function formatDate(date) {
    return [
      padTo2Digits(date.getDate()),
      padTo2Digits(date.getMonth() + 1),
      date.getFullYear(),
    ].join("/");
  }

  const transactions = useWalletTransactions(
    currentUserAddress && currentUserAddress[0]
  );
  return (
    <Box>
      <Title order={1} sx={(theme) => ({ marginBottom: theme.spacing.md })}>
        Historique de transactions
      </Title>
      <Table>
        <thead>
          <tr>
            <th>Nom</th>
            <th>Prix</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {transactions?.map((transaction) => (
            <tr key={transaction.id}>
              <td>{transaction.className}</td>
              <td>{transaction.attributes.decimal.value.$numberDecimal}</td>
              <td>{formatDate(transaction.attributes.createdAt)}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Box>
  );
};

export default Transactions;
