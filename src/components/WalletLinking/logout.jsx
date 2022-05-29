import React from "react";
import { useMoralis } from "react-moralis";
import { useUser } from "../../hooks/useUser";

const LogoutButton = () => {
  const { logout } = useMoralis();
  const { setUser } = useUser();

  const handleLogOut = () => {
    setUser(null);
    logout();
  };

  return <button onClick={handleLogOut}>Logout</button>;
};

export default LogoutButton;
