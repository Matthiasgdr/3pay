import React from "react";
import { Box } from "@mantine/core";
import { TopNavigationStyles } from "./styles.layouts";
// import { useNavigate } from "react-router-dom";
// import { useMoralis } from "react-moralis";

const TopNavigation = () => {
  const { classes } = TopNavigationStyles();
  //   const { isAuthenticated } = useMoralis();
  //   const navigate = useNavigate();

  return (
    <Box className={classes.container}>
      <Box></Box>
    </Box>
  );
};

TopNavigation.propTypes = {};

export default TopNavigation;
