import { useEffect, useState } from "react";
import axios from "axios";

export const useCryptoFluctuations = (crypto) => {
  const [infos, setInfos] = useState(null);
  const getInfos = () => {
    axios
      .get(
        `${process.env.REACT_APP_BANK_PROXY_URL}/fluctuations?crypto=${crypto}`
      )
      .then((res) => {
        setInfos(res.data.fluctuations);
      })
      .catch(() => {
        return null;
      });
  };

  useEffect(() => {
    if (!infos) {
      getInfos();
    }
  }, [infos]);

  return infos;
};

export const getFluctuations = (symbol, fluctuations) => {
  if (fluctuations) {
    return (
      fluctuations?.find((e) => e.id === symbol)["1d"]?.volume_change_pct ||
      null
    );
  }
};

export default useCryptoFluctuations;
