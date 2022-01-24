var seq = 0;

function myFunction() {
  seq += 1;

  var value = "";

  if (seq < 10) {
    value = "000" + seq;
  } else if (seq < 100) {
    value = "00" + seq;
  } else if (seq < 1000) {
    value = "0" + seq;
  } else {
    value = seq;
  }

  document.getElementById("wo-button").value = value;
}
