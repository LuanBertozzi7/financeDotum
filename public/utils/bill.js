const bill = {
  /**
   * o arquivo bill.js é para obtermos dados básicos através de funções, sem afetar a organização!
   *
   * ===========  //  ===========
   *
   * @returns getAll() -> todas as contas salvas - LocalStorage
   * @returns save(param) -> salvar a nova conta - LocalStorage
   * @returns delete(param) -> deletar a conta - LocalStorage
   * @returns generateID() -> gera e retorna um ID aleatório (#QD2942)
   *
   * ============  // ===========
   */
  getAll() {
    const data = localStorage.getItem("bills");
    return data ? JSON.parse(data) : [];
  },

  getQuantityOfBills() {
    const data = localStorage.getItem("bills");
    return data ? JSON.parse(data).length : 0;
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
