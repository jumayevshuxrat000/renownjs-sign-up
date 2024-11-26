const signUpForm = document.querySelector("#sign-up-form");
const signInForm = document.querySelector("#sign-in-form");
const container = document.querySelector(".container");
const signUpBtn = document.getElementById("sign-up-btn");
const signInBtn = document.getElementById("sign-in-btn");

function validateInput(fieldName, value, minLength) {
  if (!value || value.trim().length < minLength) {
    throw `${fieldName} must be at least ${minLength} characters long.`;
  }
}

signUpBtn.addEventListener("click", () => {
  container.classList.add("sign-up-mode");
});

signInBtn.addEventListener("click", () => {
  container.classList.remove("sign-up-mode");
});

signUpForm.addEventListener("submit", (e) => {
  e.preventDefault();

  try {
    const username = signUpForm.querySelector("#signup-username").value.trim();
    const email = signUpForm.querySelector("#signup-email").value.trim();
    const password = signUpForm.querySelector("#signup-password").value.trim();

    validateInput("Username", username, 4);
    validateInput("Email", email, 1);
    validateInput("Password", password, 6);

    const users = JSON.parse(localStorage.getItem("users")) || [];

    if (users.some((user) => user.username === username)) {
      throw "Username already exists!";
    }

    users.push({ username, email, password });
    localStorage.setItem("users", JSON.stringify(users));

    alert("Sign Up successful!");
    signUpForm.reset();
  } catch (error) {
    alert(error);
  }
});
signInForm.addEventListener("submit", (e) => {
  e.preventDefault();

  try {
    const username = signInForm.querySelector("#signin-username").value.trim();
    const password = signInForm.querySelector("#signin-password").value.trim();

    validateInput("Username", username, 4);
    validateInput("Password", password, 6);

    const users = JSON.parse(localStorage.getItem("users")) || [];
    const user = users.find(
      (user) => user.username === username && user.password === password
    );

    if (!user) {
      throw "Invalid username or password!";
    }

    alert(`Welcome back, ${user.username}!`);
    window.location.href = "./welcomeback.html";
  } catch (error) {
    alert(error);
  }
});

