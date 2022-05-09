import React, { useState } from "react";
import styled from "styled-components";
import axios from "axios";

const Title = styled.h1`
  background-color: ${(p) => p.theme.colors.background.primary};
  color: ${(p) => p.theme.colors.text};
`;

const Example = () => {
  const [country, setCountry] = useState("fr");
  const [banksOptions, setBanksOptions] = useState([]);
  const [bank, setBank] = useState("");
  const [accountId, setAccountId] = useState("");
  const [accountsTransactions, setAccountsTransactions] = useState({});
  console.log(
    "LOG ~ file: index.jsx ~ line 16 ~ Example ~ accountsTransactions",
    accountsTransactions
  );

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
              setAccountsTransactions((prv) => ({ ...prv, [acc]: data }))
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
      <Title>Example</Title>
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
      <div>{accountId}</div>
      <button onClick={listAccounts}>List transactions</button>
    </div>
  );
};

export { Example };
