const headers = {
  companyName: "Company Name",
  workorderType: "Type",
  date: "Date",
  details: "Details",
  jobNumber: "Job Number",
  action: "Select",
};
var localWorkorderRef = [];

async function loadIntoTable(url, table) {
  const tableHead = table.querySelector("thead");
  const tableBody = table.querySelector("tbody");
  const response = await fetch(url);
  const completeOrder = await response.json();
  localWorkorderRef = completeOrder;

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
  for (const row of completeOrder) {
    const rowElement = document.createElement("tr");
    let history = document.createElement("button");
    history.innerHTML = "View";
    history.setAttribute("workorder_id", row.id);
    history.onclick = showModal;
    let h1 = document.getElementById("modal-header");
    h1.innerHTML = "Work Order #" + row.id;
    Object.keys(headers).forEach((element) => {
      const cellElement = document.createElement("td");
      cellElement.textContent = row[element];
      rowElement.appendChild(cellElement);
      cellElement.appendChild(history);
    });

    tableBody.appendChild(rowElement);
  }

  // Modal Configuring
  function showModal() {
    document.getElementById("modal").style.display = "block";
    document.getElementById("companyName").innerHTML =
      "Company Name: " + localWorkorderRef.find((e) => e.name === "companyName");
  }

  let closeButton = document.getElementById("closeModal");
  closeButton.innerHTML = "&#10006";
}

loadIntoTable("http://localhost:3000/completeOrder", document.querySelector("table"));
