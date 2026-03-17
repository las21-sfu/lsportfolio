/* ============================================================
   CONTACT PAGE — JavaScript
   Form submission handling (Formspree-ready)
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  const form    = document.getElementById('contact-form');
  const success = document.getElementById('form-success');

  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const btn = form.querySelector('.form-submit');
    btn.textContent = 'Sending…';
    btn.disabled = true;
    btn.style.opacity = '.7';

    // Check if Formspree ID has been set
    // To enable real submissions: replace YOUR_FORM_ID in contact.html
    // with your actual Formspree form ID (e.g. "xpzgabcd")
    const action = form.getAttribute('action');
    const isRealEndpoint = action && !action.includes('YOUR_FORM_ID');

    if (isRealEndpoint) {
      // Real Formspree submission
      try {
        const data = new FormData(form);
        const res  = await fetch(action, {
          method: 'POST',
          body: data,
          headers: { Accept: 'application/json' },
        });

        if (res.ok) {
          showSuccess();
        } else {
          btn.textContent = 'Something went wrong — try emailing directly.';
          btn.disabled = false;
          btn.style.opacity = '1';
        }
      } catch {
        btn.textContent = 'Network error — please email directly.';
        btn.disabled = false;
        btn.style.opacity = '1';
      }
    } else {
      // Demo mode: just show success after short delay
      // Remove this block once Formspree is wired up
      setTimeout(showSuccess, 800);
    }

    function showSuccess() {
      form.style.opacity = '0';
      form.style.transition = 'opacity .3s';
      setTimeout(() => {
        form.style.display = 'none';
        success.style.display = 'block';
        success.style.opacity = '0';
        success.style.transition = 'opacity .4s';
        requestAnimationFrame(() => { success.style.opacity = '1'; });
      }, 300);
    }
  });

  /* ---- Subtle 3D mouse-tilt on form card ---- */
  const card = document.querySelector('.contact-form-card');
  const wrap = document.querySelector('.contact-form-wrap');

  if (card && wrap) {
    wrap.addEventListener('mousemove', e => {
      const rect = wrap.getBoundingClientRect();
      const nx   = ((e.clientX - rect.left) / rect.width  - 0.5) * 2;
      const ny   = ((e.clientY - rect.top)  / rect.height - 0.5) * 2;
      card.style.transform  = `rotateY(${nx * 4}deg) rotateX(${-ny * 3}deg) translateY(-4px)`;
      card.style.transition = 'transform .06s linear, box-shadow .06s';
    });
    wrap.addEventListener('mouseleave', () => {
      card.style.transform  = 'rotateY(-2deg) rotateX(1deg)';
      card.style.transition = 'transform .5s cubic-bezier(.25,.46,.45,.94), box-shadow .5s';
    });
  }

});
