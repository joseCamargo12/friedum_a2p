// ─── Off-Market Realty — Signup form handler ──────────────────
document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('signup-form');
  const successBlock = document.getElementById('form-success');

  if (!form) return;

  form.addEventListener('submit', async function (e) {
    e.preventDefault();

    // Validate required fields
    const required = ['full_name', 'email', 'phone', 'role', 'zip', 'sms_consent', 'terms_consent'];
    for (const fieldName of required) {
      const field = form.querySelector(`[name="${fieldName}"]`);
      if (!field) continue;
      if (field.type === 'checkbox' && !field.checked) {
        alert('Please confirm both consent checkboxes to continue.');
        field.focus();
        return;
      }
      if (field.type !== 'checkbox' && !field.value.trim()) {
        alert(`Please fill in: ${field.previousElementSibling?.textContent || fieldName}`);
        field.focus();
        return;
      }
    }

    // Collect form data with consent metadata for compliance
    const formData = {
      full_name: form.full_name.value.trim(),
      email: form.email.value.trim(),
      phone: form.phone.value.trim(),
      role: form.role.value,
      zip: form.zip.value.trim(),
      sms_consent: form.sms_consent.checked,
      terms_consent: form.terms_consent.checked,
      consent_timestamp: new Date().toISOString(),
      consent_source: 'website_registration',
      user_agent: navigator.userAgent,
    };

    // TODO: replace with your n8n webhook endpoint when ready
    // For now we log it and show success
    console.log('Signup data:', formData);

    try {
      // Example: send to n8n webhook
      // await fetch('https://engine.marpicorp.com/webhook/offmarket-signup', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(formData)
      // });

      form.style.display = 'none';
      successBlock.hidden = false;
      successBlock.scrollIntoView({ behavior: 'smooth', block: 'center' });
    } catch (err) {
      alert('Something went wrong. Please try again or email admin@friedum.com');
      console.error(err);
    }
  });

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href === '#' || href.length < 2) return;
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
});
