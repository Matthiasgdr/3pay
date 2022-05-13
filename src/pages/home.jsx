import React from "react";
import BankLinking from "../components/BankLinking";
import Toolbar from "../components/Toolbar";
import { SignUpButton } from "../components/WalletLinking";
import { Link } from "react-router-dom";
import useUser from "../hooks/useUser";
import useWalletTransactions from "../hooks/useWalletTransactions";

const App = () => {
  const { userAddress } = useUser();
  const transactions = useWalletTransactions(userAddress && userAddress[0]);

  return (
    <div>
      <Link to="/login">login</Link>
      <Link to="/signup">signup</Link>
      <BankLinking />
      <SignUpButton />
      <Toolbar />
      {transactions?.map((transaction) => (
        <p key={transaction.id}>
          {transaction.attributes.decimal.value.$numberDecimal} ETH
        </p>
      ))}
    </div>
  );
};

export default App;
