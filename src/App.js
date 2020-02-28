import React, { useState, useEffect } from "react";
import Users from "./Users";
import Home from "./Home";
import Nav from "./Nav";
import ManageUser from "./Users/ManageUser";
import { Route } from "react-router-dom";
import Snackbar from "@material-ui/core/Snackbar";
import { getUsers } from "./api/userApi";
import ErrorBoundary from "./ErrorBoundary";
import { LoggedInUserContextProvider } from "./LoggedInUserContext";

function App() {
  const [users, setUsers] = useState([]);
  const [snackbar, setSnackbar] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Handle promise and store users in state
    getUsers()
      .then(setUsers)
      .finally(() => setIsLoading(false));
  }, []);

  if (isLoading) return "Loading...";

  return (
    <LoggedInUserContextProvider>
      {snackbar && (
        <Snackbar
          message={snackbar.message}
          open
          onClose={() => setSnackbar(null)}
          autoHideDuration={5000}
        />
      )}
      <Nav />
      {/* Showing 2 different ways to declare route */}
      <Route exact path="/" component={Home} />

      {/* Now if an error occurs on Users page, 
      the rest of the app will keep working */}
      <Route path="/users">
        <ErrorBoundary>
          <Users users={users} setUsers={setUsers} />
        </ErrorBoundary>
      </Route>

      <Route path="/user/:userId?">
        <ManageUser
          setSnackbar={setSnackbar}
          users={users}
          setUsers={setUsers}
        />
      </Route>
    </LoggedInUserContextProvider>
  );
}

export default App;
