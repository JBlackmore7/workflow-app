const headers = {
  companyName: "Company Name",
  workorderType: "Type",
  date: "Date",
  details: "Details",
  action: "Job Number",
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
    if (row.jobNumber == "") {
      const rowElement = document.createElement("tr");
      let jobNumber = document.createElement("input");
      jobNumber.setAttribute("type", "text");
      jobNumber.style.maxWidth = "75%";
      jobNumber.placeholder = "Enter Job Number";
      let checkMark = document.createElement("a");
      checkMark.innerHTML = "&#x2714;";
      checkMark.className = "checkMark";
      checkMark.setAttribute("workorder_id", row.id);
      checkMark.onclick = function (event) {
        let jobNum = event.currentTarget.previousElementSibling;
        let wo = localWorkorderRef.find((elem) => elem.id == event.currentTarget.getAttribute("workorder_id"));
        wo.jobNumber = jobNum.value;
        fetch("http://localhost:3000/createOrder/" + row.id, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(wo),
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
}

loadIntoTable("http://localhost:3000/createOrder", document.querySelector("table"));
