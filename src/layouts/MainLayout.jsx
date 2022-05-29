import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useMoralis } from "react-moralis";
import { AppShell, Navbar, Header } from "@mantine/core";

import { useUser } from "../hooks/useUser";
import SideNavigation from "./SideNavigation/SideNavigation";
import TopBar from "./TopBar";

const MainLayout = () => {
  const { Moralis, serverUrl, appId } = useMoralis();

  const navigate = useNavigate();
  const { user, setUser } = useUser();

  useEffect(() => {
    Moralis.start({ appId, serverUrl });
    const currentUser = Moralis.User.current();
    if (!currentUser) {
      navigate("/login");
    } else {
      setUser(currentUser);
    }
  }, [Moralis, user]);

  if (!user) return null;

  return (
    <AppShell
      padding="md"
      fixed
      navbar={
        <Navbar width={{ base: 250 }}>
          <SideNavigation />
        </Navbar>
      }
      header={
        <Header height={60} p="xs">
          <TopBar />
        </Header>
      }
    >
      <Outlet />
    </AppShell>
  );
};

MainLayout.propTypes = {};

export default MainLayout;
