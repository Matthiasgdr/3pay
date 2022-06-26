import * as icons from "./cryptoIcons";

export const getCryptoIcon = (symbol) => {
  return icons[symbol]() || null;
};
