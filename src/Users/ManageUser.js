import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import * as userActions from "../redux/actions/userActions";
import Input from "../reusable/Input";
import { Redirect, useRouteMatch } from "react-router-dom";

function ManageUser({ setSnackbar, users, loadUsers, saveUser }) {
  const match = useRouteMatch();
  const [user, setUser] = useState({
    id: null,
    name: "",
    role: ""
  });
  const [isSaving, setIsSaving] = useState(false);
  const [errors, setErrors] = useState({});
  const [saveCompleted, setSaveCompleted] = useState(false);

  useEffect(() => {
    // If we're editing a user
    if (match.params.userId) {
      // Has the Redux store been loaded with users yet?
      if (users.length === 0) {
        loadUsers();
      } else {
        setUser(users.find(u => u.id === Number(match.params.userId)));
      }
    }
  }, [loadUsers, match.params.userId, users]);

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

function mapStateToProps(state) {
  return {
    users: state.users
  };
}

const mapDispatchToProps = {
  loadUsers: userActions.loadUsers,
  saveUser: userActions.saveUser
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageUser);
