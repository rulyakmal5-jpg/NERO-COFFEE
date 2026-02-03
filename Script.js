const logregBox = document.querySelector('.logreg-box');
const loginLink = document.querySelector('.login-link');
const registerLink = document.querySelector('.register-link');
const loginForm = document.getElementById('loginForm');
const registerForm = document.getElementById('registerForm');

registerLink.addEventListener('click', () => {
  logregBox.classList.add('active');
});

loginLink.addEventListener('click', () => {
  logregBox.classList.remove('active');
});

// ===== LOGIN LOGIC =====
loginForm.addEventListener('submit', function (e) {
  e.preventDefault();

  const email = document.getElementById('loginEmail').value;
  const password = document.getElementById('loginPassword').value;

  const savedUser = JSON.parse(localStorage.getItem('userAccount'));

  const defaultEmail = "rulyakmal52@gmail.com";
  const defaultPassword = "12345";

  if (
    (email === defaultEmail && password === defaultPassword) ||
    (savedUser && email === savedUser.email && password === savedUser.password)
  ) {
    // simpan status login
    localStorage.setItem("userLoggedIn", "true");

    // simpan nama user
    localStorage.setItem("username", savedUser?.username || "Ruly");

    alert("Login berhasil skuy ngopi!");
    window.location.href = "index.html";
  } else {
    alert("Hayohhh salah!! gak bisa ngopi loh!");
  }
});

// ===== REGISTER LOGIC =====
registerForm.addEventListener('submit', function (e) {
  e.preventDefault();

  const username = document.getElementById('regUsername').value;
  const email = document.getElementById('regEmail').value;
  const password = document.getElementById('regPassword').value;

  const userData = {
    username,
    email,
    password
  };

  localStorage.setItem('userAccount', JSON.stringify(userData));

  alert("Sign up berhasil! buruan login biar cepet ngopi.");
  logregBox.classList.remove('active');
});

