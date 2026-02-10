const BASE_URL =
  window.location.hostname === "localhost" ||
  window.location.hostname === "127.0.0.1"
    ? "http://localhost:5000"
    : "https://novus-7h23.onrender.com";

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
      ...(options.headers || {}),
    },
  });
}

export default BASE_URL;
