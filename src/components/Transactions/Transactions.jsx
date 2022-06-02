import React from "react";
import PropTypes from "prop-types";
import useBankTransaction from "../../hooks/useBankTransaction";
import { transformBankToDefault } from "./utils/transformBankToDefault";
import { Table } from "@mantine/core";

const Transactions = ({ cryptoTransactions }) => {
  const transactions = cryptoTransactions;
  transactions;

  const { response, loading } = useBankTransaction();
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
                <td>{transaction.type}</td>
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
