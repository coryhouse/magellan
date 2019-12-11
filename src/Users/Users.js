import React, { useState, useEffect } from "react";
import { getUsers, deleteUser, addUser } from "../api/userApi";
import Input from "../reusable/Input";

const Users = () => {
  // Using array destructuring to declare state and setter.
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState({
    id: null,
    name: "",
    role: ""
  });
  const [isSaving, setIsSaving] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    // Handle promise and store users in state
    getUsers()
      .then(setUsers)
      .finally(() => setIsLoading(false));
  }, []);

  function handleDeleteUser(id) {
    deleteUser(id).then(() => {
      setUsers(users.filter(user => user.id !== id));
    });
  }

  function userTable() {
    return (
      <table>
        <thead>
          <tr>
            <th></th>
            <th>Name</th>
            <th>Role</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id}>
              <td>
                <button onClick={event => handleDeleteUser(user.id)}>
                  Delete
                </button>
              </td>
              <td>{user.name}</td>
              <td>{user.role}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }

  function isValid() {
    const _errors = {};

    if (!user.name) _errors.name = "Name is required.";
    if (!user.role) _errors.role = "Role is required.";

    setErrors(_errors);

    // Are there any errors?
    return Object.keys(_errors).length === 0;
  }

  // 1. clear the form after submit
  // 2. disable the save button while save is in progress
  function handleSubmit(event) {
    event.preventDefault(); // don't post back to the server
    if (!isValid()) return;
    setIsSaving(true);
    addUser(user)
      .then(savedUser => setUsers([...users, savedUser]))
      .finally(() => {
        setUser({ name: "", role: "" });
        setIsSaving(false);
      });
  }

  function handleInputChange({ target }) {
    setUser({ ...user, [target.name]: target.value });
  }

  if (isLoading) return "Loading...";

  return (
    <>
      <h1>Users</h1>
      <form onSubmit={handleSubmit}>
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

        <input
          type="submit"
          value="Save"
          disabled={isSaving ? "disabled" : ""}
        />
      </form>
      {users.length === 0 ? "No users. ☹️" : userTable()}
    </>
  );
};

export default Users;

// Validation
// Error handling on promises
// Move to async await
