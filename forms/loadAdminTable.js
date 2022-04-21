const headers = {
  companyName: "Company Name",
  workorderType: "Type",
  date: "Date",
  details: "Details",
  action: "Job Number",
};

async function loadIntoTable(url, table) {
  const tableHead = table.querySelector("thead");
  const tableBody = table.querySelector("tbody");
  const response = await fetch(url);
  const createOrder = await response.json();

  // Clear the table
  tableHead.innerHTML = "<tr></tr>";
  tableBody.innerHTML = "";

  // Populate the headers
  Object.values(headers).forEach((element) => {
    const headerElement = document.createElement("th");

    headerElement.textContent = element;
    tableHead.querySelector("tr").appendChild(headerElement);
  });

  // Populate the rows
  for (const row of createOrder) {
    const rowElement = document.createElement("tr");
    var jobNumber = document.createElement("input");
    jobNumber.setAttribute("type", "text");
    jobNumber.style.maxWidth = "75%";
    jobNumber.placeholder = "Enter Job Number";
    var checkMark = document.createElement("a");
    checkMark.innerHTML = "&check;";
    checkMark.onclick = function () {
      fetch("http://localhost:3000/createOrder/1", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(jobNumber),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("Success:", data);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    };
    Object.keys(headers).forEach((element) => {
      const cellElement = document.createElement("td");

      cellElement.textContent = row[element];
      rowElement.appendChild(cellElement);
      cellElement.appendChild(jobNumber);
      cellElement.appendChild(checkMark);
    });

    tableBody.appendChild(rowElement);
  }
}

loadIntoTable("http://localhost:3000/createOrder", document.querySelector("table"));
