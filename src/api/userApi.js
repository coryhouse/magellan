const baseUrl = process.env.REACT_APP_USER_API_URL + "/users";

export function getUsers() {
  return fetch(baseUrl).then(response => {
    if (response.ok) return response.json();
    throw new Error("Bad network response.");
  });
}

export function deleteUser(id) {
  return fetch(`${baseUrl}/${id}`, {
    method: "DELETE"
  }).then(response => {
    if (response.ok) return response.json();
    throw new Error("Bad network response.");
  });
}

export function addUser(user) {
  return fetch(baseUrl, {
    method: "POST",
    headers: {
      "content-type": "application/json"
    },
    body: JSON.stringify(user)
  }).then(response => {
    if (response.ok) return response.json();
    throw new Error("Bad network response.");
  });
}