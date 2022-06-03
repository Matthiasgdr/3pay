const formatWalletTransactions = (transactions, euro) => {
    const array = [];
    for (const transaction of transactions) {
      const formatedTransaction = {
        type: null,
        amount: null,
        description: null,
        date: null
      }

      formatedTransaction.type = transaction.className;
      formatedTransaction.amount = Number(transaction.attributes.decimal.value.$numberDecimal).toFixed(4) + " " + Number(Number(transaction.attributes.decimal.value.$numberDecimal).toFixed(5) * euro).toFixed(2)
      formatedTransaction.date = transaction.attributes.createdAt
    }

    return array
}

export default formatWalletTransactions;
