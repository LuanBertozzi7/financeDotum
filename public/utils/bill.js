const getBillsFromStorage = () => {
  return JSON.parse(localStorage.getItem("bills")) || [];
};

const bill = {
  getAll() {
    return getBillsFromStorage();
  },
  getQuantityOfBills() {
    return this.getAll().length;
  },
  getQuantityOfBillsType(type) {
    const bills = getBillsFromStorage();
    const normalized = type.toLowerCase();
    return bills.filter((bill) => bill.type?.toLowerCase() === normalized)
      .length;
  },
  getTotals() {
    const bills = getBillsFromStorage();
    const { payable, receivable } = bills.reduce(
      (acc, bill) => {
        const amount = Number(bill.amount) || 0;
        if (bill.type === "payable") acc.payable += amount;
        if (bill.type === "receivable") acc.receivable += amount;
        return acc;
      },
      { payable: 0, receivable: 0 }
    );
    const balance = receivable - payable; // >0 sobra, <0 falta
    return { payable, receivable, balance };
  },
  getTotalByType(type) {
    const { payable, receivable } = this.getTotals();
    return type === "payable" ? payable : receivable;
  },
  save(newBill) {
    const bills = getBillsFromStorage();
    bills.push(newBill);
    localStorage.setItem("bills", JSON.stringify(bills));
  },
  delete(id) {
    const bills = getBillsFromStorage().filter((bill) => bill.id !== id);
    localStorage.setItem("bills", JSON.stringify(bills));
  },
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
