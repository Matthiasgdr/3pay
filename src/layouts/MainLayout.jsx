import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useMoralis } from "react-moralis";
import { useUser } from "../hooks/useUser";
import TopNavigation from "./TopNavigation";

const MainLayout = () => {
  const { Moralis, isAuthenticated, serverUrl, appId } = useMoralis();
  const navigate = useNavigate();
  const { user, setUser } = useUser();
  console.log("LOG ~ file: MainLayout.jsx ~ line 11 ~ MainLayout ~ user", user);

  useEffect(() => {
    Moralis.start({ appId, serverUrl });
    const currentUser = Moralis.User.current();
    if (!currentUser) {
      navigate("/login");
    }
    setUser(currentUser);
  }, [isAuthenticated, Moralis]);

  if (!user) return null;

  return (
    <>
      <TopNavigation />
      <Outlet />
    </>
  );
};

MainLayout.propTypes = {};

export default MainLayout;
