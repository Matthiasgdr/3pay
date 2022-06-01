import React from "react";
import { Box, Title, Tabs } from "@mantine/core";
import Profil from "./tabs/Profil";

const Settings = () => {
  return (
    <Box>
      <Title sx={(theme) => ({ marginBottom: theme.spacing.md })}>
        Paramètres du compte
      </Title>
      <Tabs tabPadding="lg">
        <Tabs.Tab label="Profil">
          <Profil />
        </Tabs.Tab>
        <Tabs.Tab label="Méthode de paiement"></Tabs.Tab>
        <Tabs.Tab label="Wallet"></Tabs.Tab>
        <Tabs.Tab label="Mon entreprise"></Tabs.Tab>
      </Tabs>
    </Box>
  );
};

export default Settings;
