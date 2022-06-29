import React from "react";
import { Table, Box, Text, createStyles } from "@mantine/core";
import { ArrowWaveRightUp } from "tabler-icons-react";

import CryptoName from "../../../blocks/CryptoName/CryptoName";
import {
  useCryptoFluctuations,
  getFluctuations,
} from "../../../hooks/useCryptoFluctuations";
import cryptoToEuro from "../../Transactions/utils/cryptoToEuro";

import { mocks } from "./mocks";

const Assets = () => {
  const { classes } = useStyle();
  const arrayCryptoSymbols = mocks.map((m) => m.symbol).join(",");
  const fluctuations = useCryptoFluctuations(arrayCryptoSymbols);

  return (
    <Table verticalSpacing="md">
      <thead>
        <tr>
          <th>Nom</th>
          <th>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Text sx={{ marginRight: "6px" }}>1d</Text> <ArrowWaveRightUp />
            </Box>
          </th>
          <th>Mon solde</th>
          <th>Prix</th>
        </tr>
      </thead>
      <tbody>
        {mocks.map((t) => {
          const fluctuation = getFluctuations(t.symbol, fluctuations);
          const euro = cryptoToEuro(t.symbol);
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
                </Box>
              </td>
              <td className={classes.td}>
                <Text
                  sx={(theme) => ({
                    color:
                      fluctuation >= 0
                        ? theme.colors.green[5]
                        : theme.colors.red[5],
                  })}
                >
                  {fluctuation} %
                </Text>
              </td>
              <td className={classes.td}>
                <Box>
                  <Text color="blue" weight="500">
                    {t.sold} {t.symbol}
                  </Text>
                  <Text size="sm" color="gray">
                    ≈ {(t.sold * euro).toFixed(2)} €
                  </Text>
                </Box>
              </td>
              <td className={classes.td}>{euro} €</td>
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
