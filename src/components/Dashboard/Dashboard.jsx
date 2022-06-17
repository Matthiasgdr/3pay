import React from "react";
import { Box, Title, Text, Loader } from "@mantine/core";
import useBankAccount from "../../hooks/useBankAccount";
import LineCharts from "../LineCharts/"

const Dashboard = () => {
  const { response } = useBankAccount();

  const balance =
    response?.balances?.balances && response.balances.balances[0]
      ? response.balances.balances[0].balanceAmount
      : null;

  return (
    <Box>
      <Title order={3} sx={(theme) => ({ marginBottom: theme.spacing.xs })}>
        Solde du compte
      </Title>
      {balance ? (
        <Text
          sx={(theme) => ({
            ...theme.headings,
            ...theme.headings.sizes.h1,
            color: theme.colors.blue[8],
          })}
        >{`${balance.amount} ${balance.currency}`}</Text>
      ) : (
        <Loader size="sm" />
      )}
      <LineCharts />
    </Box>
  );
};

export default Dashboard;
