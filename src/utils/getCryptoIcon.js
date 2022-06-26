import * as icons from "./cryptoIcons";

export const getCryptoIcon = (symbol) => {
  const cryptoIcons = {
    ETH: icons["ETH"](),
    BTC: icons["BTC"](),
    AVAX: icons["AVAX"](),
    USDT: icons["USDT"](),
  };
  return cryptoIcons[symbol] || null;
};
