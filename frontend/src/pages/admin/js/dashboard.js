import { apiFetch } from "./api.js";

const tableBody = document.getElementById("teamsTable");

if (!localStorage.getItem("adminToken")) {
  location.href = "login.html";
}

async function loadTeams() {
  const res = await apiFetch("/api/admin/teams");

  if (!res.ok) {
    localStorage.removeItem("adminToken");
    alert("Unauthorized — login again");
    location.href = "login.html";
    return;
  }

  const teams = await res.json();

  tableBody.innerHTML = "";

  teams.forEach(t => {
    const paid = t.payment?.verified;

    const tr = document.createElement("tr");

    tr.innerHTML = `
      <td>${t.teamName}</td>
      <td>${t.college}</td>
      <td>${t.department}</td>
      <td>${t.leader?.name || "-"}</td>
      <td>${paid ? "✅ Paid" : "❌ Pending"}</td>
      <td>${t.payment?.transactionId || "-"}</td>
      <td>${t.payment?.method || "-"}</td>

      <td class="space-x-3">

  ${
    paid
      ? `<span class="text-green-400">Verified</span>`
      : `
        <button
          onclick="verifyTeam('${t._id}')"
          class="text-green-400 underline">
          Verify UPI
        </button>

        <button
          onclick="markCash('${t._id}')"
          class="text-yellow-400 underline">
          Cash
        </button>
      `
  }

  <button
    onclick="deleteTeam('${t._id}')"
    class="text-red-400 underline ml-2">
    Delete
  </button>

</td>
    `;

    tableBody.appendChild(tr);
  });
}

window.verifyTeam = async function (id) {
  if (!confirm("Verify UPI payment for this team?")) return;

  const res = await apiFetch(`/api/admin/verify/${id}`, {
    method: "PUT",
  });

  const data = await res.json();
  alert(data.message);

  loadTeams();
};

window.markCash = async function (id) {
  if (!confirm("Mark this team as paid by CASH?")) return;

  const res = await apiFetch(`/api/admin/cash/${id}`, {
    method: "PUT",
  });

  const data = await res.json();
  alert(data.message);

  loadTeams();
};
window.deleteTeam = async function (id) {

  if (!confirm("Are you sure you want to permanently delete this team? This cannot be undone.")) 
    return;

  const res = await apiFetch(`/api/admin/team/${id}`, {
    method: "DELETE",
  });

  const data = await res.json();
  alert(data.message);

  loadTeams();
};

loadTeams();
