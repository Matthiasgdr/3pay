import React from "react";
import { Link } from "react-router-dom";
import { Formik } from "formik";
import {
  InputWrapper,
  Input,
  PasswordInput,
  Checkbox,
  Text,
  Title,
  Button,
  Box,
} from "@mantine/core";
import * as Yup from "yup";
import PropTypes from "prop-types";

const SignUp = ({ onValidate }) => {
  const SignupSchema = Yup.object().shape({
    name: Yup.string().min(1, "Trop court!").required("Champs requis"),
    surname: Yup.string().min(1, "Trop court!").required("Champs requis"),
    email: Yup.string().email("E-mail invalide").required("Champs requis"),
    password: Yup.string().min(6, "Trop Court!").required("Champs requis"),
  });

  const handleSubmitSignup = async ({ name, surname, email, password }) => {
    const userObject = {
      name: name,
      surname: surname,
      username: email,
      email: email,
      password: password
    }
    localStorage.setItem('userSignup', JSON.stringify(userObject))
    onValidate("rgpd")
  };

  return (
    <>
      <Title order={1} align="center" sx={{ marginBottom: "40px" }}>
        Créer votre compte
      </Title>
      <Formik
        validationSchema={SignupSchema}
        onSubmit={handleSubmitSignup}
        initialValues={{ name: "", surname: "", email: "", password: "" }}
      >
        {({ handleSubmit, handleChange, values, errors, touched }) => (
          <form onSubmit={handleSubmit}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: "32px",
              }}
            >
              <InputWrapper
                id="name"
                label="Nom"
                sx={{
                  width: "47%",
                }}
                error={touched.name && errors.name}
              >
                <Input
                  type="text"
                  name="name"
                  id="name"
                  onChange={handleChange}
                  value={values.name}
                />
              </InputWrapper>
              <InputWrapper
                id="surname"
                label="Prénom"
                sx={{
                  width: "47%",
                }}
                error={touched.surname && errors.surname}
              >
                <Input
                  type="text"
                  name="surname"
                  id="surname"
                  onChange={handleChange}
                  value={values.surname}
                />
              </InputWrapper>
            </Box>
            <InputWrapper
              id="email"
              label="Email"
              sx={{ marginBottom: "32px" }}
              error={touched.email && errors.email}
            >
              <Input
                type="email"
                name="email"
                id="email"
                onChange={handleChange}
                value={values.email}
              />
            </InputWrapper>
            <Box sx={{ marginBottom: "32px" }}>
              <PasswordInput
                label="Mot de passe"
                name="password"
                id="password"
                onChange={handleChange}
                value={values.password}
                error={touched.password && errors.password}
              />
              <Text size="xs">Minimum 6 character</Text>
            </Box>
            <Checkbox
              sx={{
                marginBottom: "40px",
              }}
              size="lg"
              label="Je certifie avoir 18 ans ou plus et j’accepte le Contrat d’utilisateur et la Politique de confidentialité"
            />
            <Box sx={{ display: "flex", justifyContent: "center" }}>
              <Button type="submit">Créer mon compte</Button>
            </Box>
          </form>
        )}
      </Formik>
      <Box
        sx={(theme) => ({ textAlign: "center", marginTop: theme.spacing.md })}
      >
        <Text>{"J'ai déjà un compte."}</Text>
        <Text variant="link" component={Link} to="/login" underline>
          {"Je me connecte"}
        </Text>
      </Box>
    </>
  );
};

SignUp.propTypes = {
  onValidate: PropTypes.any,
};

export default SignUp;
