import React from "react";
import { Box } from "@mantine/core";
import Logo from "./assets/Logo";
// import { useNavigate } from "react-router-dom";
// import { useMoralis } from "react-moralis";

const TopBar = () => {
  //   const { isAuthenticated } = useMoralis();
  //   const navigate = useNavigate();

  return (
    <Box
      sx={(theme) => ({
        display: "flex",
        alignItems: "center",
        padding: `0px ${theme.spacing.md}px`,
        height: "100%",
        width: "100%",
      })}
    >
      <Logo />
    </Box>
  );
};

TopBar.propTypes = {};

export default TopBar;
