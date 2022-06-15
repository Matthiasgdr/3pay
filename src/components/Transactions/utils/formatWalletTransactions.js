import formatDate from "./dateFormat";

const formatWalletTransactions = (transactions, euro) => {
  const array = [];
  for (const transaction of transactions) {
    const formatedTransaction = {
      currency: transaction.className.replace("Transactions", ""),
      amount: (formatedTransaction.amount = Number(
        Number(transaction.attributes.decimal.value.$numberDecimal).toFixed(5) *
          euro
      ).toFixed(2)),
      description: [null],
      date: formatDate(transaction.attributes.createdAt),
      crypto: Number(
        transaction.attributes.decimal.value.$numberDecimal
      ).toFixed(4),
      type: "crypto",
    };

    array.push(formatedTransaction);
  }

  return array;
};

export default formatWalletTransactions;
