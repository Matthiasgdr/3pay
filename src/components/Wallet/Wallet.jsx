import React, { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Box, Title, Tabs } from "@mantine/core";

import Automatisation from "./tabs/Automatisation";
import AddCrypto from "./tabs/AddCrypto";
import Tresorery from "./tabs/Tresorery";

const tabs = ["add", "tresorery", "automatisation"];

const Wallet = () => {
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
        <Tabs.Tab label="Ajouter une crypto">
          <AddCrypto />
        </Tabs.Tab>
        <Tabs.Tab label="Ma trésorerie">
          <Tresorery />
        </Tabs.Tab>
        <Tabs.Tab label="Automatisation des transferts">
          <Automatisation />
        </Tabs.Tab>
      </Tabs>
    </Box>
  );
};

export default Wallet;
