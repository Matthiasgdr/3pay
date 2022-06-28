import React from "react";
import { Box, Button, Text } from "@mantine/core";
import { useClipboard } from '@mantine/hooks';
import { Copy } from 'tabler-icons-react';

const ConnexionPayment = () => {
  const clipboard = useClipboard({ timeout: 500 });

  return (
    <Box>
      <Box sx={{display: 'flex', flexDirection: 'column'}}>
        <Text sx={(theme) => ({ marginBottom: theme.spacing.sm })}>Site Internet</Text>
        <Box sx={(theme) => ({ display: 'flex', flexDirection: 'row', border: '2px solid' + theme.colors.grey[5], maxWidth: 397, justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' })}>
          <Text component="span" sx={{ pointerEvents: "none", padding: "0 16px" }}>1234567 00012</Text>
          <Button
            sx={{ background: "none", padding: "0 12px", "&:hover": { background: "none" }}}
            onClick={() => clipboard.copy('123456700012')}
          >
            <Copy
              size={48}
              strokeWidth={2}
              color="#9392B0"
              style={{ width: 24, height: 24 }}
            />
          </Button>
        </Box>
      </Box>
      <Text sx={{ maxWidth: 378 }}>Vous devez copier cet ID dans la rubrique Plug-in de votre site, afin de pouvoir inclure le paiement  avec “nom de marque”.</Text>
    </Box>
  )
}

export default ConnexionPayment