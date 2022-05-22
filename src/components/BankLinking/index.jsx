import React, { useState, useEffect } from "react";
import { Select, Button, Box } from "@mantine/core";
import { Search } from "tabler-icons-react";
import { useMoralis } from "react-moralis";
import axios from "axios";

const BankLinking = () => {
  const { user } = useMoralis();
  const [banksOptions, setBanksOptions] = useState([]);
  const [bank, setBank] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:5200/banks/?country=" + "fr")
      .then(({ data }) => {
        setBanksOptions(
          data.map((bank) => ({ value: bank.id, label: bank.name }))
        );
        setBank(data[0].id);
      });
  }, []);

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

  return (
    <Box
      sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <Select
        icon={<Search size={14} />}
        searchable
        placeholder="Pick one"
        data={banksOptions}
      />

      <Button onClick={linkAccount}>Lié mon compte</Button>
    </Box>
  );
};

export default BankLinking;
