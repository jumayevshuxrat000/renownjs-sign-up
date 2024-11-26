const sign_in_btn = document.querySelector("#sign-in-btn");
const sign_up_btn = document.querySelector("#sign-up-btn");
const container2 = document.querySelector(".container");

sign_up_btn.addEventListener('click', () => {
  container.classList.add("sign-up-mode");
});

sign_in_btn.addEventListener('click', () => {
  container.classList.remove("sign-up-mode");
});

// Selectors for Sign Up and Sign In forms
const signUpForm = document.querySelector(".sign-up-form");
const signInForm = document.querySelector(".sign-in-form");

// Sign Up form submission
signUpForm.addEventListener("submit", (e) => {
  e.preventDefault(); // Prevent form reload

  const username = signUpForm.querySelector("input[placeholder='Username']").value.trim();
  const email = signUpForm.querySelector("input[placeholder='Email']").value.trim();
  const password = signUpForm.querySelector("input[placeholder='Password']").value.trim();

  if (!username || !email || !password) {
    alert("Please fill in all fields!");
    return;
  }

  // Get existing users from localStorage or initialize as empty array
  const users = JSON.parse(localStorage.getItem("users")) || [];

  // Check if username is already taken
  if (users.some((user) => user.username === username)) {
    alert("Username already exists!");
    return;
  }

  // Add new user and save to localStorage
  users.push({ username, email, password });
  localStorage.setItem("users", JSON.stringify(users));

  alert("Sign Up successful!");
  signUpForm.reset();
});

// Sign In form submission
signInForm.addEventListener("submit", (e) => {
  e.preventDefault(); // Prevent form reload

  const username = signInForm.querySelector("input[placeholder='Username']").value.trim();
  const password = signInForm.querySelector("input[placeholder='Password']").value.trim();

  if (!username || !password) {
    alert("Please fill in all fields!");
    return;
  }

  // Get users from localStorage
  const users = JSON.parse(localStorage.getItem("users")) || [];

  // Find matching user
  const user = users.find(
    (user) => user.username === username && user.password === password
  );

  if (user) {
    // Redirect to welcome page
    window.location.href = "./welcomeback.html";
  } else {
    alert("Invalid username or password!");
  }
});

// Toggle Sign In and Sign Up panels
const signUpBtn = document.getElementById("sign-up-btn");
const signInBtn = document.getElementById("sign-in-btn");
const container = document.querySelector(".container");

signUpBtn.addEventListener("click", () => {
  container.classList.add("sign-up-mode");
});

signInBtn.addEventListener("click", () => {
  container.classList.remove("sign-up-mode");
});
