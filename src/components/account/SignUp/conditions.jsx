import React from "react";
import { Text, Button, Box, Title } from '@mantine/core';
import PropTypes from "prop-types";

const Conditions = ({ title, content, dbkey, onValidate, nextStep }) => {
  var retrievedObject = localStorage.getItem('userSignup')
  const userObject = JSON.parse(retrievedObject)

  const handleAccept = () => {
    userObject[dbkey] = true
    localStorage.setItem('userSignup', JSON.stringify(userObject))
    onValidate(nextStep);
  }
  return (
    <>
      <Title
        order={1}
        align="center"
        sx={{ marginBottom: "40px" }}
      >
        {title}
      </Title>
      <Box>
        <Text
        sx={{
        marginBottom: "40px"
        }}
        >
          {content}
        </Text>
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <Button onClick={handleAccept}>J&apos;accepte</Button>
        </Box>
      </Box>
    </>
  )
}

Conditions.propTypes = {
  title: PropTypes.string,
  content: PropTypes.any,
  dbkey: PropTypes.string,
  onValidate: PropTypes.any,
  nextStep: PropTypes.string
};

export default Conditions