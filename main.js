const overlay = document.getElementById("overlay");

function openModal() {
  if (!sessionStorage.getItem("modalShown")) {
    modal.classList.add("active");
    overlay.classList.add("active");

    overlay.addEventListener("click", () => {
      const modals = document.querySelectorAll(".modal.active");
      modals.forEach((modal) => {
        closeModal(modal);
      });
    });

    sessionStorage.setItem("modalShown", "true");
  }
}

openModal();
