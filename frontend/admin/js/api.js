export const API_BASE = "http://localhost:5000";

export function getToken() {
  return localStorage.getItem("adminToken");
}

export async function apiFetch(path, options = {}) {
  const token = getToken();

  return fetch(API_BASE + path, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      Authorization: token ? `Bearer ${token}` : "",
      ...options.headers,
    },
  });
}
