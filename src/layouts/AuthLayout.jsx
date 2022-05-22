import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useMoralis } from "react-moralis";
import { Container, Box } from "@mantine/core";
import { useAuthLayoutStyles } from "./styles.layouts";

const AuthLayout = () => {
  const { classes } = useAuthLayoutStyles();
  const { isAuthenticated } = useMoralis();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated]);
  if (isAuthenticated) return null;

  return (
    <Container className={classes.container} fluid px="0px">
      <Box className={classes.wrapper}>
        <Outlet />
      </Box>
    </Container>
  );
};

export default AuthLayout;
