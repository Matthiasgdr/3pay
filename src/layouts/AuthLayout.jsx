import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

import { Container, Box } from "@mantine/core";
import { useUser } from "../hooks/useUser";
import { useAuthLayoutStyles } from "./styles.layouts";

const AuthLayout = () => {
  const { classes } = useAuthLayoutStyles();
  const { user } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user]);

  if (user) return null;

  return (
    <Container className={classes.container} fluid px="0px">
      <Box className={classes.wrapper}>
        <Outlet />
      </Box>
    </Container>
  );
};

export default AuthLayout;
