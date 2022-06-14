import React, { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Box, Title, Tabs } from "@mantine/core";
import Profil from "./tabs/Profil";
import Entreprise from "./tabs/Entreprise";

const tabs = ["profil", "entreprise", "wallet", "payement"];

const Settings = () => {
  const [params, setParams] = useSearchParams();
  useEffect(() => {
    if (!params.get("tab")) {
      setParams({ tab: "profil" });
    }
  }, [params]);

  return (
    <Box>
      <Title sx={(theme) => ({ marginBottom: theme.spacing.md })}>
        Paramètres du compte
      </Title>
      <Tabs
        tabPadding="lg"
        active={tabs.indexOf(params.get("tab"))}
        onTabChange={(tab) => {
          setParams({ tab: tabs[tab] });
        }}
      >
        <Tabs.Tab label="Profil">
          <Profil />
        </Tabs.Tab>
        <Tabs.Tab label="Mon entreprise">
          <Entreprise />
        </Tabs.Tab>
        <Tabs.Tab label="Wallet"></Tabs.Tab>
        <Tabs.Tab label="Méthode de paiement"></Tabs.Tab>
      </Tabs>
    </Box>
  );
};

export default Settings;
