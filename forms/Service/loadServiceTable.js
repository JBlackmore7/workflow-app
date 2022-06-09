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
  const createOrder = await response.json();
  localWorkorderRef = createOrder;

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
    if (row.jobNumber != "") {
      const rowElement = document.createElement("tr");
      let serviceWork = document.createElement("a");
      serviceWork.innerHTML = "Start Job";
      serviceWork.setAttribute("workorder_id", row.id);
      serviceWork.href = "serviceForm.html?workorder_id=" + row.id;
      Object.keys(headers).forEach((element) => {
        const cellElement = document.createElement("td");
        cellElement.textContent = row[element];
        rowElement.appendChild(cellElement);
        cellElement.appendChild(serviceWork);
      });

      tableBody.appendChild(rowElement);
    }
  }
}

loadIntoTable("http://localhost:3000/createOrder", document.querySelector("table"));
