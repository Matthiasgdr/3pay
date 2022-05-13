import React from "react";
import { useMoralis } from "react-moralis";
import { Formik } from "formik";

const SignUp = () => {
  const { Moralis } = useMoralis();

  const handleSubmitSignup = async ({ username, password }) => {
    const user = new Moralis.User();
    user.set("username", username);
    user.set("password", password);
    try {
      await user.signUp();
    } catch (error) {
      alert("Error: " + error.code + " " + error.message);
    }
  };

  return (
    <Formik
      onSubmit={handleSubmitSignup}
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
          <button type="submit">submit</button>
        </form>
      )}
    </Formik>
  );
};

export default SignUp;
