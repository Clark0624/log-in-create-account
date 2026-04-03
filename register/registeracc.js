// Toggle Password Visibility
function togglePassword() {
  const pw = document.getElementById("password");
  const icon = event.target.closest('.toggle-pwd').querySelector('i');
  if (pw.type === "password") {
    pw.type = "text";
    icon.classList.remove('bi-eye');
    icon.classList.add('bi-eye-slash');
  } else {
    pw.type = "password";
    icon.classList.remove('bi-eye-slash');
    icon.classList.add('bi-eye');
  }
}

function toggleConfirmPassword() {
  const pw = document.getElementById("confirmPassword");
  const icon = event.target.closest('.toggle-pwd').querySelector('i');
  if (pw.type === "password") {
    pw.type = "text";
    icon.classList.remove('bi-eye');
    icon.classList.add('bi-eye-slash');
  } else {
    pw.type = "password";
    icon.classList.remove('bi-eye-slash');
    icon.classList.add('bi-eye');
  }
}

// Check Password Strength
function checkPasswordStrength() {
  const password = document.getElementById("password").value;
  const strengthBar = document.getElementById("strengthBar");
  const strengthLabel = document.getElementById("strengthLabel");
  
  let strength = 0;
  const requirements = {
    length: password.length >= 8,
    uppercase: /[A-Z]/.test(password),
    number: /[0-9]/.test(password)
  };
  
  // Update requirement indicators
  updateRequirement('req1', requirements.length);
  updateRequirement('req2', requirements.uppercase);
  updateRequirement('req3', requirements.number);
  
  // Calculate strength
  if (requirements.length) strength++;
  if (requirements.uppercase) strength++;
  if (requirements.number) strength++;
  
  // Update strength bar
  strengthBar.className = 'strength-bar';
  if (strength === 0) {
    strengthBar.classList.add('weak');
    strengthLabel.textContent = 'Weak';
    strengthLabel.style.color = '#ef4444';
  } else if (strength === 1 || strength === 2) {
    strengthBar.classList.add('medium');
    strengthLabel.textContent = 'Medium';
    strengthLabel.style.color = '#f59e0b';
  } else {
    strengthBar.classList.add('strong');
    strengthLabel.textContent = 'Strong';
    strengthLabel.style.color = '#22c55e';
  }
  
  // Update form progress
  updateFormProgress();
}

function updateRequirement(id, met) {
  const req = document.getElementById(id);
  if (met) {
    req.classList.add('met');
    req.classList.remove('bi-dash-circle');
    req.classList.add('bi-check-circle-fill');
  } else {
    req.classList.remove('met');
    req.classList.remove('bi-check-circle-fill');
    req.classList.add('bi-dash-circle');
  }
}

// Update Form Progress
function updateFormProgress() {
  const firstName = document.getElementById("firstName").value;
  const lastName = document.getElementById("lastName").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const confirmPassword = document.getElementById("confirmPassword").value;
  const agree = document.getElementById("agree").checked;
  
  let completed = 0;
  if (firstName) completed++;
  if (lastName) completed++;
  if (email && email.includes("@")) completed++;
  if (password.length >= 8) completed++;
  if (confirmPassword === password && password.length >= 8) completed++;
  if (agree) completed++;
  
  const progress = (completed / 6) * 100;
  document.getElementById("formProgress").style.width = progress + "%";
}

// Input validation - Real-time feedback
document.getElementById("firstName").addEventListener("input", function() {
  updateInputValidation(this);
  updateFormProgress();
});

document.getElementById("lastName").addEventListener("input", function() {
  updateInputValidation(this);
  updateFormProgress();
});

document.getElementById("email").addEventListener("input", function() {
  if (this.value.includes("@")) {
    updateInputValidation(this, true);
  } else {
    updateInputValidation(this, false);
  }
  updateFormProgress();
});

document.getElementById("password").addEventListener("input", function() {
  checkPasswordStrength();
});

document.getElementById("confirmPassword").addEventListener("input", function() {
  updateFormProgress();
  if (this.value === document.getElementById("password").value && this.value.length >= 8) {
    updateInputValidation(this, true);
  } else if (this.value.length > 0) {
    updateInputValidation(this, false);
  }
});

// Phone validation - accept only numeric values
document.getElementById("phone").addEventListener("input", function(e) {
  this.value = this.value.replace(/[^0-9]/g, "");
  updateFormProgress();
});

document.getElementById("agree").addEventListener("change", function() {
  updateFormProgress();
});

function updateInputValidation(input, isValid = null) {
  if (isValid === null) {
    isValid = input.value.trim().length > 0;
  }
  
  if (isValid && input.value.trim().length > 0) {
    input.classList.add('is-valid');
    input.classList.remove('is-invalid');
  } else if (input.value.trim().length > 0) {
    input.classList.add('is-invalid');
    input.classList.remove('is-valid');
  } else {
    input.classList.remove('is-valid', 'is-invalid');
  }
}

// Form Submission
document.getElementById("registerForm").addEventListener("submit", function(e){
  e.preventDefault();

  let valid = true;

  const first = document.getElementById("firstName").value.trim();
  const last = document.getElementById("lastName").value.trim();
  const email = document.getElementById("email").value.trim();
  const phone = document.getElementById("phone").value;
  const pw = document.getElementById("password").value;
  const confirm = document.getElementById("confirmPassword").value;
  const agree = document.getElementById("agree").checked;

  // Reset errors
  document.querySelectorAll(".text-danger").forEach(el => el.textContent = "");

  if(!first){
    document.getElementById("errorFirst").textContent = "First name required";
    updateInputValidation(document.getElementById("firstName"), false);
    valid = false;
  }

  if(!last){
    document.getElementById("errorLast").textContent = "Last name required";
    updateInputValidation(document.getElementById("lastName"), false);
    valid = false;
  }

  if(!email || !email.includes("@")){
    document.getElementById("errorEmail").textContent = "Valid email required";
    updateInputValidation(document.getElementById("email"), false);
    valid = false;
  }

  if(phone && !/^\d+$/.test(phone)){
    document.getElementById("errorPhone").textContent = "Phone must contain only numbers";
    valid = false;
  }

  if(pw.length < 8){
    document.getElementById("errorPassword").textContent = "Minimum 8 characters required";
    updateInputValidation(document.getElementById("password"), false);
    valid = false;
  }

  if(pw !== confirm){
    document.getElementById("errorConfirm").textContent = "Passwords do not match";
    updateInputValidation(document.getElementById("confirmPassword"), false);
    valid = false;
  }

  if(!agree){
    document.getElementById("errorAgree").textContent = "You must agree to Terms and Privacy Policy";
    valid = false;
  }

  if(!valid) return;

  const btn = document.getElementById("registerBtn");
  const originalHtml = btn.innerHTML;
  btn.innerHTML = '<i class="bi bi-hourglass-split"></i> Creating Account...';
  btn.disabled = true;

  setTimeout(() => {
    btn.innerHTML = '<i class="bi bi-check-circle"></i> Account Created!';
    btn.classList.remove('btn-primary');
    btn.classList.add('btn-success');
    
    setTimeout(() => {
      window.location.href = "../landing/index.html";
    }, 1500);
  }, 1500);
});