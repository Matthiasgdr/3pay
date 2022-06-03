import React from 'react'
import useWalletTransactions from "../hooks/useWalletTransactions";
import { Box, Title, Table, createStyles } from "@mantine/core";
import { useUser } from "../hooks/useUser";
import cryptoToEuro from "../utils/cryptoToEuro";

const useStyles = createStyles((theme) => ({
  nameTable: {
    color: theme.colors.blue[3],
    fontSize: theme.fontSizes.body,
    fontWeight: 700
  }
}));

const Transactions = () => {
  const { classes } = useStyles();
  const { user } = useUser()
  const currentUserAddress = user.attributes.accounts;
  const padTo2Digits = (num) => {
    return num.toString().padStart(2, '0');
  }

  const formatDate = (date) => {
    return [
      padTo2Digits(date.getDate()),
      padTo2Digits(date.getMonth() + 1),
      date.getFullYear(),
    ].join('/');
  }
  
  const transactions = useWalletTransactions(currentUserAddress && currentUserAddress[0]);
  const euro = cryptoToEuro('ETH')
  return (
    <Box>
      <Title order={1}
        align="center"
        sx={{ marginBottom: "40px" }}
      >
        Historique de transactions
      </Title>
      <Table>
        <thead>
          <tr>
            <th>Nom</th>
            <th>Prix</th>
            <th></th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {transactions?.map((transaction) => (
            <tr key={transaction.id}>
              <td className={classes.nameTable}>{transaction.className}</td>
              <td>{Number(transaction.attributes.decimal.value.$numberDecimal).toFixed(4)} {Number(Number(transaction.attributes.decimal.value.$numberDecimal).toFixed(5) * euro).toFixed(2)} €</td>
              <td>{formatDate(transaction.attributes.createdAt)}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Box>
  )
}

export default Transactions