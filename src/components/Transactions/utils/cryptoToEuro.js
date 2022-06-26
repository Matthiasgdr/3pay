import { useState } from "react";
import axios from "axios";

const cryptoToEuro = (crypto) => {
  const [euroValue, setEuroValue] = useState(null);

  const resp = axios
    .get(
      `https://min-api.cryptocompare.com/data/price?fsym=${crypto}&tsyms=EUR`
    )
    .catch(() => {
      return null;
    })
    .then(({ data }) => {
      setEuroValue(data.EUR);
    });

  if (resp) {
    return euroValue;
  }
};

export default cryptoToEuro;
