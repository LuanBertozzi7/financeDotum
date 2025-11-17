const bill = {
  generateID() {
    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const letterPart =
      letters[Math.floor(Math.random() * letters.length)] +
      letters[Math.floor(Math.random() * letters.length)];
    const numberPart = Math.floor(Math.random() * 9000) + 1000;
    return `#${letterPart}${numberPart}`;
  },

  getAll() {
    const data = localStorage.getItem("bills");
    return data ? JSON.parse(data) : [];
  },

  save(newBill) {
    // pega todas as contas existente
    const bills = this.getAll();
    // adiciona a conta nova que foi recebida
    bills.push(newBill);
    // salva novamente no local storage
    localStorage.setItem("bills", JSON.stringify(bills));
  },

  delete(id) {
    // pega todas as contas
    const bills = this.getAll();
    // filtrar removendo a conta com o id
    const filtered = bills.filter((bill) => bill.id !== id);
    // salva no localStorage
    localStorage.setItem("bills", JSON.stringify(filtered));
  },
};

export default bill;
