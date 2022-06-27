import React, { useState } from "react";
import { useMoralisCloudFunction } from "react-moralis";
import { Formik } from "formik";
import { InputWrapper, Input, Button, Title, Box } from '@mantine/core';
import axios from "axios";
import * as Yup from 'yup';
import PropTypes from "prop-types";

const Siren = ({ onValidate }) => {
    const [userSiren, setUserSiren] = useState(null);
    var retrievedObject = localStorage.getItem('userSignup')
    const userObject = JSON.parse(retrievedObject)
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

    const sirenSchema = Yup.object().shape({
      siren: Yup.string()
        .min(9, 'Numéro de SIREN invalide')
        .required('Required')
    });

    const handleSubmitSignup = async ({ siren }, { setFieldError }) => {
      const isExist = userSiren.includes(siren.toString())
      const checkSiren = await axios
        .get("https://api.insee.fr/entreprises/sirene/V3/siren/" + siren, config)
        .catch(() => {
          setFieldError("siren", "Numéro SIREN inexistant ")
        })
      
      if(checkSiren && !isExist && userObject) {
        userObject.siren = siren
        localStorage.setItem('userSignup', JSON.stringify(userObject))
        onValidate("connectwallet");
      } else if (isExist) {
        setFieldError("siren", "Numéro SIREN déjà utilisé pour un autre compte")
      }
    };
  return (
    <>
        <Title 
          order={1}
          align="center"
          sx={{ marginBottom: "40px" }}
        >
          Vérifier votre entreprise
        </Title>
        <Formik
          validationSchema={sirenSchema}
          onSubmit={handleSubmitSignup}
          initialValues={{ siren: "" }}
        >
          {({ handleSubmit, handleChange, values, errors }) => (
            <form onSubmit={handleSubmit}>
              <InputWrapper 
                id="siren"
                label="Numéro Siren"
                sx={{
                  marginBottom: "40px"
                }}
                error={errors.siren}
              >
                <Input type="number" name="siren" id="siren" onChange={handleChange} value={values.siren} />
              </InputWrapper>
              <Box sx={(theme) => ({ display: "flex", justifyContent: "center", marginBottom: theme.spacing.sm })}>
                <Button type="submit">Valider</Button>
              </Box>
              <Box sx={{ display: "flex", justifyContent: "center" }}>
                <Button variant="subtle" onClick={() => onValidate("connectwallet")}>Passer</Button>
              </Box>
            </form>
          )}
        </ Formik>
    </>
  )
}

Siren.propTypes = {
  onValidate: PropTypes.any
};

export default Siren
