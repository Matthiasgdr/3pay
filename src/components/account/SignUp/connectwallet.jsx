import React from "react";
import PropTypes from "prop-types";
import { useMoralis } from "react-moralis"
import { Title, Box, Text, Button } from "@mantine/core";
import { Link } from "react-router-dom";

import SignUpButton from "../../WalletLinking/signup";

const ConnectWallet = ({ onValidate }) => {
  const { Moralis } = useMoralis();
  var retrievedObject = localStorage.getItem('userSignup')
  const userObject = JSON.parse(retrievedObject)

  const user = new Moralis.User()
  user.set("name", userObject.name)
  user.set("surname", userObject.surname)
  user.set("username", userObject.username)
  user.set("email", userObject.email)
  user.set("password", userObject.password)
  user.set("rgpd", userObject.rgpd)
  user.set("cg", userObject.cg)
  user.signUp()

  return (
    <>
      <Title
        order={1}
        align="center"
        sx={(theme) => ({ marginBottom: theme.spacing.lg })}
      >
        Connecter mon wallet
      </Title>
      <SignUpButton onConnect={onValidate} newUser={false} />
      <Text sx={(theme) => ({ marginBottom: theme.spacing.sm })} align="center">
        Pas encore de wallet ?{" "}
        <Link to="create-wallet">Me créer un wallet</Link>
      </Text>
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Button variant="subtle" onClick={() => onValidate("ending")}>
          Passer
        </Button>
      </Box>
    </>
  );
};

ConnectWallet.propTypes = {
  onValidate: PropTypes.any,
};

export default ConnectWallet;
