export const transformBankToDefault = (transactions) => {
  const transformedTransactions = transactions?.map((t) => {
    return {
      description: t.remittanceInformationUnstructuredArray,
      amount: t.transactionAmount.amount,
      type: t.transactionAmount.currency,
      date: t.bookingDate.replace(/-/g, '/'),
    };
  });
  return transformedTransactions;
};
