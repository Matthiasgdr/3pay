import React from "react";
import { Box, InputWrapper, Input, Button, Text } from "@mantine/core";
import { useClipboard } from '@mantine/hooks';

const ConnexionPayment = () => {
  const clipboard = useClipboard({ timeout: 500 });

  return (
    <Box>
      <Box sx={{display: 'flex', flexDirection: 'row'}}>
        <InputWrapper label="Site Internet">
          <Input sx={{ pointerEvents: "none" }} value="1234567 00012" />
        </InputWrapper>
        <Button
          color={clipboard.copied ? 'teal' : 'blue'}
          onClick={() => clipboard.copy('123456700012')}
        >
          {clipboard.copied ? 'Copié' : 'Copier'}
        </Button>
      </Box>
      <Text>Vous devez copier cet ID dans la rubrique Plug-in de votre site, afin de pouvoir inclure le paiement  avec “nom de marque”.</Text>
    </Box>
  )
}

export default ConnexionPayment