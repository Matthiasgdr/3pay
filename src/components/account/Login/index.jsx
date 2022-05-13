import React from "react";
import { useMoralis } from "react-moralis";
import { Formik } from "formik";

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
          ></input>
          <input
            name="password"
            type="password"
            onChange={handleChange}
            value={values.password}
          ></input>
          <button type="submit">login</button>
        </form>
      )}
    </Formik>
  );
};

export default Login;
