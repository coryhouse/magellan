export default function reducer(state, action) {
  switch (action.type) {
    case "saveUser":
      return action.user; // what we return becomes the new state
    case "setUser":
      return { ...state, [action.target.name]: action.target.value };
    default:
      throw new Error("Unknown action type: " + action.type);
  }
}
