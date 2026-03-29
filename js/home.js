/* ============================================================
   HOME PAGE — JavaScript
   Live clock · staggered hero entrance
   ============================================================ */

document.addEventListener("DOMContentLoaded", () => {
  /* ---- LIVE CLOCK (Burnaby / Vancouver time) ---- */
  const clockEl = document.getElementById("hero-clock");

  function updateClock() {
    if (!clockEl) return;
    clockEl.textContent = new Date().toLocaleTimeString("en-CA", {
      timeZone: "America/Vancouver",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
  }

  updateClock();
  setInterval(updateClock, 1000);

  /* ---- STAGGERED HERO ENTRANCE ---- */
  // The .reveal + IntersectionObserver in main.js handles most elements.
  // These are the left-column items we want to sequence with precise delays
  // on first load (they're already in view, so the observer fires immediately).
  const heroSequence = document.querySelectorAll(".hero-left .reveal");
  heroSequence.forEach((el, i) => {
    el.style.transitionDelay = i * 0.1 + "s";
  });

  // Right column cards stagger after left column settles
  const heroCards = document.querySelectorAll(".hero-right .reveal");
  heroCards.forEach((el, i) => {
    el.style.transitionDelay = 0.4 + i * 0.12 + "s";
  });
});
