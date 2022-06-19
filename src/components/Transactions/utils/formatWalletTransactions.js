import mockTransactions from "./mocks";

const formatWalletTransactions = (transactions, euro) => {
  const array = [];
  for (const transaction of transactions) {
    const formatedTransaction = {
      currency: transaction.className.replace("Transactions", ""),
      amount: Number(
        Number(transaction.attributes.decimal.value.$numberDecimal).toFixed(5) *
          euro
      ).toFixed(2),
      description: [null],
      date: new Date(transaction.attributes.createdAt),
      crypto: Number(
        transaction.attributes.decimal.value.$numberDecimal
      ).toFixed(4),
      type: "crypto",
    };

    array.push(formatedTransaction);
  }

  return [...array, ...mockTransactions];
};

export default formatWalletTransactions;
