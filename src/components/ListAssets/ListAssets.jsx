import React, { useEffect } from "react";
import { Table, createStyles, Text, Box, Button } from "@mantine/core";
import { useMoralis } from "react-moralis";

import CryptoName from "../../blocks/CryptoName";
import { AvaxLogo, BSCLogo, PolygonLogo } from "./Logo";
import cryptoToEuro from "../Transactions/utils/cryptoToEuro";
import useCryptoFluctuations from "../../hooks/useCryptoFluctuations";

const ListAssets = () => {
  const { Moralis, isWeb3Enabled, enableWeb3 } = useMoralis();
  const avaxEuro = cryptoToEuro("AVAX");
  const bnbEuro = cryptoToEuro("BNB");
  const polygonEuro = cryptoToEuro("MATIC");
  const avaxFluctuations = useCryptoFluctuations("AVAX");

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

  useEffect(() => {
    if (!isWeb3Enabled) {
      enableWeb3();
    }
  }, [isWeb3Enabled]);

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
    <Table>
      <thead>
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
            <td>
              <CryptoName crypto={chain} />
            </td>
            <td>+20%</td>
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
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default ListAssets;
