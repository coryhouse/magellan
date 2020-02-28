import React from "react";
import PropTypes from "prop-types";
import { deleteUser } from "../api/userApi";
import { Link, useHistory } from "react-router-dom";
import { useLoggedInUserContext } from "../LoggedInUserContext";
import { userPropType } from "../propTypes";

const Users = ({ users, setUsers }) => {
  const { loggedInUser, logout } = useLoggedInUserContext();
  const history = useHistory();
  // Using array destructuring to declare state and setter.

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
            <th>Email</th>
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
                <button onClick={() => history.push("/user/" + user.id)}>
                  Edit
                </button>
              </td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }

  return (
    <>
      <h1>Users</h1>
      {loggedInUser && (
        <h2>
          Hi {loggedInUser.name}{" "}
          <a
            href="/logout"
            onClick={event => {
              event.preventDefault();
              logout();
            }}
          >
            Logout
          </a>
        </h2>
      )}
      <Link to="/user">Add User</Link>
      {users.length === 0 ? "No users. ☹️" : userTable()}
    </>
  );
};

Users.propTypes = {
  users: PropTypes.arrayOf(userPropType).isRequired,
  setUsers: PropTypes.func.isRequired
};

Users.defaultProps = {
  users: []
};

export default Users;
