let createOrder;

window.addEventListener("DOMContentLoaded", (event) => {
  console.log("DOM fully loaded and parsed");

  const urlSearchParams = new URLSearchParams(window.location.search);
  const workorder_id = urlSearchParams.get("workorder_id");

  fetch("http://localhost:3000/createOrder/" + workorder_id)
    .then((response) => response.json())
    .then((data) => {
      console.log("Success:", data);
      createOrder = data;
    })
    .catch((error) => {
      console.error("Error:", error);
    });

  const form = document.querySelector("form");
  form.addEventListener("submit", handleSubmit);

  function handleSubmit(e) {
    e.preventDefault();

    const serviceData = new FormData(e.target);

    let object = {};
    serviceData.forEach((value, key) => (object[key] = value));
    let json = JSON.stringify(object);
    console.log(json);

    const table = document.querySelector("table");
    const arr = [...table.rows].map((r) => [...r.querySelectorAll("td, th")].map((td) => td.textContent));
    console.log(arr);
  }
});

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
