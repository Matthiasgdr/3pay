import { useMoralis } from "react-moralis";

const useGetBalance = async () => {
  const { Moralis } = useMoralis()
  await Moralis.Web3API.account.getTokenBalances()
  .then(
    (res) => {
      const result = Moralis.Cloud.units({
        method: "fromWei",
        value: res,
      });
      console.log(result)
      return result
    }
  )

};

export default useGetBalance;
