import { useMoralisQuery } from "react-moralis";

const useWalletTransactions = (address, receive = "to_address") => {
  const { data } = useMoralisQuery(
    "EthTransactions",
    (query) => query.equalTo(receive, address),
    [address],
    { autoFetch: true }
  );

  return data;
};

export default useWalletTransactions;
