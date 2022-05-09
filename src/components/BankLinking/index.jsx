import React, { useState } from "react";
import axios from "axios";

const BankLinking = () => {
  const [country, setCountry] = useState("fr");
  const [banksOptions, setBanksOptions] = useState([]);
  const [bank, setBank] = useState("");
  const [accountId, setAccountId] = useState(
    "8aa6c6b0-d94c-4112-acd6-2f6fb7930f33"
  );
  const [accountsTransactions, setAccountsTransactions] = useState([]);

  const getBanks = () => {
    axios
      .get("http://localhost:5200/banks/?country=" + country)
      .then(({ data }) => {
        setBanksOptions(
          data.map((bank) => ({ value: bank.id, label: bank.name }))
        );
        setBank(data[0].id);
      });
  };

  const linkAccount = () => {
    axios
      .post("http://localhost:5200/link", {
        redirect: "http://localhost:3000",
        id: bank,
      })
      .then(({ data }) => {
        setAccountId(data.id);
        window.open(data.link, "_blank").focus();
      });
  };

  const listAccounts = () => {
    axios
      .post("http://localhost:5200/list", { id: accountId })
      .then(({ data }) =>
        data.accounts.forEach((acc) =>
          axios
            .post("http://localhost:5200/account", { id: acc })
            .then(({ data }) =>
              setAccountsTransactions((prv) => [...prv, data])
            )
        )
      );
  };

  const countryOptions = [
    { value: "fr", label: "France" },
    { value: "gb", label: "Angleterre" },
    { value: "de", label: "Allemagne" },
  ];

  return (
    <div>
      <select value={country} onChange={(e) => setCountry(e.target.value)}>
        {countryOptions.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      <button type="button" onClick={getBanks}>
        Get banks
      </button>
      {banksOptions.length > 0 && (
        <select value={bank} onChange={(e) => setBank(e.target.value)}>
          {banksOptions.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      )}
      <button onClick={linkAccount}>Link account</button>
      <button onClick={listAccounts}>List transactions</button>
      <div>
        {accountsTransactions.map((account, index) => (
          <div key={index}>
            {account.transactions.booked.map((transaction, i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  borderBottom: "1px solid black",
                }}
              >
                <div>
                  <p>
                    {transaction.remittanceInformationUnstructuredArray.map(
                      (line, y) => (
                        <p key={y} style={{}}>
                          {line}
                        </p>
                      )
                    )}
                  </p>
                </div>
                <p>{transaction.transactionAmount.amount}</p>
                <p>{transaction.bookingDate}</p>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default BankLinking;
