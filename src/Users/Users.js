import React, { useState, useEffect } from "react";
import { getUsers, deleteUser } from "../api/userApi";
import { Link } from "react-router-dom";

const Users = () => {
  // Using array destructuring to declare state and setter.
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

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

  if (isLoading) return "Loading...";

  return (
    <>
      <h1>Users</h1>
      <Link to="/user">Add User</Link>
      {users.length === 0 ? "No users. ☹️" : userTable()}
    </>
  );
};

export default Users;

// Validation
// Error handling on promises
// Move to async await
