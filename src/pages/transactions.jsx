import React from 'react'
import useUser from "../hooks/useUser";
import useWalletTransactions from "../hooks/useWalletTransactions";

const Transactions = () => {
  const { userAddress } = useUser();
  const transactions = useWalletTransactions(userAddress && userAddress[0]);

  return (
    <div>
      {transactions?.map((transaction) => (
        <p key={transaction.id}>
          {transaction.attributes.decimal.value.$numberDecimal} ETH
        </p>
      ))}
    </div>
  )
}

export default Transactions