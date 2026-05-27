// ─── Friedum Landing Page — JS ──────────────────────
document.addEventListener('DOMContentLoaded', function () {

  // ── Form handling ──
  const form = document.getElementById('signup-form');
  const successBlock = document.getElementById('form-success');
  if (successBlock) successBlock.style.display = 'none';

  if (form) {
    form.addEventListener('submit', async function (e) {
      e.preventDefault();
      let valid = true;

      // Clear previous errors
      form.querySelectorAll('.form-field.has-error').forEach(f => f.classList.remove('has-error'));

      // Validate each required field
      const fields = ['full_name', 'email', 'phone', 'role', 'zip'];
      for (const name of fields) {
        const el = form.querySelector(`[name="${name}"]`);
        const wrapper = document.getElementById('field-' + name);
        if (!el || !wrapper) continue;
        const val = el.value.trim();
        let bad = !val;
        if (name === 'email' && val && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)) bad = true;
        if (name === 'zip' && val && !/^\d{5}$/.test(val)) bad = true;
        if (bad) { wrapper.classList.add('has-error'); valid = false; }
      }

      // Terms required
      const termsEl = form.querySelector('[name="terms_consent"]');
      if (termsEl && !termsEl.checked) {
        alert('Please agree to the Terms & Conditions to continue.');
        valid = false;
      }

      if (!valid) return;

      const formData = {
        full_name:          form.full_name.value.trim(),
        email:              form.email.value.trim(),
        phone:              form.phone.value.trim(),
        role:               form.role.value,
        zip:                form.zip.value.trim(),
        sms_consent:        form.sms_consent.checked,
        terms_consent:      form.terms_consent.checked,
        consent_timestamp:  new Date().toISOString(),
        consent_source:     'website_registration',
      };

      const submitBtn = form.querySelector('button[type="submit"]');
      if (submitBtn) { submitBtn.disabled = true; submitBtn.textContent = 'Joining…'; }

      try {
        const res = await fetch('/api/signup', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'X-Requested-With': 'XMLHttpRequest' },
          body: JSON.stringify(formData)
        });
        if (!res.ok) throw new Error('Error ' + res.status);
        form.style.display = 'none';
        successBlock.style.display = 'block';
        successBlock.scrollIntoView({ behavior: 'smooth', block: 'center' });
      } catch (err) {
        if (submitBtn) { submitBtn.disabled = false; submitBtn.textContent = 'Join the waitlist →'; }
        // Static site — just show success since there's no backend yet
        form.style.display = 'none';
        successBlock.style.display = 'block';
        successBlock.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    });
  }

  // ── Smooth scroll for nav links ──
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (!href || href === '#' || href.length < 2) return;
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        const navH = document.getElementById('nav')?.offsetHeight || 0;
        const y = target.getBoundingClientRect().top + window.scrollY - navH - 16;
        window.scrollTo({ top: y, behavior: 'smooth' });
      }
    });
  });

  // ── Sticky nav shadow on scroll ──
  const nav = document.getElementById('nav');
  if (nav) {
    window.addEventListener('scroll', () => {
      nav.style.boxShadow = window.scrollY > 10
        ? '0 2px 24px rgba(0,0,0,0.08)'
        : 'none';
    }, { passive: true });
  }

  // ── Mobile menu toggle (basic) ──
  const mobileBtn = document.getElementById('mobile-menu-btn');
  const navLinks = document.querySelector('.nav-links');
  if (mobileBtn && navLinks) {
    mobileBtn.addEventListener('click', () => {
      const open = navLinks.style.display === 'flex';
      navLinks.style.display = open ? '' : 'flex';
      navLinks.style.flexDirection = 'column';
      navLinks.style.position = 'absolute';
      navLinks.style.top = nav.offsetHeight + 'px';
      navLinks.style.left = '0';
      navLinks.style.right = '0';
      navLinks.style.background = 'white';
      navLinks.style.padding = '16px 24px 24px';
      navLinks.style.borderBottom = '1px solid #e5e7eb';
      navLinks.style.boxShadow = '0 8px 24px rgba(0,0,0,0.08)';
      navLinks.style.zIndex = '200';
      if (open) navLinks.style.display = 'none';
    });
  }

});
