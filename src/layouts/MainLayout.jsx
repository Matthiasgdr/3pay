import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useMoralis } from "react-moralis";
import { useUser } from "../hooks/useUser";
import TopNavigation from "./TopNavigation";

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
    <>
      <TopNavigation />
      <Outlet />
    </>
  );
};

MainLayout.propTypes = {};

export default MainLayout;
