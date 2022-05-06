import React from 'react'
import { useMoralis } from "react-moralis";

const LogoutButton = () => {
    const { logout, isAuthenticating } = useMoralis();
  
    return (
      <button
        isLoading={isAuthenticating}
        onClick={() => logout()}
        disabled={isAuthenticating}>
        Logout
      </button>
    );
};
  
export { LogoutButton }