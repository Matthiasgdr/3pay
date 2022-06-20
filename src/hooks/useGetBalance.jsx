import { useEffect, useState } from "react";
import { useMoralis } from "react-moralis";

const useGetBalance = () => {
  const { Moralis } = useMoralis();
  const [balance, setBalance] = useState(null);

  useEffect(async () => {
    await Moralis.Web3API.account.getNativeBalance().then((res) => {
      if (res) {
        const result = Moralis.Units.FromWei(res.balance);
        setBalance(result);
      }
    });
  }, [balance]);

  return balance;
};

export default useGetBalance;
