import React, { useEffect, useState, createContext, useContext } from "react";
import { useMoralis } from "react-moralis";

export const UserContext = createContext(null);

export const UserContextProvider = (props) => {
  const [user, setUser] = useState(null);
  const { Moralis, serverUrl, appId, user: moralisUser } = useMoralis();

  useEffect(() => {
    Moralis.start({ serverUrl, appId });
    const currentUser = Moralis.User.current();
    setUser(currentUser);
  }, [moralisUser]);

  const value = {
    user,
    setUser,
  };

  return <UserContext.Provider value={value} {...props} />;
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error(`useUser must be used within a UserContextProvider.`);
  }
  return context;
};

export default useUser;
