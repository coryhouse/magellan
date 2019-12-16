import React, { useState } from "react";
import Users from "./Users";
import Home from "./Home";
import Nav from "./Nav";
import ManageUser from "./Users/ManageUser";
import { Route } from "react-router-dom";
import Snackbar from "@material-ui/core/Snackbar";

function App() {
  const [snackbar, setSnackbar] = useState(null);

  return (
    <>
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

      <Route path="/users">
        <Users />
      </Route>

      <Route path="/user">
        <ManageUser setSnackbar={setSnackbar} />
      </Route>
    </>
  );
}

export default App;
