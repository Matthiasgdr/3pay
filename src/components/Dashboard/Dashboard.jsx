import React from "react";
import { Box, Title, Text, Loader } from "@mantine/core";
import useBankAccount from "../../hooks/useBankAccount";
import LineCharts from "../LineCharts/"
import NativeBalance from "../NativeBalance";
import InchDex from "../Transfer/Transfer";

const Dashboard = () => {
  const { response } = useBankAccount();

  const balanceBank =
    response?.balances?.balances && response.balances.balances[0]
      ? response.balances.balances[0].balanceAmount
      : null;

  return (
    <Box>
      <Title order={3} sx={(theme) => ({ marginBottom: theme.spacing.xs })}>
        Solde du compte Banque
      </Title>
      {balanceBank ? (
        <Box>
          <Text
            sx={(theme) => ({
              ...theme.headings,
              ...theme.headings.sizes.h1,
              color: theme.colors.blue[8],
            })}
          >{`${balanceBank.amount} ${balanceBank.currency}`}</Text>
        </Box>
      ) : (
        <Loader size="sm" />
      )}
      <LineCharts />
      <NativeBalance />
      <InchDex chain="eth" />
    </Box>
  );
};

export default Dashboard;
