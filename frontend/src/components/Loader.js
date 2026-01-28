export function showLoader(text = "Processing...") {
  const div = document.createElement("div");

  div.id = "globalLoader";
  div.className =
    "fixed inset-0 bg-darkbg/80 flex items-center justify-center z-[999]";

  div.innerHTML = `
<div class="text-center">
  <div class="h-12 w-12 border-4 border-neon border-t-transparent rounded-full animate-spin mx-auto"></div>
  <p class="mt-4 text-gray-300">${text}</p>
</div>
`;

  document.body.appendChild(div);
}

export function hideLoader() {
  document.getElementById("globalLoader")?.remove();
}
