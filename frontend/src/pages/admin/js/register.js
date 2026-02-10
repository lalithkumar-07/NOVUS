import BASE_URL from "./api.js";

window.submitRegistration = async function () {
  const formData = {
    teamName: document.getElementById("teamName").value,
    college: document.getElementById("college").value,
    department: document.getElementById("department").value,

    leader: {
      name: document.getElementById("leaderName").value,
      email: document.getElementById("leaderEmail").value,
      phone: document.getElementById("leaderPhone").value,
      roll: document.getElementById("leaderRoll").value,
    },

    members: [],
  };

  const res = await fetch(`${BASE_URL}/api/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formData),
  });

  const data = await res.json();

  if (!res.ok) return alert(data.message);

  // save for payment page
  localStorage.setItem("teamId", data._id);

  location.href = "payment.html";
};
