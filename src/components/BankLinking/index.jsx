import React, { useState } from "react";
import { useMoralis } from "react-moralis";
import axios from "axios";

const BankLinking = () => {
  const { user } = useMoralis();
  const [country, setCountry] = useState("fr");
  const [banksOptions, setBanksOptions] = useState([]);
  const [bank, setBank] = useState("");

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

  const linkAccount = async () => {
    axios
      .post("http://localhost:5200/link", {
        redirect: "http://localhost:3000",
        id: bank,
      })
      .then(({ data }) => {
        user.set("bankId", data.id);
        user.save();
        window.open(data.link);
      });
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
    </div>
  );
};

export default BankLinking;
