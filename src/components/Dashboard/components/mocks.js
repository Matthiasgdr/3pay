import { getCryptoIcon } from "../../../utils/getCryptoIcon";

export const mocks = [
  {
    name: "Bitcoin",
    icon: getCryptoIcon("BTC"),
    symbol: "BTC",
    price: "27074.86€",
    sold: "0.069",
    euro: "1400",
  },
  {
    name: "Ethereum",
    icon: getCryptoIcon("ETH"),
    symbol: "ETH",
    price: "1654.86€",
    sold: "5.06",
    euro: "5600",
  },
  {
    name: "Tether",
    icon: getCryptoIcon("USDT"),
    symbol: "USDT",
    price: "0.93€",
    sold: "369",
    euro: "350",
  },
];
