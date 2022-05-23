import React, { useState, createContext, useContext } from "react";

export const ConnexionContext = createContext();

export const ConnexionProvider = (props) => {
  const [isConnected, setIsConnected] = useState(null);

  const value = {
    isConnected,
    setIsConnected,
  };

  return <ConnexionContext.Provider value={value} {...props} />;
};

export const useConnected = () => {
  const context = useContext(ConnexionContext);
  if (context === undefined) {
    throw new Error(`Need a ConnexionContextProvider to use useConnected.`);
  }
  return context;
};

export default useConnected;
