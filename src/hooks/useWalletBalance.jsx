import { useEffect, useState } from "react";
import { useMoralis } from "react-moralis";

const useWalletBalance = () => {
  const { Moralis } = useMoralis();
  const [balance, setBalance] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(async () => {
    try {
      await Moralis.Web3API.account.getNativeBalance().then((res) => {
        if (res) {
          const result = Moralis.Units.FromWei(res.balance);
          setBalance(result);
          setLoading(false);
        }
      });
    } catch (err) {
      if (err) {
        setError("Aucun wallet connecté");
        setLoading(false);
      }
    }
  }, [balance]);

  return { balance, error, loading };
};

export default useWalletBalance;
