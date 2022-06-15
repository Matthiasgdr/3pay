export const transformBankToDefault = (transactions) => {
  const transformedTransactions = transactions?.map((t) => {
    return {
      description: t.remittanceInformationUnstructuredArray,
      amount: t.transactionAmount.amount,
      currency: t.transactionAmount.currency,
      date: new Date(t.bookingDate.split("-").reverse().join("/")),
      type: "bank",
    };
  });
  return transformedTransactions;
};
