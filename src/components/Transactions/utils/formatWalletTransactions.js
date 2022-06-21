import mockTransactions from "./mocks";

const formatWalletTransactions = (transactions, euro) => {
  const array = [];
  for (const transaction of transactions) {
    const formatedTransaction = {
      currency: transaction.className.replace("Transactions", ""),
      amount: Number(
        transaction.attributes.decimal.value.$numberDecimal
      ).toFixed(4),
      description: [null],
      date: transaction.attributes.block_timestamp,
      euro: Number(
        Number(transaction.attributes.decimal.value.$numberDecimal).toFixed(5) *
          euro
      ).toFixed(2),
      type: "crypto",
    };

    array.push(formatedTransaction);
  }

  return [...array, ...mockTransactions];
};

export default formatWalletTransactions;
