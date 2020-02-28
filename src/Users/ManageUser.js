import React, { useState, useEffect, useReducer } from "react";
import PropTypes from "prop-types";
import Input from "../reusable/Input";
import { saveUser, getUser } from "../api/userApi";
import { Redirect, useRouteMatch } from "react-router-dom";
import manageUserReducer from "./manageUserReducer";

const STATUS = {
  LOADING: "LOADING",
  ERROR: "ERROR",
  SAVING: "SAVING",
  SAVED: "SAVED",
  IDLE: "IDLE"
};

function ManageUser({ setSnackbar, users, setUsers }) {
  const [user, dispatch] = useReducer(manageUserReducer, {
    id: null,
    name: "",
    email: "",
    role: ""
  });
  const match = useRouteMatch();
  const [status, setStatus] = useState(STATUS.IDLE);
  const [errors, setErrors] = useState({});

  // Implement isLoading state. Show "loading..." until getUser call completes

  // This isn't technically necessary, but requesting data from server
  // to avoid presenting user with a stale record.
  useEffect(() => {
    // If we're editing a user
    if (match.params.userId) {
      setStatus(STATUS.LOADING);
      getUser(match.params.userId)
        .then(user => dispatch({ type: "saveUser", user: user }))
        .finally(() => setStatus(STATUS.IDLE));
    }
  }, [match.params.userId]);

  function handleInputChange({ target }) {
    dispatch({ type: "setUser", target });
  }

  function isValid() {
    const _errors = {};

    if (!user.name) _errors.name = "Name is required.";
    if (!user.email) _errors.email = "Email is required.";
    if (!user.role) _errors.role = "Role is required.";

    setErrors(_errors);

    // Are there any errors?
    return Object.keys(_errors).length === 0;
  }

  async function handleSubmit(event) {
    event.preventDefault(); // don't post back to the server
    if (!isValid()) return;
    setStatus(STATUS.SAVING);
    try {
      const savedUser = await saveUser(user);
      setStatus(STATUS.SAVED);
      if (user.id) {
        // if editing an existing user...
        setUsers(
          users.map(u => {
            // If this is the user that was just edited, replace it in array.
            if (u.id === user.id) return savedUser;
            return u;
          })
        );
      } else {
        // adding a new user
        setUsers([...users, savedUser]);
      }

      setSnackbar({
        message: "User saved"
      });
    } catch (err) {
      console.error(err);
      setStatus(STATUS.IDLE);
    }
  }

  if (status === STATUS.LOADING) return "Loading...";

  return (
    <form onSubmit={handleSubmit}>
      {status === STATUS.SAVED && <Redirect to="/users" />}
      <Input
        label="Name"
        id="name"
        name="name"
        onChange={handleInputChange}
        value={user.name}
        error={errors.name}
      />

      <Input
        label="Email"
        id="email"
        name="email"
        onChange={handleInputChange}
        value={user.email}
        error={errors.email}
      />

      <Input
        label="Role"
        id="role"
        name="role"
        onChange={handleInputChange}
        value={user.role}
        error={errors.role}
      />

      <input
        type="submit"
        value="Save"
        disabled={status === STATUS.SAVING ? "disabled" : ""}
      />
    </form>
  );
}

ManageUser.propTypes = {
  users: PropTypes.array.isRequired,
  setUsers: PropTypes.func.isRequired,
  setSnackbar: PropTypes.func.isRequired
};

export default ManageUser;
