import BASE_URL from "./api.js";

const teamId = localStorage.getItem("teamId");

if (!teamId) {
  alert("Session expired. Register again.");
  location.href = "register.html";
}

window.submitPayment = async function () {
  const upiId = document.getElementById("upiId").value;
  const transactionId = document.getElementById("txnId").value;

  const res = await fetch(
    `${BASE_URL}/api/payment/${teamId}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        method: "upi",
        upiId,
        transactionId,
      }),
    }
  );

  const data = await res.json();

  if (!res.ok) return alert(data.message);

  alert("Payment submitted! Await admin approval.");
};
