import React from "react";
import { useMoralis } from "react-moralis";
import { Formik, Field } from "formik";
import { isEqual } from "lodash";
import { Box, Input, InputWrapper, Button } from "@mantine/core";
import useUser from "../../../hooks/useUser";

const Profil = () => {
  const { user } = useUser();
  const { Moralis } = useMoralis();
  const handleSubmitUser = ({ surname, name, email }) => {
    const user = Moralis.User.current();
    user.set("name", name);
    user.set("surname", surname);
    user.set("username", email);
    user.set("email", email);
    user.save();
  };

  const { surname, name, email } = user.attributes;
  const initialValues = { surname, name, email };

  return (
    <Box>
      <Formik onSubmit={handleSubmitUser} initialValues={initialValues}>
        {({ handleSubmit, values }) => {
          const hasChanged = !isEqual(values, initialValues);
          return (
            <form onSubmit={handleSubmit}>
              <Box sx={{ display: "flex" }}>
                <InputWrapper
                  label="Prénom"
                  sx={(theme) => ({ marginRight: theme.spacing.md })}
                >
                  <Field name="surname" as={Input} />
                </InputWrapper>
                <InputWrapper
                  label="Nom"
                  sx={(theme) => ({ marginRight: theme.spacing.md })}
                >
                  <Field name="name" as={Input} />
                </InputWrapper>
                <InputWrapper
                  label="Mail"
                  sx={(theme) => ({ marginRight: theme.spacing.md })}
                >
                  <Field name="email" as={Input} />
                </InputWrapper>
              </Box>
              {hasChanged && (
                <Button
                  sx={(theme) => ({ marginTop: theme.spacing.md })}
                  type="submit"
                >
                  Sauvegarder mon profil
                </Button>
              )}
            </form>
          );
        }}
      </Formik>
    </Box>
  );
};

export default Profil;
