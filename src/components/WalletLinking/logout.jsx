import React from "react";
import { Button } from "@mantine/core";
import { useMoralis } from "react-moralis";
import { useUser } from "../../hooks/useUser";

const LogoutButton = () => {
  const { logout } = useMoralis();
  const { setUser } = useUser();

  const handleLogOut = () => {
    setUser(null);
    logout();
  };

  return (
    <Button variant="light" onClick={handleLogOut}>
      Déconnexion
    </Button>
  );
};

export default LogoutButton;
