import React, { useState } from "react";
import { useMoralis, useMoralisCloudFunction } from "react-moralis";
import { Formik } from "formik";
import { InputWrapper, Input, Button, Text } from '@mantine/core';
import axios from "axios";
import * as Yup from 'yup';

const Siren = () => {
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
          .required('Required')
    });

    const handleSubmitSignup = async ({ username, email, password, siren }) => {
        const isExist = userSiren.includes(siren.toString())
        const checkSiren = await axios
            .get("https://api.insee.fr/entreprises/sirene/V3/siren/" + siren, config)
        
        if(checkSiren && !isExist) {
            console.log("🚀 ~ file: index.jsx ~ line 33 ~ handleSubmitSignup ~ checkSiren", checkSiren)
        }
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
        <Text size="xl">Vérfier votre entreprise</Text>
        <Formik
            validationSchema={SignupSchema}
            onSubmit={handleSubmitSignup}
            initialValues={{ siren: "" }}
        >
            <InputWrapper 
                id="siren"
                label="Numéro Siren"
                required
            >
                <Input type="number" name="siren" id="siren" onChange={handleChange} value={values.siren}/>
            </InputWrapper>
            <Button></Button>
        </ Formik>
    </>
  )
}

export default Siren