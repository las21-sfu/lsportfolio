/* ============================================================
   PROJECTS PAGE — JavaScript
   Handles: folder nav, 3D parallax, inline row preview
   ============================================================ */

document.addEventListener("DOMContentLoaded", () => {
  /* ---- FOLDER NAVIGATION ---- */
  document
    .querySelectorAll(".folder-3d:not(.folder-locked)")
    .forEach((folder) => {
      const href = folder.getAttribute("data-href");
      folder.addEventListener("click", () => {
        if (!href) return;
        folder.style.transform =
          "rotateX(-20deg) rotateY(0deg) translateY(-48px) scale(1.08)";
        folder.style.filter = "drop-shadow(0 40px 60px rgba(37,99,235,.45))";
        setTimeout(() => {
          window.location.href = href;
        }, 300);
      });
      folder.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          folder.click();
        }
      });
    });

  /* ---- 3D PARALLAX ON FOLDER ROW ---- */
  const folderRow = document.querySelector(".folders-row");
  if (folderRow) {
    folderRow.addEventListener("mousemove", (e) => {
      const rect = folderRow.getBoundingClientRect();
      const nx = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
      const ny = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
      folderRow.style.transform = `rotateY(${nx * 4}deg) rotateX(${
        -ny * 2
      }deg)`;
      folderRow.style.transition = "transform .08s linear";
    });
    folderRow.addEventListener("mouseleave", () => {
      folderRow.style.transform = "";
      folderRow.style.transition =
        "transform .6s cubic-bezier(.25,.46,.45,.94)";
    });
  }

  /* ---- INLINE ROW PREVIEW ---- */
  /*
        Reads data-preview-color and (optionally) data-preview-img from each
        .project-row, then wires up the .project-row-preview-inner panel.
    
        To add a real image to a row later, just add:
          data-preview-img="images/your-image.jpg"
        to the <a class="project-row"> element — no JS changes needed.
      */

  document.querySelectorAll(".project-row").forEach((row) => {
    const panel = row.querySelector(".project-row-preview-inner");
    if (!panel) return;

    const color = row.getAttribute("data-preview-color") || "var(--blue-mid)";
    const imgSrc = row.getAttribute("data-preview-img") || null;

    // Apply accent background
    panel.style.background = color;

    // Inject real image if provided
    if (imgSrc) {
      const img = document.createElement("img");
      img.src = imgSrc;
      img.alt = "";
      panel.appendChild(img);
    }

    // Append the yellow corner label
    const corner = document.createElement("div");
    corner.className = "preview-corner";
    corner.textContent = "View project";
    panel.appendChild(corner);
  });
});
