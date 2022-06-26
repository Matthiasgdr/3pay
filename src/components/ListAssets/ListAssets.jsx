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
  fluctuationUpText: {
    color: theme.colors.green[2]
  },
  fluctuationDownText: {
    color: theme.colors.red[2]
  },
  buttonsAdd: {
    display: 'flex',
    justifyContent: 'flex-end'
  },
}));

const ListAssets = () => {
  const { Moralis, isWeb3Enabled, enableWeb3 } = useMoralis()
  const { classes } = useStyles()
  const avaxEuro = cryptoToEuro("AVAX");
  const bnbEuro = cryptoToEuro("BNB");
  const polygonEuro = cryptoToEuro("MATIC");
  const fluctuations = useCryptoFluctuations("AVAX,BNB,MATIC")
  const avaxFluctuations = fluctuations !== null ? fluctuations[1]["1d"]?.volume_change_pct : null
  const bnbFluctuations = fluctuations !== null ? fluctuations[0]["1d"]?.volume_change_pct : null
  const polygonFluctuations = fluctuations !== null ? fluctuations[2]["1d"]?.volume_change_pct : null

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
      fluctuations: bnbFluctuations,
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
      fluctuations: polygonFluctuations,
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
                  <td className={chain.fluctuations >= 0 ? classes.fluctuationUpText : classes.fluctuationDownText}>
                    {chain.fluctuations ? chain.fluctuations + '%' : '+0%'}
                  </td>
                  <td>
                    <Text
                      size="xs"
                      sx={(theme) => ({
                        color: theme.colors.blue[3],
                        display: "inline-block",
                      })}
                    >
                      {chain.value + '€'}
                    </Text>
                  </td>
                  <td className={classes.buttonsAdd} >
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