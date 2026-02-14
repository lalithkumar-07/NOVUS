import { apiFetch } from "./api.js";
if (!localStorage.getItem("adminToken")) {
  location.href = "login.html";
}

const table = document.getElementById("foodTable");
const totalsDiv = document.getElementById("totals");

async function loadFood() {
  const res = await apiFetch("/api/admin/food-report");
  const data = await res.json();

  // totals
 document.getElementById("totalMembers").innerText = data.totals.totalMembers;
document.getElementById("totalVeg").innerText = data.totals.totalVeg;
document.getElementById("totalNonVeg").innerText = data.totals.totalNonVeg;


  // table
  data.teams.forEach(t => {
    const tr = document.createElement("tr");

    tr.innerHTML = `
      <td class="p-2">${t.teamName}</td>
      <td class="p-2">${t.leader}</td>
      <td class="p-2">${t.total}</td>
      <td class="p-2 text-green-400">${t.veg}</td>
      <td class="p-2 text-yellow-400">${t.nonveg}</td>
    `;

    table.appendChild(tr);
  });
}

loadFood();
