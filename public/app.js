import bill from "./utils/utils.js";
import { openModal, closeModal } from "./utils/ui.js";

const modal = document.getElementById("modal");
const newBillBtn = document.querySelector(".new-bill");
const cancelBtn = document.querySelector(".cancel");
const form = document.getElementById("new-account-form");
const billList = document.getElementById("bill-list");

function renderBillCard(billData) {
  const card = document.createElement("div");
  card.classList.add("invoice-card");

  const billType = billData.type;
  const statusClass = billType === "payable" ? "pendente" : "pago";
  const statusText = billType === "payable" ? "A Pagar" : "A Receber";

  card.innerHTML = `
    <p class="bill-id">${billData.id}</p>
    <p class="bill-due-date">Vencimento ${new Date(
      billData.dueDate
    ).toLocaleDateString("pt-BR")}</p>
    <p class="bill-description">${billData.description}</p>
    <p class="bill-amount">R$ ${Number(billData.amount).toFixed(2)}</p>
    <div class="bill-type ${statusClass}">
      ${statusText}
    </div>
  `;

  billList.appendChild(card);
}


bill.load();

newBillBtn.addEventListener("click", () => {
  openModal(modal);
});
cancelBtn.addEventListener("click", () => {
  closeModal(modal);
});

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const generatedID = bill.generateID();
  const billDescription = form["bill-description"].value;
  const billType = form["bill-type"].value;
  const billAmount = form["bill-amount"].value;
  const billDueDate = form["bill-due-date"].value;

  const billModel = {
    id: generatedID,
    description: billDescription,
    type: billType,
    amount: Number(billAmount),
    dueDate: billDueDate,
  };

  bill.save(billModel);
  // ===== CARD ========
  const card = document.createElement("div");
  card.classList.add("invoice-card");

  card.innerHTML = `
      <p class="bill-id">${generatedID}</p>
    <p class="bill-due-date">Vencimento ${new Date(
      billDueDate
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
