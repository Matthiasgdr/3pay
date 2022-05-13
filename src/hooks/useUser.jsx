import React, { useEffect, useState, createContext, useContext } from "react";
import { useMoralis } from "react-moralis";

export const UserContext = createContext({
  userAddress: null,
});

export const UserContextProvider = (props) => {
  const [userAddress, setUserAddress] = useState(null);
  const { user } = useMoralis();

  useEffect(() => {
    setUserAddress(user?.get("accounts"));
  }, [userAddress]);

  const value = {
    userAddress,
    setUserAddress,
  };

  return <UserContext.Provider value={value} {...props} />;
};

const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error(`useUser must be used within a UserContextProvider.`);
  }
  return context;
};

export default useUser;