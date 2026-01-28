export function loadNavbar() {
  const nav = document.createElement("header");

  nav.innerHTML = `
<header class="fixed w-full z-50 bg-darkbg/90 backdrop-blur border-b border-white/10">

  <div class="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">

    <!-- LOGO -->
    <a href="Home.html" class="flex items-center gap-3">
      <img src="../../public/logo.png" class="h-10" />
      <span class="text-neon font-bold tracking-wide hidden sm:block">
        NOVUS
      </span>
    </a>

    <!-- DESKTOP -->
    <nav class="hidden md:flex gap-8 font-medium">
      <a href="Home.html" class="hover:text-neon">Home</a>
      <a href="Register.html" class="hover:text-neon">Register</a>
      <a href="Rules.html" class="hover:text-neon">Rules</a>
    </nav>

    <a href="Register.html"
      class="hidden md:block bg-neon text-black px-5 py-2 rounded-lg font-semibold">
      Hackathon Register
    </a>

    <!-- MOBILE -->
    <button id="menuBtn" class="md:hidden text-2xl">☰</button>
  </div>

  <div id="mobileMenu"
    class="hidden bg-darkbg border-t border-white/10 px-6 py-6 flex flex-col gap-6 md:hidden">
    <a href="Home.html">Home</a>
    <a href="Register.html">Register</a>
    <a href="Rules.html">Rules</a>
  </div>

</header>
`;

  document.body.prepend(nav);

  document.getElementById("menuBtn").onclick = () =>
    document.getElementById("mobileMenu").classList.toggle("hidden");
}
