import React, { useState } from "react";
import Input from "../reusable/Input";
import { addUser } from "../api/userApi";
import { Redirect } from "react-router-dom";
import Snackbar from "@material-ui/core/Snackbar";

function ManageUser() {
  const [user, setUser] = useState({
    id: null,
    name: "",
    role: ""
  });
  const [isSaving, setIsSaving] = useState(false);
  const [errors, setErrors] = useState({});
  const [saveCompleted, setSaveCompleted] = useState(false);

  function handleInputChange({ target }) {
    setUser({ ...user, [target.name]: target.value });
  }

  function isValid() {
    const _errors = {};

    if (!user.name) _errors.name = "Name is required.";
    if (!user.role) _errors.role = "Role is required.";

    setErrors(_errors);

    // Are there any errors?
    return Object.keys(_errors).length === 0;
  }

  function handleSubmit(event) {
    event.preventDefault(); // don't post back to the server
    if (!isValid()) return;
    setIsSaving(true);
    addUser(user)
      .then(() => {
        setSaveCompleted(true);
      })
      .catch(error => {
        console.error(error);
      });
  }

  return (
    <form onSubmit={handleSubmit}>
      {saveCompleted && <Redirect to="/users" />}
      <Snackbar message={<span>Sorry, the save failed.</span>} open={true} />
      <Input
        label="Name"
        id="name"
        name="name"
        onChange={handleInputChange}
        value={user.name}
        error={errors.name}
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

export default ManageUser;
