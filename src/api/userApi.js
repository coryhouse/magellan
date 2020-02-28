const baseUrl = process.env.REACT_APP_USER_API_URL + "/users";

export async function getUser(userId) {
  const response = await fetch(baseUrl + "/" + userId);
  if (response.ok) return response.json();
  throw new Error("Bad network response.");
}

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

export async function saveUser(user) {
  const response = await fetch(user.id ? baseUrl + "/" + user.id : baseUrl, {
    method: user.id ? "PUT" : "POST",
    headers: {
      "content-type": "application/json"
    },
    body: JSON.stringify(user)
  });
  if (response.ok) return response.json();
  throw new Error("Bad network response.");
}
