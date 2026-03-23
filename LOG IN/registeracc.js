//register
function togglePassword() {
  const pw = document.getElementById("password");
  pw.type = pw.type === "password" ? "text" : "password";
}
function toggleConfirmPassword() {
  const pw = document.getElementById("confirmPassword");
  pw.type = pw.type === "password" ? "text" : "password";
}

// Phone validation - accept only numeric values
document.getElementById("phone").addEventListener("input", function(e) {
  this.value = this.value.replace(/[^0-9]/g, "");
});

document.getElementById("registerForm").addEventListener("submit", function(e){
  e.preventDefault();

  let valid = true;

  const first = document.getElementById("firstName").value;
  const last = document.getElementById("lastName").value;
  const email = document.getElementById("email").value;
  const phone = document.getElementById("phone").value;
  const pw = document.getElementById("password").value;
  const confirm = document.getElementById("confirmPassword").value;
  const agree = document.getElementById("agree").checked;

  // Reset errors
  document.querySelectorAll(".text-danger").forEach(el => el.textContent = "");

  if(!first){
    document.getElementById("errorFirst").textContent = "First name required";
    valid = false;
  }

  if(!last){
    document.getElementById("errorLast").textContent = "Last name required";
    valid = false;
  }

  if(!email || !email.includes("@")){
    document.getElementById("errorEmail").textContent = "Valid email required";
    valid = false;
  }
  if(phone && !/^\d+$/.test(phone)){
    document.getElementById("errorPhone").textContent = "Phone must contain only numbers";
    valid = false;
  }

  if(pw.length < 6){
    document.getElementById("errorPassword").textContent = "Minimum 6 characters";
    valid = false;
  }

  if(pw !== confirm){
    document.getElementById("errorConfirm").textContent = "Passwords do not match";
    valid = false;
  }

  if(!agree){
    document.getElementById("errorAgree").textContent = "You must agree first";
    valid = false;
  }

  if(!valid) return;

  const btn = document.getElementById("registerBtn");
  btn.textContent = "Creating Account...";
  btn.disabled = true;

  setTimeout(() => {
    alert("Account created!");
    btn.textContent = "Create Account";
    btn.disabled = false;
  }, 1200);
});