import React, { useEffect } from 'react'
import { AvaxLogo, BSCLogo, PolygonLogo } from "./Logo";
import {
  Table,
  createStyles,
  Text,
  Box,
  Button
} from "@mantine/core";
import { useMoralis } from 'react-moralis';
import cryptoToEuro from "../Transactions/utils/cryptoToEuro";
import useCryptoFluctuations from '../../hooks/useCryptoFluctuations';

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
  const { Moralis, isWeb3Enabled, enableWeb3 } = useMoralis()
  const { classes } = useStyles()
  const avaxEuro = cryptoToEuro("AVAX");
  const bnbEuro = cryptoToEuro("BNB");
  const polygonEuro = cryptoToEuro("MATIC");
  const avaxFluctuations = useCryptoFluctuations("AVAX")

  const arrayAssets = [
    {
      logo: <AvaxLogo />,
      name: "Avalanche",
      symbol: "AVAX",
      value: avaxEuro,
      fluctuations: avaxFluctuations,
      chain: {
        chainId: 43114,
        chainName: "Avalanche Mainnet",
        currencyName: "AVAX",
        currencySymbol: "AVAX",
        rpcUrl: "https://api.avax.network/ext/bc/C/rpc",
        blockExplorerUrl: "https://cchain.explorer.avax.network/"
      }
    },
    {
      logo: <BSCLogo />,
      name: "Binance",
      symbol: "BNB",
      value: bnbEuro,
      chain: {
        chainId: 56,
        chainName: "Binance Smart Chain",
        currencyName: "BNB",
        currencySymbol: "BNB",
        rpcUrl: "https://bsc-dataseed.binance.org/",
        blockExplorerUrl: "https://bscscan.com"
      }
    },
    {
      logo: <PolygonLogo />,
      name: "Polygon",
      symbol: "MATIC",
      value: polygonEuro,
      chain: {
        chainId: 137,
        chainName: "Polygon Mainnet",
        currencyName: "MATIC",
        currencySymbol: "MATIC",
        rpcUrl: "https://polygon-rpc.com",
        blockExplorerUrl: "https://explorer-mainnet.maticvigil.com"
      }
    },
  ]

  useEffect(() => {
    if (!isWeb3Enabled) {
      enableWeb3();
    }
  }, [isWeb3Enabled]);

  return (
    <Box>
      <Text>Ma trésorerie</Text>
      <Table>
        <thead className={classes.headTable}>
          <tr>
            <th>Nom</th>
            <th></th>
            <th>Prix</th>
            <th></th>
          </tr>
        </thead>
          <tbody>
              {arrayAssets.map(chain => (
                <tr key={chain.name}>
                  <td className={classes.nameTable}>
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      {chain.logo}
                      <Box sx={{ display: "flex", flexDirection: "column", marginLeft: "24px" }}>
                        <Text
                          size="xs"
                          sx={(theme) => ({
                            color: theme.colors.blue[7],
                            display: "inline-block",
                          })}
                        >
                          {chain.name}
                        </Text>
                        <Text
                          size="xs"
                          sx={(theme) => ({
                            color: theme.colors.grey[5],
                            display: "inline-block",
                          })}
                        >
                          {chain.symbol}
                        </Text>
                      </Box>
                    </Box>
                  </td>
                  <td>
                    +20%
                  </td>
                  <td>
                    <Text
                      size="xs"
                      sx={(theme) => ({
                        color: theme.colors.blue[3],
                        display: "inline-block",
                      })}
                    >
                      {chain.value}€
                    </Text>
                  </td>
                  <td>
                    <Button
                      onClick={
                        async () => await Moralis.addNetwork(
                          chain.chain.chainId,
                          chain.chain.chainName,
                          chain.chain.currencyName,
                          chain.chain.currencySymbol,
                          chain.chain.rpcUrl,
                          chain.chain.blockExplorerUrl
                        )
                      }
                      sx={{
                        height: "32px", padding: "0px 24px", marginLeft: "32px"
                      }}
                    >
                      + Ajouter
                    </Button>
                    <Button
                      variant='light'
                      onClick={
                        () => console.log('fav')
                      }
                      sx={{
                        height: "32px", padding: "0px 24px", marginLeft: "32px"
                      }}
                    >
                      ♡
                    </Button>
                  </td>
                </tr>
              ))}
          </tbody>
      </Table>
    </Box>
  )
}

export default ListAssets