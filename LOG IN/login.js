function togglePassword() {
  const pw = document.getElementById("password");
  pw.type = pw.type === "password" ? "text" : "password";
}

document.getElementById("loginForm").addEventListener("submit", function(e){
  e.preventDefault();

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const error = document.getElementById("errorBox");

  if(!email || !password){
    error.textContent = "Please fill in all fields.";
    error.classList.remove("d-none");
    return;
  }

  alert("Login successful!");
});

function handleSearch(e){
  e.preventDefault();
  const q = document.getElementById("searchInput").value;
  alert("Search: " + q);
}

