import React from "react";
import { useMoralis } from "react-moralis";
import { Formik } from "formik";
import { InputWrapper, Input, PasswordInput } from '@mantine/core';
import axios from "axios";

const SignUp = () => {
  const { Moralis } = useMoralis();
  const config = {
    headers: { Authorization: `Bearer ${process.env.REACT_APP_TOKEN_INSEE}` }
  };
  const checkSiren = (siren) => {
    axios
      .get("https://api.insee.fr/entreprises/sirene/V3/siren/" + siren, config)
      .then(console.log)
  }
  checkSiren(853514149)

  const handleSubmitSignup = async ({ username, email, password, siren }) => {
    const user = new Moralis.User();
    user.set("username", username);
    user.set("email", email);
    user.set("password", password);
    user.set("siren", siren);

    try {
      await user.signUp();
    } catch (error) {
      alert("Error: " + error.code + " " + error.message);
    }
  };

  return (
    <Formik
      onSubmit={handleSubmitSignup}
      initialValues={{ username: "", email: "", password: "", siren: "" }}
    >
      {({ handleSubmit, handleChange, values }) => (
        <form onSubmit={handleSubmit}>
          <InputWrapper 
            id="input-siren"
            label="Numéro SIREN"
            required
            description="Veuillez indiquer le numéro de SIREN de votre entreprise pour créer votre compte"
          >
            <Input id="input-siren" onChange={handleChange} value={values.siren}/>
          </InputWrapper>
          <InputWrapper 
            id="input-username"
            label="Nom d'utilisateur"
            required
          >
            <Input id="input-username" onChange={handleChange} value={values.username}/>
          </InputWrapper>
          <InputWrapper 
            id="input-email"
            label="Email"
            required
          >
            <Input id="input-email" onChange={handleChange} value={values.email}/>
          </InputWrapper>
          <PasswordInput required label="Mot de passe" id="input-password" onChange={handleChange} value={values.password}/>
          <button type="submit">submit</button>
        </form>
      )}
    </Formik>
  );
};

export default SignUp;
