import React, { useEffect } from "react";
import { Outlet /*useNavigate*/ } from "react-router-dom";
import { useMoralis } from "react-moralis";
import TopNavigation from "./TopNavigation";

const MainLayout = () => {
  const { Moralis, isAuthenticated, appId, serverUrl } = useMoralis();
  //   const navigate = useNavigate();

  useEffect(() => {
    Moralis.start({ appId, serverUrl });
    console.log(
      "LOG ~ file: MainLayout.jsx ~ line 8 ~ MainLayout ~ isAuthenticated",
      isAuthenticated
    );
    const currentUser = Moralis.User.current();
    console.log(
      "LOG ~ file: MainLayout.jsx ~ line 17 ~ useEffect ~ currentUser",
      currentUser
    );
  }, [isAuthenticated, Moralis]);

  if (!isAuthenticated) return null;

  return (
    <>
      <TopNavigation />
      <Outlet />
    </>
  );
};

MainLayout.propTypes = {};

export default MainLayout;
