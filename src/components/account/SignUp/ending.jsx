import React from 'react'
import { Text, Title, Button, Box } from '@mantine/core';
import { Link } from 'react-router-dom'

const EndingSignUp = () => {
  return (
    <>
        <Box sx={{ display: "flex", justifyContent: "center" }}>
            <Title sx={{ marginBottom: "32px"}}>Merci !</Title>
        </Box>
        <Box sx={{ display: "flex", flexDirection: "column" }}>
            <Text align="center" sx={{ marginBottom: "32px" }}>Nous verifions actuellement vos informations. Vous pouvez commencer à explorer l’outil Invo !</Text>
            <Box sx={{ display: "flex", justifyContent: "center" }}>
                <Button component={Link} to="/">
                    Commencer
                </Button>
            </Box>
        </Box>
    </>
  )
}

export default EndingSignUp