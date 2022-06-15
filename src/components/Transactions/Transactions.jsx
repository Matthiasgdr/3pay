import React, { useState, useEffect, useMemo } from "react";
import PropTypes from "prop-types";
import { Table, createStyles, Text, Loader, Box, Select } from "@mantine/core";

import useBankTransactions from "../../hooks/useBankTransactions";
import { useUser } from "../../hooks/useUser";
import useWalletTransactions from "../../hooks/useWalletTransactions";

import { transformBankToDefault } from "./utils/transformBankToDefault";
import cryptoToEuro from "./utils/cryptoToEuro";
import formatWalletTransactions from "./utils/formatWalletTransactions";
import filter from "./utils/filter";

const useStyles = createStyles((theme) => ({
  nameTable: {
    color: theme.colors.blue[3],
    fontSize: theme.fontSizes.body,
    fontWeight: 700,
    textTransform: "uppercase",
  },
  headTable: {
    position: "sticky",
    insetBlockStart: 60,
    background: theme.colors.background.primary,
  },
}));

const selectData = [
  { value: null, label: "Tout" },
  { value: "crypto", label: "Crypto-monnaie" },
  { value: "bank", label: "Banque" },
];

const Transactions = () => {
  const { classes } = useStyles();
  const { user } = useUser();

  const [filterKeys, setFilter] = useState({ type: null });

  const euro = cryptoToEuro("ETH");
  const currentUserAddress = user.attributes.accounts;
  const { response, loading } = useBankTransactions();

  const cryptoTransactions = useWalletTransactions(
    currentUserAddress && currentUserAddress[0]
  );

  const formattedWalletTransactions = formatWalletTransactions(
    cryptoTransactions,
    euro
  );

  const defaultTransactions = transformBankToDefault(
    response?.transactions?.booked || []
  );

  const concatTransactions = useMemo(
    () =>
      filter(
        [...defaultTransactions, ...formattedWalletTransactions],
        filterKeys
      ),
    [defaultTransactions, formattedWalletTransactions]
  );

  return (
    <>
      <Box
        sx={(theme) => ({ display: "flex", marginBottom: theme.spacing.md })}
      >
        <Select
          data={selectData}
          value={filter.type}
          onChange={(v) => setFilter((prev) => ({ ...prev, type: v }))}
        />
      </Box>
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
            {concatTransactions?.map((transaction, i) => (
              <tr key={i}>
                <td className={classes.nameTable}>{transaction.currency}</td>
                <td>
                  {transaction.amount}€
                  <Text
                    size="xs"
                    sx={(theme) => ({
                      color: theme.colors.blue[3],
                      display: "inline-block",
                      marginLeft: theme.spacing.sm,
                    })}
                  >
                    {transaction?.crypto}
                  </Text>
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
