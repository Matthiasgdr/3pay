import React, { useState } from "react";
import PropTypes from "prop-types";
import useBankTransactions from "../../hooks/useBankTransactions";
import { transformBankToDefault } from "./utils/transformBankToDefault";
import cryptoToEuro from "./utils/cryptoToEuro"
import { Table, createStyles, Text, Button, Loader, Box } from "@mantine/core";
import formatWalletTransactions from "./utils/formatWalletTransactions";
import { useUser } from "../../hooks/useUser";
import useWalletTransactions from "../../hooks/useWalletTransactions";

const useStyles = createStyles((theme) => ({
  nameTable: {
    color: theme.colors.blue[3],
    fontSize: theme.fontSizes.body,
    fontWeight: 700,
    textTransform: 'uppercase'
  },
  headTable: {
    position: 'sticky',
    insetBlockStart: 60,
    background: theme.colors.background.primary
  }
}));

const Transactions = () => {
  const { classes } = useStyles();
  const { user } = useUser();
  const euro = cryptoToEuro('ETH');
  const [transactionHistoric, setTransactionHistoric] = useState(null)

  const currentUserAddress = user.attributes.accounts;
  const cryptoTransactions = useWalletTransactions(
    currentUserAddress && currentUserAddress[0]
  );
  const formatedWalletTransactions = formatWalletTransactions(cryptoTransactions, euro)
  const { response, loading } = useBankTransactions();
  const defaultTransactions = transformBankToDefault(
    response?.transactions?.booked
  );
  const concatTransactions = formatedWalletTransactions.concat(defaultTransactions)
  return (
    <>
      <Button onClick={() => setTransactionHistoric(concatTransactions)}>Both Crypto and Bank</Button>
      <Button onClick={() => setTransactionHistoric(formatedWalletTransactions)}>Only Crypto</Button>
      <Button onClick={() => setTransactionHistoric(defaultTransactions)}>Only Bank</Button>
      <Table>
        <thead className={classes.headTable}>
          <tr>
            <th>Nom</th>
            <th>Prix</th>
            <th>Description</th>
            <th>Date</th>
          </tr>
        </thead>
        {!loading && (
          <tbody>
            {transactionHistoric === null ? transactionHistoric?.map((transaction, i) => (
              <tr key={i}>
                <td className={classes.nameTable}>{transaction.type}</td>
                <td>
                  {transaction.amount}€
                  <Text size="xs"  sx={(theme) => ({color: theme.colors.blue[3], display: 'inline-block', marginLeft: theme.spacing.sm})}>{transaction?.crypto}</Text>
                </td>
                <td>
                  {transaction?.description.map((l, y) => (
                    <p key={y}>{l}</p>
                  ))}
                </td>
                <td>{transaction.date}</td>
              </tr>
            )) : transactionHistoric?.map((transaction, i) => (
              <tr key={i}>
                <td className={classes.nameTable}>{transaction.type}</td>
                <td>
                  {transaction.amount}€
                  <Text size="xs"  sx={(theme) => ({color: theme.colors.blue[3], display: 'inline-block', marginLeft: theme.spacing.sm})}>{transaction?.crypto}</Text>
                </td>
                <td>
                  {transaction?.description.map((l, y) => (
                    <p key={y}>{l}</p>
                  ))}
                </td>
                <td>{transaction.date}</td>
              </tr>
            ))}
          </tbody>
        )}
      </Table>
      {loading && (
        <Box
          sx={(theme) => ({
            display: "flex",
            justifyContent: "center",
            marginTop: theme.spacing.md,
          })}
        >
          <Loader />
        </Box>
      )}
    </>
  );
};

Transactions.propTypes = {
  cryptoTransactions: PropTypes.array,
};

export default Transactions;
