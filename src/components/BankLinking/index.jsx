import React, { useState, useEffect, useMemo } from "react";
import { Select, Button, Box, Image, Text } from "@mantine/core";
import { Search, Check } from "tabler-icons-react";
import { useUser } from "../../hooks/useUser";
import axios from "axios";

const BankLinking = () => {
  const { user } = useUser();
  const [banks, setBanks] = useState([]);
  const [selectedBankId, setSelectedBankId] = useState(null);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BANK_PROXY_URL}/banks/?country=` + "fr")
      .then(({ data }) => {
        setBanks(data);
      });
  }, []);

  const banksOptions = useMemo(
    () => banks.map((bank) => ({ value: bank.id, label: bank.name })),
    [banks]
  );

  const selectedBank = useMemo(() => {
    return banks.find((b) => b.id === selectedBankId);
  }, [selectedBankId]);

  const linkAccount = async () => {
    axios
      .post(`${process.env.REACT_APP_BANK_PROXY_URL}/link`, {
        redirect: process.env.REACT_APP_DOMAIN,
        id: selectedBankId,
      })
      .then(({ data }) => {
        user.set("bankId", data.id);
        user.save();
        window.open(data.link);
      });
  };

  return !user.attributes.bankId ? (
    <Box
      sx={(t) => ({
        width: "400px",
        marginTop: t.spacing.lg,
      })}
    >
      <Select
        icon={<Search size={14} />}
        searchable
        clearable
        placeholder="Ma Banque"
        data={banksOptions}
        onChange={setSelectedBankId}
        sx={(t) => ({
          marginBottom: t.spacing.lg,
        })}
      />
      {selectedBankId && (
        <Box
          sx={(theme) => ({
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            marginBottom: theme.spacing.lg,
            borderRadius: theme.radius.md,
            padding: theme.spacing.md,
            border: `2px solid ${theme.colors.green[1]}`,
            backgroundColor: theme.colors.green[0],
          })}
        >
          <Image
            height={80}
            fit="contain"
            radius="md"
            src={selectedBank.logo}
          />
          <Text
            sx={(theme) => ({
              textAlign: "center",
              color: theme.colors.green[8],
              marginTop: theme.spacing.sm,
            })}
          >
            <Text>{selectedBank.name}</Text>
            <Check />
          </Text>
        </Box>
      )}
      <Button onClick={linkAccount}>Lié mon compte</Button>
    </Box>
  ) : (
    <Text>Votre compte en banque est lié !</Text>
  );
};

export default BankLinking;
