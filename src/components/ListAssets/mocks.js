import React from "react";
import { AvaxLogo, BSCLogo, PolygonLogo, ETHLogo } from "./Logo";

export const arrayAssets = [
  {
    icon: <AvaxLogo />,
    name: "Avalanche",
    symbol: "AVAX",
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
    icon: <ETHLogo />,
    name: "Ethereum",
    symbol: "ETH",
    chain: {
      chainId: 1,
      chainName: "Ethereum",
      currencyName: "ETH",
      currencySymbol: "ETH",
      rpcUrl: "https://mainnet.infura.io/v3/",
      blockExplorerUrl: "https://etherscan.io",
    },
  },
  {
    icon: <BSCLogo />,
    name: "Binance",
    symbol: "BNB",
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
