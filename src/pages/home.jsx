import React from "react";
// import { useMoralis } from "react-moralis";
import BankLinking from "../components/BankLinking";
import { Box } from "@mantine/core";
import { SignUpButton } from "../components/WalletLinking";
// import useBankTransactions from "../hooks/useBankTransaction";
import useUser from "../hooks/useUser";
import useWalletTransactions from "../hooks/useWalletTransactions";

const Home = () => {
  const { user } = useUser();
  const transactions = useWalletTransactions(
    user?.accounts && user.accounts[0]
  );
  // const { response } = useBankTransactions();
  const { response } = {};

  return (
    <div>
      <BankLinking />
      <SignUpButton />
      {transactions?.map((transaction) => (
        <p key={transaction.id}>
          {transaction.attributes.decimal.value.$numberDecimal} ETH
        </p>
      ))}
      <div>
        {response?.transactions?.booked.map((transaction, i) => (
          <Box
            key={i}
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              borderBottom: "1px solid black",
            }}
          >
            <Box>
              <p>
                {transaction.remittanceInformationUnstructuredArray.map(
                  (line, y) => (
                    <p
                      key={y}
                      style={{ fontWeight: y === 0 ? "bold" : "normal" }}
                    >
                      {line}
                    </p>
                  )
                )}
              </p>
            </Box>
            <p>{transaction.transactionAmount.amount}</p>
            <p>{transaction.bookingDate}</p>
          </Box>
        ))}
      </div>
    </div>
  );
};

export default Home;
