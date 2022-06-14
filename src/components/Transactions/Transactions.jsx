import React from "react";
import PropTypes from "prop-types";
import useBankTransactions from "../../hooks/useBankTransactions";
import { transformBankToDefault } from "./utils/transformBankToDefault";
import { Table, Loader, Box, createStyles } from "@mantine/core";
import cryptoToEuro from "./utils/cryptoToEuro";
import formatWalletTransactions from "./utils/formatWalletTransactions";

const useStyles = createStyles((theme) => ({
  nameTable: {
    color: theme.colors.blue[3],
    fontSize: theme.fontSizes.body,
    fontWeight: 700,
  },
}));

const Transactions = ({ cryptoTransactions }) => {
  const { classes } = useStyles();
  const euro = cryptoToEuro("ETH");
  const transactions = cryptoTransactions;
  transactions;

  const formatedWalletTransactions = formatWalletTransactions(
    transactions,
    euro
  );

  const { response, loading } = useBankTransactions();
  const defaultTransactions = transformBankToDefault(
    response?.transactions?.booked
  );

  return (
    <>
      <Table>
        <thead>
          <tr>
            <th>Nom</th>
            <th>Prix</th>
            <th>Description</th>
            <th>Date</th>
          </tr>
        </thead>
        {!loading && (
          <tbody>
            {defaultTransactions?.map((transaction, i) => (
              <tr key={i}>
                <td className={classes.nameTable}>{transaction.type}</td>
                <td>{transaction.amount}</td>
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
