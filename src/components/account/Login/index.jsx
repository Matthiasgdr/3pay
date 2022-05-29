import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useUser } from "../../../hooks/useUser";
import { useMoralis } from "react-moralis";
import {
  InputWrapper,
  Input,
  PasswordInput,
  Button,
  Text,
  Box,
  Title,
  Checkbox,
} from "@mantine/core";
import { Formik } from "formik";

const Login = () => {
  const { Moralis } = useMoralis();
  const { user, setUser } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user]);

  const handleSubmitLogin = async ({ username, password }) => {
    try {
      await Moralis.User.logIn(username, password).then(
        (data) => data && setUser(data)
      );
    } catch (error) {
      alert("Error: " + error.code + " " + error.message);
    }
  };

  return (
    <Box>
      <Title
        order={1}
        align="center"
        sx={(theme) => ({ marginBottom: theme.spacing.xl })}
      >
        Se connecter
      </Title>
      <Formik
        onSubmit={handleSubmitLogin}
        initialValues={{ username: "", password: "" }}
      >
        {({ handleSubmit, handleChange, values, errors }) => (
          <form onSubmit={handleSubmit}>
            <InputWrapper
              id="username"
              label="Mail"
              error={errors.username}
              sx={(theme) => ({
                marginBottom: theme.spacing.md,
              })}
            >
              <Input
                id="username"
                name="username"
                type="text"
                placeholder="Mail"
                onChange={handleChange}
                value={values.username}
              />
            </InputWrapper>
            <InputWrapper
              id="password"
              label="Mot de passe"
              error={errors.username}
            >
              <PasswordInput
                id="password"
                name="password"
                placeholder="Mot de passe"
                onChange={handleChange}
                value={values.password}
              />
            </InputWrapper>
            <Box>
              <Text component={Link} to="/reset-password" underline size="xs">
                {"J'ai perdu mon mot de passe"}
              </Text>
              <Box sx={(theme) => ({ margin: theme.spacing.lg + "px 0px" })}>
                <Checkbox label="Garder-moi connecté sur cet appareil"></Checkbox>
              </Box>
            </Box>
            <Box
              sx={(theme) => ({
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                paddingBottom: theme.spacing.lg,
              })}
            >
              <Button type="submit">Connexion</Button>
            </Box>
          </form>
        )}
      </Formik>
      <Box sx={{ textAlign: "center" }}>
        <Text component="span">Pas encore de compte ? </Text>
        <Text variant="link" component={Link} to="/signup" underline>
          {"M'inscrire"}
        </Text>
      </Box>
    </Box>
  );
};

export default Login;
