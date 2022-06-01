import React from "react";
import { Box, Input, InputWrapper } from "@mantine/core";
import useUser from "../../../hooks/useUser";

const Settings = () => {
  const { user } = useUser();
  console.log("LOG ~ file: Profil.jsx ~ line 11 ~ Settings ~ user", user);

  return (
    <Box sx={{ display: "flex" }}>
      <InputWrapper
        label="Prénom"
        sx={(theme) => ({ marginRight: theme.spacing.md })}
      >
        <Input></Input>
      </InputWrapper>
      <InputWrapper
        label="Nom"
        sx={(theme) => ({ marginRight: theme.spacing.md })}
      >
        <Input></Input>
      </InputWrapper>
      <InputWrapper
        label="Mail"
        sx={(theme) => ({ marginRight: theme.spacing.md })}
      >
        <Input></Input>
      </InputWrapper>
    </Box>
  );
};

export default Settings;
