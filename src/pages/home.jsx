import React from "react";
import BankLinking from "../components/BankLinking";
import { Box } from "@mantine/core";
import Toolbar from "../components/Toolbar";
import useBankTransactions from "../hooks/useBankTransaction";

const Home = () => {
  const { response } = useBankTransactions();

  return (
    <div>
      <BankLinking />
      <Toolbar />
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
