import { API_BASE } from "./api.js";

window.login = async function () {
  const username = document.getElementById("email").value; // using email box as username
  const password = document.getElementById("password").value;

  const res = await fetch(`${API_BASE}/api/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });

  const data = await res.json();

  if (!res.ok) {
    alert(data.message);
    return;
  }

  localStorage.setItem("adminToken", data.token);
  window.location.href = "dashboard.html";
};
