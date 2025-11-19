import bill from "./utils/bill.js";
import { openModal, closeModal } from "./utils/ui.js";

const modal = document.getElementById("modal");
const newBillBtn = document.querySelector(".new-bill");
const cancelBtn = document.querySelector(".cancel");
const form = document.getElementById("new-account-form");
const billCardList = document.getElementById("bill-list");
// div - quantidade de contas pagar/receber
const payableQuantity = document.querySelector(".payable-quantity");
const receivableQuantity = document.querySelector(".receivable-quantity");
const totalQuantity = document.querySelector(".total-quantity");

function renderBillCard(billData) {
  // criando a div
  const card = document.createElement("div");
  card.classList.add("invoice-card");

  // define se é conta a pagar ou receber
  const isPayable = billData.type === "payable";
  const statusClass = isPayable ? "payable" : "receivable";
  const statusText = isPayable ? "Pagar" : "Receber";

  // data formatada
  const formattedDueDate = new Date(billData.dueDate).toLocaleDateString(
    "pt-BR"
  );
  // valor formatado
  const formattedAmount = Number(billData.amount).toFixed(2);

  card.innerHTML = `
    <p class="bill-id">${billData.id}</p>
    <p class="bill-description">${billData.description}</p>
    <p class="bill-due-date">Vencimento: ${formattedDueDate}</p>
    <p class="bill-amount">R$ ${formattedAmount}</p>
    <div class="card-footer">
    <div class="bill-type ${statusClass}">
      ${statusText}
    </div>
     </div>
  `;

  const footer = card.querySelector(".card-footer");
  // criando botão de apagar card
  const deleteButton = document.createElement("button");
  deleteButton.classList.add("delete-bill");
  deleteButton.setAttribute("aria-label", "Excluir essa conta?");
  deleteButton.innerHTML = `<i class="bx bx-trash"></i>`;

  // adicionando comportamento de clique da lixeira
  deleteButton.addEventListener("click", () => {
    const confirmDelete = window.confirm(
      "Tem certeza que deseja excluir essa conta?"
    );
    if (!confirmDelete) return;
    bill.delete(billData.id);
    card.remove();
  });
  footer.appendChild(deleteButton);
  billCardList.appendChild(card);

  // adicionando a quantidade no header
}

// Carrega as contas do localStorage e renderiza na tela
function loadAndRenderBills() {
  const bills = bill.getAll();
  bills.forEach(renderBillCard);
}

function renderPageQuantity() {
  totalQuantity.innerHTML = bill.getQuantityOfBills();
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
  renderBillCard(billModel);

  closeModal(modal);
  form.reset();
});

// debug
console.log(bill.getQuantityOfBills());

renderPageQuantity();
loadAndRenderBills(); // Chama a função para carregar os dados ao iniciar a página
