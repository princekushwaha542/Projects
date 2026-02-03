// SIGNUP
function signup() {
  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();

  if (username === "" || password === "") {
    alert("All fields required");
    return;
  }

  if (password.length < 6) {
    alert("Password must be at least 6 characters");
    return;
  }

  const user = { username, password };
  localStorage.setItem("user", JSON.stringify(user));

  alert("Signup successful");
  window.location.href = "index.html";
}

// LOGIN
function login() {
  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();

  const storedUser = JSON.parse(localStorage.getItem("user"));

  if (!storedUser) {
    alert("No user found, please signup");
    return;
  }

  if (username === storedUser.username && password === storedUser.password) {
    localStorage.setItem("isLoggedIn", "true");
    window.location.href = "dashboard.html";
  } else {
    alert("Invalid credentials");
  }
}

// AUTH CHECK
function checkAuth() {
  const isLoggedIn = localStorage.getItem("isLoggedIn");
  if (!isLoggedIn) {
    window.location.href = "index.html";
  }
}

// LOGOUT
function logout() {
  localStorage.removeItem("isLoggedIn");
  window.location.href = "www.instagram.com";
}
