/*function logSubmit(event) {
  log.textContent = `Work Order Updated!`;
  event.preventDefault();
}

const form = document.getElementById("adminInput");
const log = document.getElementById("log");
form.addEventListener("submit", logSubmit);*/

//Get the form element by id

let createOrder = null;

window.addEventListener("DOMContentLoaded", (event) => {
  console.log("DOM fully loaded and parsed");

  const urlSearchParams = new URLSearchParams(window.location.search);
  const workorder_id = urlSearchParams.get("workorder_id");
  console.log(workorder_id);

  fetch("http://localhost:3000/createOrder/" + workorder_id)
    .then((response) => response.json())
    .then((data) => {
      console.log("Success:", data);
      createOrder = data;
    })
    .catch((error) => {
      console.error("Error:", error);
    });
});
