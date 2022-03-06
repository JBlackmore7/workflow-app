fetch("http://localhost:3000/createOrder")
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    appendData(data);
  })
  .catch(function (err) {
    console.log("error: " + err);
  });
function appendData(data) {
  var mainContainer = document.getElementById("myData");
  for (var i = 0; i < data.length; i++) {
    var table = document.createElement("table");
    table.innerHTML =
      "Contact Name: " +
      data[i].contactName +
      " Contact Number: " +
      data[i].contactNumber +
      " Contact E-Mail: " +
      data[i].contactEmail +
      " Company Name: " +
      data[i].companyName +
      " Company Address: " +
      data[i].companyAddress +
      " Work Site: " +
      data[i].workSite +
      " Work Order Type: " +
      data[i].workorderType +
      " Details: " +
      data[i].details +
      " Employee Name: " +
      data[i].employeeName +
      " Date Created: " +
      data[i].date;
    mainContainer.appendChild(table);
  }
}
