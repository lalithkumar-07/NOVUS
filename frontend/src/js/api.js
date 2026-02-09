const BASE_URL =
  window.location.hostname === "localhost"
    ? "http://localhost:5000"
    : "https://YOUR-BACKEND-URL.onrender.com";

export default BASE_URL;
