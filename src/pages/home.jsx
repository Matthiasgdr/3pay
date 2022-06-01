import React from "react";
import BankLinking from "../components/BankLinking";
import { SignUpButton, LogoutButton } from "../components/WalletLinking";
import useUser from "../hooks/useUser";
import useWalletTransactions from "../hooks/useWalletTransactions";

const Home = () => {
  const { user } = useUser();
  const transactions = useWalletTransactions(
    user?.accounts && user.accounts[0]
  );

  return (
    <div>
      <BankLinking />
      <SignUpButton />
      {transactions?.map((transaction) => (
        <p key={transaction.id}>
          {transaction.attributes.decimal.value.$numberDecimal} ETH
        </p>
      ))}
      <LogoutButton />
    </div>
  );
};

export default Home;
