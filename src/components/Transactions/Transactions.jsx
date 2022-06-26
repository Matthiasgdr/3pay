import React, { useState, useMemo } from "react";
import PropTypes from "prop-types";
import {
  Table,
  createStyles,
  Text,
  Loader,
  Box,
  Select,
  Image,
} from "@mantine/core";
import { ArrowNarrowUp, ArrowNarrowDown } from "tabler-icons-react";

import useBankTransactions from "../../hooks/useBankTransactions";
import { useUser } from "../../hooks/useUser";
import useWalletTransactions from "../../hooks/useWalletTransactions";

import { transformBankToDefault } from "./utils/transformBankToDefault";
import getCurrencyIcon from "./utils/getCurrencyIcon";
import cryptoToEuro from "./utils/cryptoToEuro";
import formatWalletTransactions from "./utils/formatWalletTransactions";
import filter from "./utils/filter";
import formatDate from "./utils/dateFormat";

const useStyles = createStyles((theme) => ({
  nameTable: {
    height: "70px",
    color: theme.colors.blue[3],
    fontSize: theme.fontSizes.body,
    fontWeight: 700,
    textTransform: "uppercase",
  },
  headTable: {
    position: "sticky",
    insetBlockStart: 60,
    zIndex: 2,
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
      ).sort((a, b) => {
        return b.date - a.date;
      }),
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
                <td className={classes.nameTable}>
                  <Box sx={{ display: "flex" }}>
                    <Image
                      sx={(theme) => ({
                        marginRight: theme.spacing.sm,
                      })}
                      radius="md"
                      width="24px"
                      height="24px"
                      src={getCurrencyIcon[transaction.currency]}
                    />
                    {transaction.currency}
                  </Box>
                </td>
                <td>
                  <Box sx={{ display: "flex" }}>
                    <Box sx={(theme) => ({ marginRight: theme.spacing.sm })}>
                      {transaction.amount > 0 ? (
                        <ArrowNarrowUp color="green" />
                      ) : (
                        <ArrowNarrowDown color="red" />
                      )}
                    </Box>
                    <Box>
                      <Text>
                        {transaction.amount} {transaction.currency}
                      </Text>
                      {transaction.euro && (
                        <Text
                          size="xs"
                          sx={(theme) => ({
                            color: theme.colors.blue[3],
                            display: "inline-block",
                          })}
                        >
                          ≈ {transaction.euro}€
                        </Text>
                      )}
                    </Box>
                  </Box>
                </td>
                <td>
                  {transaction?.description.map((l, y) => (
                    <p key={y}>{l}</p>
                  ))}
                </td>
                <td>{formatDate(transaction.date)}</td>
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
