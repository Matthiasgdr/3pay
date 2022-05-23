import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useMoralis } from "react-moralis";
import TopNavigation from "./TopNavigation";

const MainLayout = () => {
  const { isAuthenticated } = useMoralis();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated]);

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
