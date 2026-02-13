import BASE_URL from "./api.js";

window.login = async function () {
  try {
    const username = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    const res = await fetch(`${BASE_URL}/api/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    const data = await res.json();

    if (!res.ok) {
      document.getElementById("error").innerText = data.message;
      return;
    }

    localStorage.setItem("adminToken", data.token);

    location.href = "dashboard.html";

  } catch (err) {
    document.getElementById("error").innerText = "Server not reachable";
  }
};
