import React from "react";
import Users from "./Users";
import Home from "./Home";
import Nav from "./Nav";
import ManageUser from "./Users/ManageUser";
import { Route } from "react-router-dom";

function App() {
  return (
    <>
      <Nav />
      {/* Showing 2 different ways to declare route */}
      <Route exact path="/" component={Home} />

      <Route path="/users">
        <Users />
      </Route>

      <Route path="/user">
        <ManageUser />
      </Route>
    </>
  );
}

export default App;
