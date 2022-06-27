import React, { useEffect } from "react";
import { Table, createStyles, Text, Box, Button } from "@mantine/core";
import { useMoralis } from "react-moralis";

import CryptoName from "../../blocks/CryptoName";
import { AvaxLogo, BSCLogo, PolygonLogo } from "./Logo";
import cryptoToEuro from "../Transactions/utils/cryptoToEuro";
import useCryptoFluctuations from "../../hooks/useCryptoFluctuations";

const useStyles = createStyles((theme) => ({
  fluctuationUpText: {
    color: theme.colors.green[2],
  },
  fluctuationDownText: {
    color: theme.colors.red[2],
  },
  buttonsAdd: {
    display: "flex",
    justifyContent: "flex-end",
  },
}));

const ListAssets = () => {
  const { Moralis } = useMoralis();
  const { classes } = useStyles();

  const avaxEuro = cryptoToEuro("AVAX");
  const bnbEuro = cryptoToEuro("BNB");
  const polygonEuro = cryptoToEuro("MATIC");
  const fluctuations = useCryptoFluctuations("AVAX,BNB,MATIC");

  const avaxFluctuations =
    fluctuations !== null ? fluctuations[1]["1d"]?.volume_change_pct : null;
  const bnbFluctuations =
    fluctuations !== null ? fluctuations[0]["1d"]?.volume_change_pct : null;
  const polygonFluctuations =
    fluctuations !== null ? fluctuations[2]["1d"]?.volume_change_pct : null;

  const arrayAssets = [
    {
      icon: <AvaxLogo />,
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
        blockExplorerUrl: "https://cchain.explorer.avax.network/",
      },
    },
    {
      icon: <BSCLogo />,
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
        blockExplorerUrl: "https://bscscan.com",
      },
    },
    {
      icon: <PolygonLogo />,
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
        blockExplorerUrl: "https://explorer-mainnet.maticvigil.com",
      },
    },
  ];

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
          {arrayAssets.map((chain) => (
            <tr key={chain.name}>
              <td className={classes.nameTable}>
                <CryptoName crypto={chain} />
              </td>
              <td
                className={
                  chain.fluctuations >= 0
                    ? classes.fluctuationUpText
                    : classes.fluctuationDownText
                }
              >
                {chain.fluctuations ? chain.fluctuations + "%" : "+0%"}
              </td>
              <td>
                <Text
                  size="xs"
                  sx={(theme) => ({
                    color: theme.colors.blue[3],
                    display: "inline-block",
                  })}
                >
                  {chain.value + "€"}
                </Text>
              </td>
              <td>
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
          ))}
        </tbody>
      </Table>
    </Box>
  );
};

export default ListAssets;
