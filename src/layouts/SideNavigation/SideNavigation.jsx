import React from "react";
import { Navbar } from "@mantine/core";
import {
  Settings,
  ArrowsLeftRight,
  LayoutBoard,
  Wallet,
} from "tabler-icons-react";

import { LogoutButton } from "../../components/WalletLinking";
import NavigationItem from "./NavigationItem";

const data = [
  { icon: <LayoutBoard size={16} />, label: "Tableau de bord", route: "/" },
  {
    icon: <Wallet size={16} />,
    label: "Porte-monnaie",
    route: "/wallet",
  },
  {
    icon: <ArrowsLeftRight size={16} />,
    label: "Transactions",
    route: "/transactions",
  },
  { icon: <Settings size={16} />, label: "Paramètres", route: "/settings" },
];

const SideNavigation = () => {
  return (
    <Navbar width={{ base: 250 }}>
      <Navbar.Section grow>
        {data.map((link) => (
          <NavigationItem {...link} key={link.label}></NavigationItem>
        ))}
      </Navbar.Section>
      <Navbar.Section
        sx={(theme) => ({
          padding: theme.spacing.sm,
          display: "flex",
          justifyContent: "center",
        })}
      >
        <LogoutButton />
      </Navbar.Section>
    </Navbar>
  );
};

SideNavigation.propTypes = {};

export default SideNavigation;
