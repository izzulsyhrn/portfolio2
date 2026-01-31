const loginForm = document.getElementById("loginForm");
const loginMsg = document.getElementById("loginMsg");

loginForm.addEventListener("submit", function(e){
  e.preventDefault();
  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();

  if(username === "admin" && password === "1234"){
    localStorage.setItem("adminLoggedIn", "true");
    window.location.href = "admin.html";
  } else {
    loginMsg.style.color = "red";
    loginMsg.textContent = "Invalid credentials!";
  }
});
