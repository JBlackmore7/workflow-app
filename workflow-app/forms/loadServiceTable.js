const headers = {
  companyName: "Company Name",
  workorderType: "Type",
  date: "Date",
  details: "Details",
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

    Object.keys(headers).forEach((element) => {
      const cellElement = document.createElement("td");

      cellElement.textContent = row[element];
      rowElement.appendChild(cellElement);
    });

    tableBody.appendChild(rowElement);
  }
}

loadIntoTable("http://localhost:3000/adminInput", document.querySelector("table"));
