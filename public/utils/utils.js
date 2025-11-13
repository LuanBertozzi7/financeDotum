/**
 * Este arquivo contém funções/variaveis
 * uteis para a execução/organização do código
 */

export function generateBillID() {
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
  const letterPart =
    letters[Math.floor(Math.random() * letters.length)] +
    letters[Math.floor(Math.random() * letters.length)];
  const numberPart = Math.floor(Math.random() * 9000) + 1000;
  return `#${letterPart}${numberPart}`;
}
