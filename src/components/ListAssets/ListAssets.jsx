import React, { useEffect } from "react";
import { Table, createStyles, Text, Box, Button } from "@mantine/core";
import { useMoralis, useChain } from "react-moralis";
import { ArrowWaveRightUp } from "tabler-icons-react";

import CryptoName from "../../blocks/CryptoName";
import {
  useCryptoFluctuations,
  getFluctuations,
} from "../../hooks/useCryptoFluctuations";
import cryptoToEuro from "../Transactions/utils/cryptoToEuro";
import { arrayAssets } from "./mocks";

const useStyles = createStyles(() => ({
  td: {
    verticalAlign: "middle",
  },
  buttonsAdd: {
    display: "flex",
    justifyContent: "flex-end",
  },
}));

const ListAssets = () => {
  const { Moralis, isWeb3Enabled, enableWeb3 } = useMoralis();
  const { chainId } = useChain();
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

  useEffect(() => {
    if (!isWeb3Enabled) {
      enableWeb3();
    }
  }, [isWeb3Enabled]);

  return (
    <Box>
      <Table verticalSpacing="md">
        <thead>
          <tr>
            <th>Nom</th>
            <th>
              {" "}
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Text sx={{ marginRight: "6px" }}>1d</Text> <ArrowWaveRightUp />
              </Box>
            </th>
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
                  <Text
                    size="sm"
                    sx={(theme) => ({
                      color: theme.colors.blue[3],
                      display: "inline-block",
                    })}
                  >
                    {euro + "???"}
                  </Text>
                </td>
                <td className={classes.td}>
                  <Box className={classes.buttonsAdd}>
                    {"0x" + chain.chain.chainId == chainId ? (
                      <Text
                        sx={(theme) => ({
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          height: "32px",
                          width: "110px",
                          padding: "auto",
                          marginLeft: "32px",
                          background: theme.colors.green[1],
                          color: theme.colors.grey[0],
                          fontSize: theme.fontSizes.small,
                        })}
                      >
                        Ajout??
                      </Text>
                    ) : (
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
                    )}
                    <Button
                      variant="light"
                      onClick={() => console.log("fav")}
                      sx={{
                        height: "32px",
                        padding: "0px 24px",
                        marginLeft: "32px",
                      }}
                    >
                      ???
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
