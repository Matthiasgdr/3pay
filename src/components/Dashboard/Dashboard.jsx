import React from "react";
import { Box, Title, Text, Loader } from "@mantine/core";
import useBankAccount from "../../hooks/useBankAccount";
import LineCharts from "../LineCharts/";
import NativeBalance from "../NativeBalance";
import InchDex from "../Transfer/Transfer";
import useGetBalance from "../../hooks/useGetBalance";

const Dashboard = () => {
  const { response, loading, error } = useBankAccount();
  const balanceWallet = useGetBalance();

  const balanceBank =
    response?.balances?.balances && response.balances.balances[0]
      ? response.balances.balances[0].balanceAmount
      : null;

  return (
    <Box>
      <Title order={3} sx={(theme) => ({ marginBottom: theme.spacing.xs })}>
        Soldes
      </Title>
      {loading ? (
        <Loader size="sm" />
      ) : (
        <>
          {balanceBank && (
            <Box>
              <Text>Compte bancaire :</Text>
              <Text
                sx={(theme) => ({
                  ...theme.headings,
                  ...theme.headings.sizes.h1,
                  color: theme.colors.blue[8],
                })}
              >{`${balanceBank.amount} ${balanceBank.currency}`}</Text>
            </Box>
          )}
          {error && <Text>{error}</Text>}
        </>
      )}
      <Box sx={(theme) => ({ marginBottom: theme.spacing.lg })}>
        <Title order={3} sx={(theme) => ({ marginBottom: theme.spacing.xs })}>
          Solde du Wallet
        </Title>
        {balanceBank ? (
          <Box>
            <Text
              sx={(theme) => ({
                ...theme.headings,
                ...theme.headings.sizes.h1,
                color: theme.colors.blue[8],
              })}
            >{`${balanceWallet} ${balanceBank.currency}`}</Text>
          </Box>
        ) : (
          <Loader size="sm" />
        )}
      </Box>
      <LineCharts />
      <InchDex chain="eth" />
    </Box>
  );
};

export default Dashboard;
