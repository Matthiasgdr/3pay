import React from "react";
import { Box, Title, Text, Loader } from "@mantine/core";
import useBankAccount from "../../hooks/useBankAccount";
import LineCharts from "../LineCharts/";
import useWalletBalance from "../../hooks/useWalletBalance";
import InchDex from "../Transfer/Transfer";
import cryptoToEuro from "../Transactions/utils/cryptoToEuro";
import ListAssets from "../ListAssets/ListAssets";

import Assets from "./components/Assets";

const Dashboard = () => {
  const { response, loading, error } = useBankAccount();
  const {
    balance,
    error: errorWallet,
    loading: loadingWallet,
  } = useWalletBalance();
  const euro = cryptoToEuro("ETH");

  const balanceBank =
    response?.balances?.balances && response.balances.balances[0]
      ? response.balances.balances[0].balanceAmount
      : null;

  return (
    <Box>
      <Title order={3} sx={(theme) => ({ marginBottom: theme.spacing.xs })}>
        Soldes
      </Title>
      <Box
        sx={(theme) => ({ display: "flex", marginBottom: theme.spacing.lg })}
      >
        <Box>
          {loading ? (
            <Loader size="sm" />
          ) : (
            <>
              <Text>Compte bancaire :</Text>
              {balanceBank && (
                <>
                  <Text
                    sx={(theme) => ({
                      ...theme.headings,
                      ...theme.headings.sizes.h1,
                      color: theme.colors.blue[8],
                    })}
                  >{`${balanceBank?.amount} ${balanceBank?.currency}`}</Text>
                </>
              )}
              {error && <Text>{error}</Text>}
            </>
          )}
        </Box>
        <Box
          sx={(theme) => ({
            display: "flex",
            alignItems: "stretch",
            backgroundColor: theme.colors.blue[8],
            width: "1px",
            margin: `0 ${theme.spacing.lg}px`,
          })}
        />
        <Box>
          {loadingWallet ? (
            <Loader size="sm" />
          ) : (
            <>
              <Text>Wallet :</Text>
              {balance && (
                <>
                  <Text
                    sx={(theme) => ({
                      ...theme.headings,
                      ...theme.headings.sizes.h1,
                      color: theme.colors.blue[8],
                    })}
                  >{`${Number(Number(balance).toFixed(7) * euro).toFixed(5)} ${
                    balanceBank?.currency || "EUR"
                  }`}</Text>
                </>
              )}
              {errorWallet && <Text>{errorWallet}</Text>}
            </>
          )}
        </Box>
      </Box>
      <Assets></Assets>
      {/* <LineCharts /> */}
      <LineCharts />
      <ListAssets />
      <InchDex chain="eth" />
    </Box>
  );
};

export default Dashboard;
