import React from "react";
import PropTypes from "prop-types";
import useBankTransaction from "../../hooks/useBankTransaction";
import { transformBankToDefault } from "./utils/transformBankToDefault";
import { Table, createStyles } from "@mantine/core";
import cryptoToEuro from "./utils/cryptoToEuro"
import formatWalletTransactions from "./utils/formatWalletTransactions";
import { useUser } from "../../hooks/useUser";
import useWalletTransactions from "../../hooks/useWalletTransactions";


const useStyles = createStyles((theme) => ({
  nameTable: {
    color: theme.colors.blue[3],
    fontSize: theme.fontSizes.body,
    fontWeight: 700
  }
}));

const Transactions = ({ cryptoTransactions }) => {
  const { classes } = useStyles();
  const { user } = useUser();
  const euro = cryptoToEuro('ETH');

  const currentUserAddress = user.attributes.accounts;
  const transactionstest = useWalletTransactions(
    currentUserAddress && currentUserAddress[0]
  );
  console.log(transactionstest)

  const transactions = cryptoTransactions;
  transactions;

  const formatedWalletTransactions = formatWalletTransactions(transactionstest, euro)

  console.log(formatedWalletTransactions)
  const { response, loading } = useBankTransaction();
  const defaultTransactions = transformBankToDefault(
    response?.transactions?.booked
  );

  console.log(defaultTransactions)

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
      {loading && <p>Loading...</p>}
    </>
  );
};

Transactions.propTypes = {
  cryptoTransactions: PropTypes.array,
};

export default Transactions;
