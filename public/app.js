import bill from "./utils/utils.js";
import { openModal, closeModal } from "./utils/ui.js";

const modal = document.getElementById("modal");
const newBillBtn = document.querySelector(".new-bill");
const cancelBtn = document.querySelector(".cancel");
const form = document.getElementById("new-account-form");
const billCardList = document.getElementById("bill-list");

function renderBillCard(billData) {
  const card = document.createElement("div");
  card.classList.add("invoice-card");

  const billType = billData.type;
  const statusClass = billType === "payable" ? "receivable" : "payable";
  const statusText = billType === "payable" ? "A Pagar" : "A Receber"; // Corrigido para consistência

  card.innerHTML = `
    <p class="bill-id">${billData.id}</p>
    <p class="bill-description">${billData.description}</p>
    <p class="bill-due-date">Vencimento: ${new Date(
      billData.dueDate
    ).toLocaleDateString("pt-BR")}</p>
    <p class="bill-amount">R$ ${Number(billData.amount).toFixed(2)}</p>
    <div class="card-footer">
    <div class="bill-type ${statusClass}">
      ${statusText}
    </div>
    <button class="delete-bill" aria-label="Excluir essa conta?">
    <i class="bx bx-trash"></i>
     </button>
     </div>
  `;

  const deleteButton = card.querySelector(".delete-bill");
  deleteButton.addEventListener("click", () => {
    const confirmDelete = window.confirm("Tem certeza que deseja apagar?");

    if (!confirmDelete) {
      return;
    }
    bill.delete(billData.id);
    card.remove();
  });

  billCardList.appendChild(card);
}

// Carrega as contas do localStorage e renderiza na tela
function loadAndRenderBills() {
  const bills = bill.getAll();
  bills.forEach(renderBillCard);
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
  renderBillCard(billModel); // Reutilizando a função para criar o novo card

  closeModal(modal);
  form.reset();
});

loadAndRenderBills(); // Chama a função para carregar os dados ao iniciar a página
