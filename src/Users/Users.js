import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import * as userActions from "../redux/actions/userActions";

const Users = ({ loadUsers, users, deleteUser }) => {
  const history = useHistory();
  // Using array destructuring to declare state and setter.
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadUsers().finally(() => setIsLoading(false));
  }, [loadUsers]);

  function handleDeleteUser(id) {
    deleteUser(id);
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
                <button onClick={() => history.push("/user/" + user.id)}>
                  Edit
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

// What Redux data should be injected on props in the component above?
function mapStateToProps(state) {
  return {
    users: state.users
  };
}

// What Redux actions should be injected on props in the component above?
const mapDispatchToProps = {
  loadUsers: userActions.loadUsers,
  deleteUser: userActions.deleteUser
};

export default connect(mapStateToProps, mapDispatchToProps)(Users);
