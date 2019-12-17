export default function userReducer(state = [], action) {
  switch (action.type) {
    case "LOAD_USERS_SUCCESS":
      return action.users;
    case "DELETE_USER_SUCCESS":
      return state.filter(u => u.id !== action.userId);
    case "ADD_USER_SUCCESS":
      return [...state, action.user];
    case "EDIT_USER_SUCCESS":
      return state.map(u => (u.id === action.user.id ? action.user : u));
    default:
      // I don't care about the action passed. So just return the current state.
      return state;
  }
}
