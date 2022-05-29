import { useMoralisQuery } from "react-moralis";

const useWalletTransactions = ({ address }) => {
  const { data } = useMoralisQuery(
    "EthTransactions",
    (query) => query.equalTo("to_address", address),
    [address],
    { autoFetch: true }
  );

  return data;
};

export default useWalletTransactions;
