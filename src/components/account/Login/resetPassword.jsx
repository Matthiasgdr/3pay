import React from "react";
import { useMoralis } from "react-moralis";

const resetPassword = (email) => {
    const { Moralis } = useMoralis();

    //getting email from email input
    if (email) {
      Moralis.User.requestPasswordReset(email)
        .then(() => {
          alert("Successfully Password Email Sent");
          // Password reset request was sent successfully
        })
        .catch((error) => {
          // Show the error message somewhere
          alert("Error: " + error.code + " " + error.message);
        });
    } else {
      alert("Enter email first");
    }

    return (
        <button colorScheme="green" size="lg" onClick={resetPassword}>
            Request Password change for{" "}
            {email ? email : "[Please enter email in field]"}
        </button>
    )
};

export default resetPassword
