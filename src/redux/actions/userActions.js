import * as userApi from "../../api/userApi";

// Sychronous action creator
export function loadUsersSuccess(users) {
  return { type: "LOAD_USERS_SUCCESS", users };
}

export function deleteUserSuccess(userId) {
  return { type: "DELETE_USER_SUCCESS", userId };
}

// Thunk - async action creator
export function loadUsers() {
  return function(dispatch) {
    return userApi.getUsers().then(users => dispatch(loadUsersSuccess(users)));
  };
}

export function deleteUser(userId) {
  return function(dispatch) {
    return userApi
      .deleteUser(userId)
      .then(() => dispatch(deleteUserSuccess(userId)));
  };
}
