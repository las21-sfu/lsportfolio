/* ============================================================
   HOME PAGE — JavaScript
   3D folder interactions + mouse parallax
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ---- FOLDER CLICK NAVIGATION ---- */
  document.querySelectorAll('.folder-3d').forEach(folder => {
    const href = folder.getAttribute('data-href');

    // Click to navigate
    folder.addEventListener('click', () => {
      if (href) {
        // Brief "open" animation before navigating
        folder.style.transform = 'rotateX(-20deg) rotateY(0deg) translateY(-40px) scale(1.1)';
        folder.style.filter = 'drop-shadow(0 40px 60px rgba(37,99,235,.4))';
        setTimeout(() => { window.location.href = href; }, 280);
      }
    });

    // Keyboard Enter/Space
    folder.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        folder.click();
      }
    });
  });

  /* ---- 3D MOUSE PARALLAX ON DESK SCENE ---- */
  const scene  = document.querySelector('.desk-scene');
  const hero   = document.querySelector('.hero');

  if (scene && hero) {
    hero.addEventListener('mousemove', e => {
      const rect = hero.getBoundingClientRect();
      // Normalized -1 to 1
      const nx = ((e.clientX - rect.left) / rect.width  - 0.5) * 2;
      const ny = ((e.clientY - rect.top)  / rect.height - 0.5) * 2;

      // Subtle parallax tilt on whole scene
      scene.style.transform = `
        rotateY(${nx * 6}deg)
        rotateX(${-ny * 3}deg)
      `;
      scene.style.transition = 'transform .08s linear';
    });

    hero.addEventListener('mouseleave', () => {
      scene.style.transform = 'rotateY(0deg) rotateX(0deg)';
      scene.style.transition = 'transform .6s cubic-bezier(.25,.46,.45,.94)';
    });
  }

  /* ---- STAGGERED ENTRANCE ANIMATION ---- */
  // Override transition-delay on hero children for orchestrated load
  const heroItems = [
    document.querySelector('.hero-label'),
    document.querySelector('.hero-heading'),
    document.querySelector('.hero-sub'),
    document.querySelector('.hero-cta-row'),
  ].filter(Boolean);

  heroItems.forEach((el, i) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = `opacity .6s ${i * 0.12}s, transform .6s ${i * 0.12}s`;
    // Trigger
    setTimeout(() => {
      el.style.opacity = '1';
      el.style.transform = 'translateY(0)';
    }, 60);
  });

  // Desk scene fades in slightly later
  const deskScene = document.querySelector('.desk-scene');
  if (deskScene) {
    deskScene.style.opacity = '0';
    deskScene.style.transform = 'translateY(30px) perspective(900px)';
    deskScene.style.transition = 'opacity .8s .4s, transform .8s .4s cubic-bezier(.25,.46,.45,.94)';
    setTimeout(() => {
      deskScene.style.opacity = '1';
      deskScene.style.transform = 'translateY(0) perspective(900px)';
    }, 60);
  }

});
