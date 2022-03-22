function send(e, form) {
  e.preventDefault();
  let formData = new FormData(form);

  const plainFormData = Object.fromEntries(formData.entries());
  const formDataJsonString = JSON.stringify(plainFormData);

  const fetchOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: formDataJsonString,
  };
  fetch(form.action, fetchOptions);

  console.log("We send post asynchronously (AJAX)");
}
