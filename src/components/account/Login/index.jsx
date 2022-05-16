import React from "react";
import { useNavigate } from "react-router-dom";
import { useMoralis } from "react-moralis";
import { InputWrapper, Input, Button } from "@mantine/core";
import { Formik } from "formik";

const Login = () => {
  const { Moralis } = useMoralis();
  const navigate = useNavigate();

  const handleSubmitLogin = async ({ username, password }) => {
    try {
      await Moralis.User.logIn(username, password, { usePost: true }).then(
        ({ id }) => id && navigate("/home")
      );
    } catch (error) {
      alert("Error: " + error.code + " " + error.message);
    }
  };

  return (
    <Formik
      onSubmit={handleSubmitLogin}
      initialValues={{ username: "", password: "" }}
    >
      {({ handleSubmit, handleChange, values, errors }) => (
        <form onSubmit={handleSubmit}>
          <InputWrapper
            id="username"
            label="Votre nom d'utilisateur"
            error={errors.username}
          >
            <Input
              id="username"
              name="username"
              type="text"
              placeholder="Nom d'utilisateur"
              onChange={handleChange}
              value={values.username}
            />
          </InputWrapper>
          <InputWrapper
            id="password"
            label="Votre mot de passe"
            error={errors.username}
          >
            <Input
              id="password"
              name="password"
              type="password"
              placeholder="Mot de passe"
              onChange={handleChange}
              value={values.password}
            />
          </InputWrapper>
          <Button type="submit">Se connecter</Button>
        </form>
      )}
    </Formik>
  );
};

export default Login;
