import React from "react";
import "dayjs/locale/fr";
import { useMoralis } from "react-moralis";
import { Formik, Field } from "formik";
import { isEqual } from "lodash";
import {
  Box,
  Input,
  InputWrapper,
  Button,
  Divider,
  Title,
} from "@mantine/core";
import { DatePicker } from "@mantine/dates";
import useUser from "../../../hooks/useUser";

const Profil = () => {
  const { user } = useUser();
  const { Moralis } = useMoralis();

  const handleSubmitUser = ({
    surname,
    name,
    email,
    birthday,
    address,
    city,
    zipcode,
    country,
  }) => {
    const user = Moralis.User.current();
    user.set("name", name);
    user.set("surname", surname);
    user.set("username", email);
    user.set("birthday", birthday);
    user.set("address", address);
    user.set("city", city);
    user.set("zipcode", zipcode);
    user.set("country", country);
    user.save();
  };

  const { surname, name, email, birthday, address, city, zipcode, country } =
    user.attributes;

  const initialValues = {
    surname,
    name,
    email,
    birthday: birthday || null,
    address,
    city,
    zipcode,
    country,
  };

  return (
    <Box>
      <Formik onSubmit={handleSubmitUser} initialValues={initialValues}>
        {({ handleSubmit, values }) => {
          const hasChanged = !isEqual(values, initialValues);
          return (
            <form onSubmit={handleSubmit}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "flex-start",
                  maxWidth: "400px",
                }}
              >
                <Box sx={{ display: "flex" }}>
                  <InputWrapper
                    label="Prénom"
                    sx={(theme) => ({
                      flexGrow: "1",
                      marginBottom: theme.spacing.md,
                      marginRight: theme.spacing.md,
                    })}
                  >
                    <Field name="surname" as={Input} />
                  </InputWrapper>
                  <InputWrapper
                    label="Nom"
                    sx={(theme) => ({
                      marginBottom: theme.spacing.md,
                      flexGrow: "1",
                    })}
                  >
                    <Field name="name" as={Input} />
                  </InputWrapper>
                </Box>
                <Box sx={{ display: "flex", flexDirection: "column" }}>
                  <InputWrapper
                    label="Mail"
                    sx={(theme) => ({ marginBottom: theme.spacing.md })}
                  >
                    <Field name="email" as={Input} />
                  </InputWrapper>
                  <InputWrapper
                    label="Date de naissance"
                    sx={(theme) => ({ marginBottom: theme.spacing.md })}
                  >
                    <Field name="birthday">
                      {({ field, form }) => (
                        <DatePicker
                          locale="fr"
                          inputFormat="DD MMMM, YYYY"
                          onChange={(v) => {
                            form.setFieldValue("birthday", v);
                          }}
                          value={field.value}
                        />
                      )}
                    </Field>
                  </InputWrapper>
                </Box>
                <Divider
                  sx={(theme) => ({
                    marginTop: theme.spacing.md,
                    marginBottom: theme.spacing.md,
                  })}
                />
                <Box>
                  <Title order={3}>Adresse</Title>
                  <InputWrapper
                    label="Adresse"
                    sx={(theme) => ({ marginBottom: theme.spacing.md })}
                  >
                    <Field name="address" as={Input} />
                  </InputWrapper>
                  <InputWrapper
                    label="Pays"
                    sx={(theme) => ({ marginBottom: theme.spacing.md })}
                  >
                    <Field name="country" as={Input} />
                  </InputWrapper>
                </Box>
                <Box sx={{ display: "flex" }}>
                  <InputWrapper
                    label="Code postal"
                    sx={(theme) => ({
                      width: "100px",
                      marginRight: theme.spacing.md,
                    })}
                  >
                    <Field name="zipcode" as={Input} />
                  </InputWrapper>
                  <InputWrapper
                    label="Ville"
                    sx={(theme) => ({
                      flexGrow: "1",
                      marginBottom: theme.spacing.md,
                    })}
                  >
                    <Field name="city" as={Input} />
                  </InputWrapper>
                </Box>
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
