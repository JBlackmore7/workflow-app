function logSubmit(event) {
  log.textContent = `Work Order Created!`;
  event.preventDefault();
}

const form = document.getElementById("createForm");
const log = document.getElementById("log");
form.addEventListener("submit", logSubmit);
