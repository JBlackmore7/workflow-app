let createOrder;

const urlSearchParams = new URLSearchParams(window.location.search);
const workorder_id = urlSearchParams.get("workorder_id");

window.addEventListener("DOMContentLoaded", (event) => {
  console.log("DOM fully loaded and parsed");

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

/*
let formData = new FormData(serviceWork);
const formElem = document.querySelector("form");

formElem.addEventListener("submit", (e) => {
  e.preventDefault();

  fetch("http://localhost:3000/createOrder/" + workorder_id, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(Object.fromEntries(formData.entries())),
  });
});
*/

function submitForm(event) {
  // Prevent the form from submitting.
  event.preventDefault();
  // Set url for submission and collect data.
  const url = "http://localhost:3000/createOrder/" + workorder_id;
  const formData = new FormData(event.target);
  // Build the data object.
  const data = {};
  formData.forEach((value, key) => (data[key] = value));
  // Log the data.
  console.log(data);
}

function addRows() {
  var table = document.getElementById("materials");
  var rowCount = table.rows.length;
  var cellCount = table.rows[0].cells.length;
  var row = table.insertRow(rowCount);
  for (var i = 0; i < cellCount; i++) {
    var cell = "cell" + i;
    cell = row.insertCell(i);
    var copyCell = document.getElementById("col" + i).innerHTML;
    cell.innerHTML = copyCell;
  }
}
function deleteRows() {
  var table = document.getElementById("materials");
  var rowCount = table.rows.length;
  if (rowCount > "2") {
    var row = table.deleteRow(rowCount - 1);
    rowCount--;
  } else {
    alert("There should be at least one row");
  }
}
