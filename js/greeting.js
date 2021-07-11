const loginForm = document.querySelector("#login-form");
const loginInput = document.querySelector("#login-form input");
const greeting = document.querySelector("#greeting");

const USERNAME_KEY = "userName";

const printGreeting = (userName) => {
  greeting.innerText = `Hello ${userName}`;
  greeting.classList.remove(HIDDEN_CLASS_NAME);
};

const onLoginSubmit = (event) => {
  event.preventDefault();
  const userName = loginInput.value;
  loginForm.classList.add(HIDDEN_CLASS_NAME);
  localStorage.setItem(USERNAME_KEY, userName);
  printGreeting(userName);
};

const savedUserName = localStorage.getItem(USERNAME_KEY);
if (savedUserName === null) {
  loginForm.classList.remove(HIDDEN_CLASS_NAME);
  loginForm.addEventListener("submit", onLoginSubmit);
} else {
  printGreeting(savedUserName);
}
