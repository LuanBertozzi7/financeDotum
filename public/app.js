import bill from "./utils/bills.js";
import { openModal, closeModal } from "./utils/ui.js";
import { formatCurrency, formatDate } from "./utils/helpers.js";

// header
const receivableQuantity = document.querySelector(".receivable-quantity");
const payableQuantity = document.querySelector(".payable-quantity");
const totalQuantity = document.querySelector(".total-quantity");
// buttons
const newBillBtn = document.querySelector(".new-bill");
const cancelBtn = document.querySelector(".cancel");
// general
const modal = document.getElementById("modal");
const billCardList = document.getElementById("bill-list");
const form = document.getElementById("new-account-form");
// summary button
const summaryToggle = document.querySelector(".summary-toggle");
// summary general
const summaryPanel = document.querySelector(".summary-panel");
const summaryClose = document.querySelector(".summary-close");
const summaryPayable = document.querySelector(".summary-payable");
const summaryReceivable = document.querySelector(".summary-receivable");
const summaryBalance = document.querySelector(".summary-balance");
const summaryBalanceStatus = document.querySelector(".summary-balance-status");

function renderBillCard(billData) {
  const card = document.createElement("div");
  card.classList.add("invoice-card");

  const isPayable = billData.type === "payable";
  const statusClass = isPayable ? "payable" : "receivable";
  const statusText = isPayable ? "Pagar" : "Receber";

  const formattedDueDate = formatDate(billData.dueDate);
  const formattedAmount = formatCurrency(billData.amount);

  card.innerHTML = `
    <p class="bill-id">${billData.id}</p>
    <p class="bill-description">${billData.description}</p>
    <p class="bill-due-date">${formattedDueDate}</p>
    <p class="bill-amount"> ${formattedAmount}</p>
    <div class="card-footer">
      <div class="bill-type ${statusClass}">
        ${statusText}
      </div>
    </div>
  `;

  const footer = card.querySelector(".card-footer");
  const deleteButton = document.createElement("button");
  deleteButton.classList.add("delete-bill");
  deleteButton.setAttribute("aria-label", "Excluir essa conta?");
  deleteButton.innerHTML = `<i class="bx bx-trash"></i>`;

  deleteButton.addEventListener("click", () => {
    const confirmDelete = window.confirm(
      "Tem certeza que deseja excluir essa conta?"
    );
    if (!confirmDelete) return;
    bill.delete(billData.id);
    card.remove();
    renderPageQuantity();
  });
  footer.appendChild(deleteButton);
  billCardList.appendChild(card);
}

function renderBills() {
  // clear list then render all
  billCardList.innerHTML = "";
  const bills = bill.getAll();
  bills.forEach(renderBillCard);
}

function renderSummary() {
  const { payable, receivable, balance } = bill.getTotals();
  summaryPayable.textContent = formatCurrency(payable);
  summaryReceivable.textContent = formatCurrency(receivable);
  summaryBalance.textContent = formatCurrency(balance);

  let statusText = "Equilibrado";
  let statusClass = "summary-neutral";
  if (balance > 0) {
    statusText = "Sobra";
    statusClass = "summary-positive";
  } else if (balance < 0) {
    statusText = "Falta";
    statusClass = "summary-negative";
  }

  summaryBalanceStatus.textContent = statusText;
  summaryBalanceStatus.className = `summary-balance-status ${statusClass}`;
}

function openSummary() {
  summaryPanel.hidden = false;
  summaryToggle.setAttribute("aria-expanded", "true");
}
function closeSummary() {
  summaryPanel.hidden = true;
  summaryToggle.setAttribute("aria-expanded", "false");
}

summaryToggle.addEventListener("click", () => {
  const isOpen = summaryToggle.getAttribute("aria-expanded") === "true";
  isOpen ? closeSummary() : openSummary();
});
summaryClose.addEventListener("click", closeSummary);

function renderPageQuantity() {
  totalQuantity.textContent = bill.getQuantityOfBills();
  payableQuantity.textContent = bill.getQuantityOfBillsType("payable");
  receivableQuantity.textContent = bill.getQuantityOfBillsType("receivable");
  renderSummary();
}

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
  closeModal(modal);
  form.reset();
  renderBills();
  renderPageQuantity();
});

renderBills();
renderPageQuantity();
