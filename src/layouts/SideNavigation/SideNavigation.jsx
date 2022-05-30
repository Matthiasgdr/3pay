import React from "react";
import { Settings, ArrowsLeftRight, LayoutBoard } from "tabler-icons-react";
import NavigationItem from "./NavigationItem";

// import { SideNavigationStyles } from "../styles.layouts";
// import { useNavigate } from "react-router-dom";
// import { useMoralis } from "react-moralis";

const data = [
  { icon: <LayoutBoard size={16} />, label: "Tableau de bord", route: "/" },
  {
    icon: <ArrowsLeftRight size={16} />,
    label: "Transactions",
    route: "/transactions",
  },
  { icon: <Settings size={16} />, label: "Paramètres", route: "/settings" },
];

const SideNavigation = () => {
  // const { classes } = SideNavigationStyles();
  //   const { isAuthenticated } = useMoralis();

  return data.map((link) => (
    <NavigationItem {...link} key={link.label}></NavigationItem>
  ));
};

SideNavigation.propTypes = {};

export default SideNavigation;
