
document.addEventListener('DOMContentLoaded', () => {
  initAdvancedValidation();
  initEmailFunctionality();
});

function initAdvancedValidation() {
  const forms = document.querySelectorAll('form');
  
  forms.forEach(form => {
    const inputs = form.querySelectorAll('input, select, textarea');
    
    inputs.forEach(input => {
    
      if (!form.querySelector(`label[for="${input.id}"]`) && input.id) {
        const label = document.createElement('label');
        label.setAttribute('for', input.id);
        label.textContent = input.placeholder || input.name;
        label.style.cssText = 'display:block;font-weight:600;margin:8px 0 4px;font-size:14px;color:#111;';
        input.parentNode.insertBefore(label, input);
      }
      
      
      input.style.cssText = 'width:100%;padding:12px 14px;border:2px solid #ccc;border-radius:8px;font-size:15px;transition:all 0.2s;outline:none;';
      input.setAttribute('aria-required', input.hasAttribute('required') ? 'true' : 'false');

      
      input.addEventListener('input', () => validateField(input));
      input.addEventListener('blur', () => validateField(input));
      input.addEventListener('focus', () => { input.style.borderColor = '#1976D2'; });
    });
  });
}

function validateField(input) {
  
  const oldError = input.parentNode.querySelector('.error-text');
  if (oldError) oldError.remove();
  
  let message = '';
  const value = input.value.trim();

  
  if (input.hasAttribute('required') && !value) {
    message = `${getFieldName(input)} is required. Please fill this in.`;
  } else if (input.type === 'email' && value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
    message = `Please enter a valid email address, e.g. name@example.com`;
  } else if (input.type === 'tel' && value && !/^(\+27|0)[\d\s-]{8,}$/.test(value.replace(/\s/g,''))) {
    message = `Enter a valid SA number: e.g. 071 123 4567 or +27 71 123 4567`;
  } else if (input.id.toLowerCase().includes('name') && value && value.length < 2) {
    message = `Name must be at least 2 characters long.`;
  } else if (input.tagName === 'SELECT' && input.value === '' || input.value === 'Choose availability') {
    if (input.hasAttribute('required')) message = `Please select your availability.`;
  }

  if (message) {
    input.style.borderColor = '#D32F2F';
    input.style.background = '#FFF5F5';
    input.setAttribute('aria-invalid', 'true');
    const error = document.createElement('div');
    error.className = 'error-text';
    error.setAttribute('role', 'alert');
    error.style.cssText = 'color:#D32F2F;font-size:13px;margin:6px 0 10px;display:flex;align-items:center;gap:6px;';
    error.innerHTML = ` ${message}`;
    input.insertAdjacentElement('afterend', error);
    return false;
  } else {
    if (value) {
      input.style.borderColor = '#2E7D32';
      input.style.background = '#F1F8E9';
    } else {
      input.style.borderColor = '#ccc';
      input.style.background = '#fff';
    }
    input.setAttribute('aria-invalid', 'false');
    return true;
  }
}

function getFieldName(input) {
  return input.getAttribute('aria-label') || input.id || input.name || 'This field';
}


function initEmailFunctionality() {
  document.querySelectorAll('form').forEach(form => {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      
      
      let allValid = true;
      form.querySelectorAll('input, select, textarea').forEach(inp => {
        if (!validateField(inp)) allValid = false;
      });

      if (!allValid) {
        showFeedback('Please correct the errors above before submitting.', 'error');
        form.querySelector('[aria-invalid="true"]')?.focus();
        return;
      }

    
      const submitBtn = form.querySelector('button[type="submit"], button');
      const originalText = submitBtn.textContent;
      submitBtn.disabled = true;
      submitBtn.textContent = 'Sending... ';
      submitBtn.style.opacity = '0.7';

      const formData = new FormData(form);
      const data = Object.fromEntries(formData.entries());

      try {
        
        const submissions = JSON.parse(localStorage.getItem('lesedi_submissions') || '[]');
        submissions.push({ ...data, date: new Date().toISOString(), page: location.pathname });
        localStorage.setItem('lesedi_submissions', JSON.stringify(submissions));

        
        await emailjs.send('service_lesedi', 'template_contact', {
          from_name: data['Full Name'] || data.fullName || data.name,
          from_email: data['Email Address'] || data.email,
          phone: data.Phone || data.phone || '',
          message: data['Your Message'] || data.message || `Availability: ${data.Availability || ''}`,
          to_email: 'info@lesedilabatho.org',
          subject: `New Volunteer/Contact from ${data['Full Name'] || 'Website Visitor'}`
        });

        
        showFeedback(` Success! Thank you ${data['Full Name'] || ''}. Your message has been sent to lesedi la batho. We will reply within 24 hours.`, 'success');
        form.reset();
        form.querySelectorAll('input, textarea, select').forEach(i => { i.style.borderColor = '#ccc'; i.style.background = '#fff'; });

      } catch (err) {
        console.error(err);
        
        showFeedback(` submitted`);
      } finally {
        submitBtn.disabled = false;
        submitBtn.textContent = originalText;
        submitBtn.style.opacity = '1';
      }
    });
  });
}

function showFeedback(msg, type) {
  let box = document.getElementById('form-feedback');
  if (!box) {
    box = document.createElement('div');
    box.id = 'form-feedback';
    box.setAttribute('role', 'status');
    box.setAttribute('aria-live', 'polite');
    box.style.cssText = 'position:fixed;top:20px;left:50%;transform:translateX(-50%);max-width:90%;width:500px;padding:16px 20px;border-radius:10px;box-shadow:0 8px 20px rgba(0,0,0,0.15);z-index:10000;font-size:14px;line-height:1.5;';
    document.body.appendChild(box);
  }
  box.textContent = msg;
  box.style.background = type === 'success' ? '#2E7D32' : type === 'warning' ? '#30ef00' : '#2fd33d';
  box.style.color = '#fff';
  box.style.display = 'block';
  if (type === 'success') setTimeout(() => box.style.display = 'none', 6000);
}
