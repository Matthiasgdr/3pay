import React from "react";
import { useMoralis } from "react-moralis";
import { Text, Button, Box, Title } from '@mantine/core';
import PropTypes from "prop-types";

const Conditions = ({ title, content, dbkey, onValidate, nextStep }) => {
    const { Moralis } = useMoralis();
    const currentUser = Moralis.User.current();

    const handleAccept = () => {
        if(currentUser) {
          currentUser.set(dbkey, true);
          currentUser.save();
          onValidate(nextStep);
        } else {
          alert("Error: session ended");
        }
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