import { generateBillID } from "./utils/utils.js";
import { openModal, closeModal } from "./utils/ui.js";

const modal = document.getElementById("modal");
const newBillBtn = document.querySelector(".new-bill");
const cancelBtn = document.querySelector(".cancel");
const form = document.getElementById("new-account-form");
const billList = document.getElementById("bill-list");

newBillBtn.addEventListener("click", () => {
  openModal(modal);
});
cancelBtn.addEventListener("click", () => {
  closeModal(modal);
});

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const generatedID = generateBillID();
  const billDescription = form["bill-description"].value;
  const billType = form["bill-type"].value;
  const billAmount = form["bill-amount"].value;
  const BilldueDate = form["bill-due-date"].value;

  // ===== CRIAR CARD ========
  const card = document.createElement("div");
  card.classList.add("invoice-card");

  card.innerHTML = `
      <p class="bill-id">${generatedID}</p>
    <p class="bill-due-date">Vencimento ${new Date(
      BilldueDate
    ).toLocaleDateString("pt-BR")}</p>
    <p class="bill-description">${billDescription}</p>
    <p class="bill-amount">R$ ${Number(billAmount).toFixed(2)}</p>
    <div class="bill-type ${billType === "payable" ? "pendente" : "pago"}">
      ${billType === "receivable" ? "pendente" : "recebido"}
    </div>
  `;

  billList.appendChild(card);

  closeModal(modal);
  form.reset();
});
