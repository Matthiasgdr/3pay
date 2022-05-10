import { useMoralisQuery } from "react-moralis";

const useWalletTransactions = (address) => {

    const { fetch } = useMoralisQuery(
      "EthTransactions",
      (query) => query.equalTo("to_address", address),
      [],
      { autoFetch: false }
    );

    const basicQuery = async () => {
      const results = await fetch();
      return results
    };
  
  return basicQuery()
}

export { useWalletTransactions }