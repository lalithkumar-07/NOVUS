const BASE_URL = "http://localhost:5000";

export function getToken() {
  return localStorage.getItem("adminToken");
}

export async function apiFetch(path, options = {}) {
  const token = getToken();

  return fetch(BASE_URL + path, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options.headers,
    },
  });
}

export default BASE_URL;
