// This context stores logged in user data
// and a function for logging the user out
import React, { useState, useContext } from "react";

const LoggedInUserContext = React.createContext();

export function LoggedInUserContextProvider({ children }) {
  const [loggedInUser, setLoggedInUser] = useState({
    id: 1,
    name: "Cory",
    role: "admin"
  });

  function logout() {
    setLoggedInUser(null);
  }

  return (
    <LoggedInUserContext.Provider
      value={{
        loggedInUser,
        logout
      }}
    >
      {children}
    </LoggedInUserContext.Provider>
  );
}

export function useLoggedInUserContext() {
  const context = useContext(LoggedInUserContext);
  if (!context)
    throw new Error(
      "LoggedInUserContextProvider must be declared on a parent component."
    );
  return context;
}
