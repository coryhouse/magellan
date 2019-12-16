import React from "react";
import { NavLink } from "react-router-dom";

function Nav() {
  return (
    <nav>
      <NavLink to="/">Home</NavLink> | <NavLink to="/users">Users</NavLink>
    </nav>
  );
}

export default Nav;
