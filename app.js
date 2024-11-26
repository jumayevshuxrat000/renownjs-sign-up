const signUpForm = document.querySelector(".sign-up-form");
const signInForm = document.querySelector(".sign-in-form");

function validateInput(fieldName, value, minLength) {
  if (!value || value.length < minLength) {
    throw `${fieldName} must be at least ${minLength} characters long.`;
  }
}

signUpForm.addEventListener("submit", (e) => {
  e.preventDefault();

  try {
    const name = signUpForm.querySelector("input[placeholder='Name']").value.trim();
    const username = signUpForm.querySelector("input[placeholder='Username']").value.trim();
    const email = signUpForm.querySelector("input[placeholder='Email']").value.trim();
    const password = signUpForm.querySelector("input[placeholder='Password']").value.trim();

    validateInput("Name", name, 1);
    validateInput("Username", username, 4);
    validateInput("Password", password, 6);

    const users = JSON.parse(localStorage.getItem("users")) || [];
    if (users.some((user) => user.username === username)) {
      throw "Username already exists!";
    }

    users.push({ name, username, email, password });
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
    const username = signInForm.querySelector("input[placeholder='Username']").value.trim();
    const password = signInForm.querySelector("input[placeholder='Password']").value.trim();

    validateInput("Username", username, 4);
    validateInput("Password", password, 6);

    const users = JSON.parse(localStorage.getItem("users")) || [];
    const user = users.find(
      (user) => user.username === username && user.password === password
    );

    if (!user) {
      throw "Invalid username or password!";
    }

    alert(`Welcome back, ${user.name}!`);
    window.location.href = "./welcomeback.html";
  } catch (error) {
    alert(error);
  }
});

const signUpBtn = document.getElementById("sign-up-btn");
const signInBtn = document.getElementById("sign-in-btn");
const container = document.querySelector(".container");

signUpBtn.addEventListener("click", () => {
  container.classList.add("sign-up-mode");
});

signInBtn.addEventListener("click", () => {
  container.classList.remove("sign-up-mode");
});

function showAllUsers() {
  const users = JSON.parse(localStorage.getItem("users")) || [];
  if (users.length === 0) {
    console.log("No users found.");
  } else {
    console.log("Registered Users:");
    users.forEach((user, index) => {
      console.log(`User ${index + 1}:`);
      console.log(`- Name: ${user.name || "N/A"}`);
      console.log(`- Username: ${user.username}`);
      console.log(`- Email: ${user.email}`);
      console.log(`- Password: ${user.password}`);
    });
  }
}

showAllUsers();

  