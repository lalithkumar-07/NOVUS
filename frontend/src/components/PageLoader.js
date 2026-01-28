export function showPageLoader() {
  const loader = document.createElement("div");

  loader.id = "pageLoader";
  loader.className =
    "fixed inset-0 bg-darkbg flex items-center justify-center z-[9999]";

  loader.innerHTML = `
    <div class="flex flex-col items-center gap-4">
      <img src="../../public/logo.png"
           class="w-24 animate-spin-slow" />
      <p class="text-gray-400">NOVUS</p>
    </div>
  `;

  document.body.appendChild(loader);
}

export function hidePageLoader() {
  setTimeout(() => {
    document.getElementById("pageLoader")?.remove();
  }, 500);
}
