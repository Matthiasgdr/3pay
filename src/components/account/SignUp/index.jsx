import React, { useState, useEffect } from "react";
import { useMoralis, useMoralisCloudFunction } from "react-moralis";
import { Formik } from "formik";
import { InputWrapper, Input, PasswordInput, Checkbox, Text, Button } from '@mantine/core';
import axios from "axios";
import * as Yup from 'yup';

const SignUp = () => {
  const [userSiren, setUserSiren] = useState(null);
  const [sirenInsee, setSirenInsee] = useState(null);

  const { Moralis } = useMoralis();
  const config = {
    headers: { Authorization: `Bearer ${process.env.REACT_APP_TOKEN_INSEE}` }
  };

  const { data } = useMoralisCloudFunction(
    "sirenExists",
    {},
    { autoFetch: true }
  );
  if(data && userSiren === null || data && userSiren === undefined) {
    setUserSiren(data)
  }

  const SignupSchema = Yup.object().shape({
    firstName: Yup.string()
      .min(1, 'Too Short!')
      .required('Required'),
    lastName: Yup.string()
      .min(1, 'Too Short!')
      .required('Required'),
    email: Yup.string().email('Invalid email').required('Required'),
    password: Yup.string().matches(/^(?:(?=.*[a-z])(?:(?=.*[A-Z])(?=.*[\d\W])|(?=.*\W)(?=.*\d))|(?=.*\W)(?=.*[A-Z])(?=.*\d)).{8,}$/, "Votre mot de passe doit contenir au moins 1 lettre ")
  });

  const handleSubmitSignup = async ({ username, email, password, siren }) => {
    // if(checkSiren(siren)) {
    //   console.log('test')
    //   for (const dbSiren of userSiren) {
    //     if(dbSiren == siren) {
    //       console.log('siren already exists')
    //     }
    //   }
    // } else {
    //   console.log('no siren')
    // }
    // const user = new Moralis.User();
    // user.set("username", username);
    // user.set("email", email);
    // user.set("password", password);
    // user.set("siren", siren);

    // try {
    //   await user.signUp();
    // } catch (error) {
    //   alert("Error: " + error.code + " " + error.message);
    // }
  };

  return (
    <>
      <h1>Créer votre compte</h1>
      <Formik
        validationSchema={SignupSchema}
        onSubmit={handleSubmitSignup}
        initialValues={{ username: "", email: "", password: "", siren: "" }}
      >
        {({ handleSubmit, handleChange, values }) => (
            <form onSubmit={handleSubmit}>
              
              <InputWrapper 
                id="username"
                label="Nom d'utilisateur"
                required
              >
                <Input type="text" name="username" id="username" onChange={handleChange} value={values.username}/>
              </InputWrapper>
              <InputWrapper 
                id="email"
                label="Email"
                required
              >
                <Input type="email" name="email" id="email" onChange={handleChange} value={values.email}/>
              </InputWrapper>
              <div>
                <PasswordInput required label="Mot de passe" name="password" id="password" onChange={handleChange} value={values.password}/>
                <Text size="xs">Minimum 6 character</Text>
              </div>
              <Checkbox
                sx={{ 
                  label: { fontSize: '14px' },
                }}
                size="lg"
                label="Je certifie avoir 18 ans ou plus et j’accepte le Contrat d’utilisateur et la Politique de confidentialité"
              />
              <button type="submit">Créer mon compte</button>
            </form>
        )}
      </Formik>
    </>
  );
};

export default SignUp;
