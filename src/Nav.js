import React from "react";
import { NavLink } from "react-router-dom";

function Nav() {
  const style = {
    color: "orange"
  };

  return (
    <nav>
      <NavLink activeStyle={style} to="/" exact>
        Home
      </NavLink>{" "}
      |{" "}
      <NavLink activeStyle={style} to="/users">
        Users
      </NavLink>
    </nav>
  );
}

export default Nav;
