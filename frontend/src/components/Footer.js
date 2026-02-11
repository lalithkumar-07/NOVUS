export function loadFooter() {
  const footer = document.createElement("footer");

  footer.innerHTML = `
<footer class="border-t border-white/10 py-10 text-center mt-20">
  <p class="text-gray-400">
    © 2026 THE NOVUS • Hackathon Portal
  </p>
</footer>
`;

  document.body.appendChild(footer);
}
