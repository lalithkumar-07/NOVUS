const BASE_URL =
  window.location.hostname === "localhost"
    ? "http://localhost:5000"
    : "https://novus-7h23.onrender.com";

export default BASE_URL;

/* authenticated fetch */
export async function apiFetch(path, options = {}) {
  return fetch(BASE_URL + path, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${localStorage.getItem("adminToken")}`,
      ...(options.headers || {})
    }
  });
}
