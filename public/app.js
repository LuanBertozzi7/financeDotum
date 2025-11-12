const modal = document.getElementById("modal");
const newBillBtn = document.querySelector(".new-bill");
const cancelBtn = document.querySelector(".cancel");
const form = document.getElementById("new-account-form");

// abrir modal
newBillBtn.addEventListener("click", () => {
  modal.style.display = "flex";
});
// fechar modal
cancelBtn.addEventListener("click", () => {
  modal.style.display = "none";
});

// enviar form
form.addEventListener("submit", (event) => {
  event.preventDefault();

  const data = {
    description: form.description.value,
    type: form.type.value,
    value: parseFloat(form.value.value),
    due: form.due.value,
  };

  console.log("Nova conta: ", data);

  // fechar modal, depois de salvo
  modal.style.display = "none";
  form.reset();
});
