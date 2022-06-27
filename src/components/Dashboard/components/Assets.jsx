import React from "react";
import { Table, Box, Text, createStyles } from "@mantine/core";

import CryptoName from "../../../blocks/CryptoName/CryptoName";
import useCryptoFluctuations from "../../../hooks/useCryptoFluctuations";
import { mocks } from "./mocks";

const Assets = () => {
  const { classes } = useStyle();
  const arrayCryptoSymbols = mocks.map((m) => m.symbol).join(",");
  const fluctuations = useCryptoFluctuations(arrayCryptoSymbols);

  const getFluctuations = (symbol) => {
    return (
      fluctuations?.find((e) => e.id === symbol)["1d"]?.volume_change_pct ||
      null
    );
  };

  return (
    <Table verticalSpacing="md">
      <thead>
        <tr>
          <th>Nom</th>
          <th>Mon solde</th>
          <th>Prix</th>
        </tr>
      </thead>
      <tbody>
        {mocks.map((t) => {
          const fluctuation = getFluctuations(t.symbol);
          return (
            <tr key={t.symbol}>
              <td className={classes.td}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <CryptoName crypto={t} />
                  <Text
                    sx={(theme) => ({
                      margin: `0 ${theme.spacing.md}px`,
                      color:
                        fluctuation >= 0
                          ? theme.colors.green[5]
                          : theme.colors.red[5],
                    })}
                  >
                    {fluctuation} %
                  </Text>
                </Box>
              </td>
              <td className={classes.td}>
                <Box>
                  <Text color="blue" weight="500">
                    {t.sold} {t.symbol}
                  </Text>
                  <Text size="sm" color="gray">
                    ≈ {t.euro} €
                  </Text>
                </Box>
              </td>
              <td className={classes.td}>{t.price}</td>
            </tr>
          );
        })}
      </tbody>
    </Table>
  );
};

const useStyle = createStyles({
  td: {
    verticalAlign: "middle",
  },
});

Assets.propTypes = {};

export default Assets;
