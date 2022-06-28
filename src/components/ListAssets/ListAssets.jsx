import React from "react";
import { Table, createStyles, Text, Box, Button } from "@mantine/core";
import { useMoralis } from "react-moralis";

import CryptoName from "../../blocks/CryptoName";
import {
  useCryptoFluctuations,
  getFluctuations,
} from "../../hooks/useCryptoFluctuations";
import cryptoToEuro from "../Transactions/utils/cryptoToEuro";
import { arrayAssets } from "./mocks";

const useStyles = createStyles((theme) => ({
  td: {
    verticalAlign: "middle",
  },
  buttonsAdd: {
    display: "flex",
    justifyContent: "flex-end",
  },
}));

const ListAssets = () => {
  const { Moralis } = useMoralis();
  const { classes } = useStyles();

  const arrayCryptoSymbols = arrayAssets.map((m) => m.symbol).join(",");
  const fluctuations = useCryptoFluctuations(arrayCryptoSymbols);

  const handleAddNetwork = async (chain) => {
    await Moralis.addNetwork(
      chain.chainId,
      chain.chainName,
      chain.currencyName,
      chain.currencySymbol,
      chain.rpcUrl,
      chain.blockExplorerUrl
    );
  };

  return (
    <Box>
      <Table verticalSpacing="md">
        <thead>
          <tr>
            <th>Nom</th>
            <th>Prix</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {arrayAssets.map((chain) => {
            const fluctuation = getFluctuations(chain.symbol, fluctuations);
            const euro = cryptoToEuro(chain.symbol);
            return (
              <tr key={chain.name}>
                <td className={classes.td}>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <CryptoName crypto={chain} />
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
                  <Text
                    size="xs"
                    sx={(theme) => ({
                      color: theme.colors.blue[3],
                      display: "inline-block",
                    })}
                  >
                    {euro + "€"}
                  </Text>
                </td>
                <td className={classes.td}>
                  <Box className={classes.buttonsAdd}>
                    <Button
                      onClick={() => handleAddNetwork(chain.chain)}
                      sx={{
                        height: "32px",
                        padding: "0px 24px",
                        marginLeft: "32px",
                      }}
                    >
                      + Ajouter
                    </Button>
                    <Button
                      variant="light"
                      onClick={() => console.log("fav")}
                      sx={{
                        height: "32px",
                        padding: "0px 24px",
                        marginLeft: "32px",
                      }}
                    >
                      ♡
                    </Button>
                  </Box>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </Box>
  );
};

export default ListAssets;
