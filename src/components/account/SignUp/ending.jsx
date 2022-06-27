import React from 'react'
import { Text, Title, Button, Box } from '@mantine/core'
import { Link } from 'react-router-dom'
import PropTypes from "prop-types"

const EndingSignUp = ({ onFinish }) => {
	localStorage.setItem('userSignup', {})
  return (
    <>
			<Box sx={{ display: "flex", justifyContent: "center" }}>
				<Title sx={{ marginBottom: "32px"}}>Merci !</Title>
			</Box>
			<Box sx={{ display: "flex", flexDirection: "column" }}>
				<Text align="center" sx={{ marginBottom: "32px" }}>Nous verifions actuellement vos informations. Vous pouvez commencer à explorer l’outil Invo !</Text>
				<Box sx={{ display: "flex", justifyContent: "center" }}>
					<Button component={Link} onClick={() => onFinish("signup")} to="/">
						Commencer
					</Button>
				</Box>
			</Box>
    </>
  )
}

EndingSignUp.propTypes = {
	onFinish: PropTypes.any
};

export default EndingSignUp