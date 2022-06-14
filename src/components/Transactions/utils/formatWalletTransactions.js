import formatDate from './dateFormat';

const formatWalletTransactions = (transactions, euro) => {
    const array = [];
    for (const transaction of transactions) {
      const formatedTransaction = {
        type: null,
        amount: null,
        description: [null],
        date: null,
        crypto: null
      }

      formatedTransaction.type = transaction.className.replace('Transactions', '');
      formatedTransaction.amount = Number(Number(transaction.attributes.decimal.value.$numberDecimal).toFixed(5) * euro).toFixed(2)
      formatedTransaction.crypto = Number(transaction.attributes.decimal.value.$numberDecimal).toFixed(4)
      formatedTransaction.date = formatDate(transaction.attributes.createdAt)
      array.push(formatedTransaction)
    }

    return array
}

export default formatWalletTransactions;
