/* ============================================================
   LARAINE SIM PORTFOLIO — SHARED JAVASCRIPT
   Handles: custom cursor, scroll reveal, mobile nav, active nav
   ============================================================ */

document.addEventListener("DOMContentLoaded", () => {
  /* ---- CUSTOM CURSOR ---- */
  const dot = document.querySelector(".cursor-dot");
  const ring = document.querySelector(".cursor-ring");

  if (dot && ring) {
    let rx = 0,
      ry = 0; // ring position (lerped)
    let mx = 0,
      my = 0; // mouse position

    document.addEventListener("mousemove", (e) => {
      mx = e.clientX;
      my = e.clientY;
      // Dot snaps instantly
      dot.style.left = mx + "px";
      dot.style.top = my + "px";
    });

    // Ring follows with lerp for smooth lag
    (function lerp() {
      rx += (mx - rx) * 0.15;
      ry += (my - ry) * 0.15;
      ring.style.left = rx + "px";
      ring.style.top = ry + "px";
      requestAnimationFrame(lerp);
    })();

    // Expand ring on interactive elements
    const interactables = document.querySelectorAll(
      "a, button, .folder-card, .project-card, input, textarea, [data-hover]"
    );
    interactables.forEach((el) => {
      el.addEventListener("mouseenter", () => ring.classList.add("hovered"));
      el.addEventListener("mouseleave", () => ring.classList.remove("hovered"));
    });

    // Hide on leave
    document.addEventListener("mouseleave", () => {
      dot.style.opacity = "0";
      ring.style.opacity = "0";
    });
    document.addEventListener("mouseenter", () => {
      dot.style.opacity = "1";
      ring.style.opacity = "1";
    });
  }

  /* ---- SCROLL REVEAL ---- */
  const revealEls = document.querySelectorAll(".reveal");
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add("visible");
          observer.unobserve(e.target); // fire once
        }
      });
    },
    { threshold: 0.12 }
  );
  revealEls.forEach((el) => observer.observe(el));

  /* ---- MOBILE NAV TOGGLE ---- */
  const toggle = document.querySelector(".nav-toggle");
  const links = document.querySelector(".nav-links");
  if (toggle && links) {
    toggle.addEventListener("click", () => {
      links.classList.toggle("open");
    });
  }

  /* ---- ACTIVE NAV LINK ---- */
  const path = window.location.pathname.replace(/\/$/, "") || "/";
  document.querySelectorAll(".nav-links a").forEach((a) => {
    const href = a.getAttribute("href").replace(/\/$/, "") || "/";
    if (
      href === path ||
      (path !== "/" && path.endsWith(href) && href !== "/")
    ) {
      a.classList.add("active");
    }
  });

  /* ---- STAGGER REVEAL DELAYS ---- */
  // Add incremental delays to siblings with .stagger-child
  document.querySelectorAll(".stagger-group").forEach((group) => {
    group.querySelectorAll(".stagger-child").forEach((child, i) => {
      child.style.transitionDelay = i * 0.1 + "s";
    });
  });
});
