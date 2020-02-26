import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Input from "../reusable/Input";
import { saveUser, getUser } from "../api/userApi";
import { Redirect, useRouteMatch } from "react-router-dom";

function ManageUser({ setSnackbar }) {
  const match = useRouteMatch();
  const [user, setUser] = useState({
    id: null,
    name: "",
    email: "",
    role: ""
  });
  const [isSaving, setIsSaving] = useState(false);
  const [errors, setErrors] = useState({});
  const [saveCompleted, setSaveCompleted] = useState(false);

  useEffect(() => {
    // If we're editing a user
    if (match.params.userId) {
      getUser(match.params.userId).then(user => setUser(user));
    }
  }, [match.params.userId]);

  function handleInputChange({ target }) {
    setUser({ ...user, [target.name]: target.value });
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

  function handleSubmit(event) {
    event.preventDefault(); // don't post back to the server
    if (!isValid()) return;
    setIsSaving(true);
    saveUser(user)
      .then(() => {
        setSaveCompleted(true);
        setSnackbar({
          message: "User saved"
        });
      })
      .catch(error => {
        setSnackbar({
          message: "Sorry, the save failed."
        });
        setIsSaving(false);
        console.error(error);
      });
  }

  return (
    <form onSubmit={handleSubmit}>
      {saveCompleted && <Redirect to="/users" />}
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

      <input type="submit" value="Save" disabled={isSaving ? "disabled" : ""} />
    </form>
  );
}

ManageUser.propTypes = {
  setSnackbar: PropTypes.func.isRequired
};

export default ManageUser;
