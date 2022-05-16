import React from "react";
import { Outlet } from "react-router-dom";
import { Container, Box } from "@mantine/core";
import { useAuthLayoutStyles } from "./styles.layouts";

const AuthLayout = () => {
  const { classes } = useAuthLayoutStyles();
  return (
    <Container className={classes.container} fluid px="0px">
      <Box className={classes.wrapper} p="xl">
        <Outlet />
      </Box>
    </Container>
  );
};

export default AuthLayout;
