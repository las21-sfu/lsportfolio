/* ============================================================
   PROJECTS PAGE — JavaScript
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ---- FOLDER NAVIGATION ---- */
  document.querySelectorAll('.folder-3d:not(.folder-locked)').forEach(folder => {
    const href = folder.getAttribute('data-href');
    folder.addEventListener('click', () => {
      if (!href) return;
      folder.style.transform = 'rotateX(-20deg) rotateY(0deg) translateY(-48px) scale(1.08)';
      folder.style.filter    = 'drop-shadow(0 40px 60px rgba(37,99,235,.45))';
      setTimeout(() => { window.location.href = href; }, 300);
    });
    folder.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); folder.click(); }
    });
  });

  /* ---- 3D PARALLAX ON FOLDER ROW ---- */
  const row = document.querySelector('.folders-row');
  if (row) {
    row.addEventListener('mousemove', e => {
      const rect = row.getBoundingClientRect();
      const nx = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
      const ny = ((e.clientY - rect.top)  / rect.height - 0.5) * 2;
      row.style.transform = `rotateY(${nx * 4}deg) rotateX(${-ny * 2}deg)`;
      row.style.transition = 'transform .08s linear';
    });
    row.addEventListener('mouseleave', () => {
      row.style.transform = '';
      row.style.transition = 'transform .6s cubic-bezier(.25,.46,.45,.94)';
    });
  }

});
