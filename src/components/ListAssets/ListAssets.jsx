import React, { useEffect } from 'react'
import { AvaxLogo } from "./Logo";
import {
  Table,
  createStyles,
  Text,
  Box,
  Button
} from "@mantine/core";
import { useMoralis } from 'react-moralis';
import cryptoToEuro from "../Transactions/utils/cryptoToEuro";

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
    background: theme.colors.background.primary,
  },
}));

const ListAssets = () => {
  const { Moralis, isWeb3Enabled, enableWeb3, web3 } = useMoralis()
  const { classes } = useStyles()
  const avaxEuro = cryptoToEuro("ETH");

  console.log(avaxEuro)
  useEffect(() => {
    if (!isWeb3Enabled) {
      enableWeb3();
    }
  }, [enableWeb3, isWeb3Enabled]);

  const addAvax = async (
    chainId,
    chainName,
    currencyName,
    currencySymbol,
    rpcUrl,
    blockExplorerUrl
  ) => {
    await Moralis.addNetwork(
      chainId,
      chainName,
      currencyName,
      currencySymbol,
      rpcUrl,
      blockExplorerUrl
    );
  }

  return (
    <Box>
      <Text>Ma trésorerie</Text>
      <Table>
        <thead className={classes.headTable}>
          <tr>
            <th>Nom</th>
            <th>Prix</th>
          </tr>
        </thead>
          <tbody>
              <tr>
                <td className={classes.nameTable}>
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <AvaxLogo />
                    <Box sx={{ display: "flex", flexDirection: "column", marginLeft: "24px" }}>
                      <Text
                        size="xs"
                        sx={(theme) => ({
                          color: theme.colors.blue[7],
                          display: "inline-block",
                        })}
                      >
                        Avalanche
                      </Text>
                      <Text
                        size="xs"
                        sx={(theme) => ({
                          color: theme.colors.grey[5],
                          display: "inline-block",
                        })}
                      >
                        AVAX
                      </Text>
                    </Box>
                  </Box>
                </td>
                <td>
                  <Text
                    size="xs"
                    sx={(theme) => ({
                      color: theme.colors.blue[3],
                      display: "inline-block",
                    })}
                  >
                    {avaxEuro}€
                  </Text>
                  <Button
                    variant='light'
                    onClick={
                      () => addAvax(
                        43114,
                        "Avalanche Mainnet",
                        "AVAX",
                        "AVAX",
                        "https://api.avax.network/ext/bc/C/rpc",
                        "https://cchain.explorer.avax.network/"
                      )
                    }
                    sx={{
                      height: "32px", padding: "0px 24px", marginLeft: "32px"
                    }}
                  >
                    Ajouter cette Chain
                  </Button>
                </td>
              </tr>
          </tbody>
      </Table>
    </Box>
  )
}

export default ListAssets