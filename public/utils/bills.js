const STORAGE_KEY = "bills";

// Helpers de storage (leitura/escrita em localStorage)
const readBills = () => JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
const writeBills = (bills) =>
  localStorage.setItem(STORAGE_KEY, JSON.stringify(bills));

const bill = {
  /**
   * Lista todas as contas armazenadas.
   */
  getAll() {
    return readBills();
  },

  /**
   * Quantidade total de contas.
   */
  getQuantityOfBills() {
    return this.getAll().length;
  },

  /**
   * Quantidade de contas de um tipo especifico (payable | receivable).
   */
  getQuantityOfBillsType(type) {
    const normalized = String(type).toLowerCase();
    return readBills().filter((bill) => bill.type?.toLowerCase() === normalized)
      .length;
  },

  /**
   * Totais: soma o que deve pagar e receber e calcula saldo (receber - pagar).
   */
  getTotals() {
    const { payable, receivable } = readBills().reduce(
      (acc, item) => {
        const amount = Number(item.amount) || 0;
        if (item.type === "payable") acc.payable += amount;
        if (item.type === "receivable") acc.receivable += amount;
        return acc;
      },
      { payable: 0, receivable: 0 }
    );
    return { payable, receivable, balance: receivable - payable };
  },

  /**
   * Total apenas para um tipo (payable ou receivable).
   */
  getTotalByType(type) {
    const { payable, receivable } = this.getTotals();
    return type === "payable" ? payable : receivable;
  },

  /**
   * Persiste uma nova conta no storage.
   */
  save(newBill) {
    const bills = readBills();
    bills.push(newBill);
    writeBills(bills);
  },

  /**
   * Remove uma conta pelo id.
   */
  delete(id) {
    const filtered = readBills().filter((bill) => bill.id !== id);
    writeBills(filtered);
  },

  /**
   * Gera um ID aleatorio com dois caracteres e quatro digitos (#AB1234).
   */
  generateID() {
    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const letterPart =
      letters[Math.floor(Math.random() * letters.length)] +
      letters[Math.floor(Math.random() * letters.length)];
    const numberPart = Math.floor(Math.random() * 9000) + 1000;
    return `#${letterPart}${numberPart}`;
  },
};

export default bill;
