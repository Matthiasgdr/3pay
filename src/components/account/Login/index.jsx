import React from "react";
import { useMoralis } from "react-moralis";
import { Formik } from "formik";
import { Container } from "@mantine/core";

const Login = () => {
  const { Moralis } = useMoralis();

  const handleSubmitLogin = async ({ username, password }) => {
    try {
      await Moralis.User.logIn(username, password, { usePost: true });
    } catch (error) {
      alert("Error: " + error.code + " " + error.message);
    }
  };

  return (
    <Container fluid>
      <Formik
        onSubmit={handleSubmitLogin}
        initialValues={{ username: "", password: "" }}
      >
        {({ handleSubmit, handleChange, values }) => (
          <form onSubmit={handleSubmit}>
            <input
              name="username"
              type="text"
              onChange={handleChange}
              value={values.username}
            />
            <input
              name="password"
              type="password"
              onChange={handleChange}
              value={values.password}
            />
            <button type="submit">login</button>
          </form>
        )}
      </Formik>
    </Container>
  );
};

export default Login;
