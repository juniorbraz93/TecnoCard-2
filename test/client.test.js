const Cliente = require("../clientes.js");

test("Retornar o saldo do cliente", () => {
  const cliente = new Cliente("Rafael", 0);
  expect(cliente.saldoCliente()).toBe(0);
});

test("atualizar saldo com valor negativo", () => {
  const cliente = new Cliente("junior", 0);
  //debito negativo
  expect(cliente.debito(300)).toBe(false);
});

test("atualizar saldo com valor positivo", () => {
  const cliente = new Cliente("joão", 500);
  //debitio positivo
  expect(cliente.debito(300)).toBe(true);
});

test("Credito", () => {
  const cliente = new Cliente("Maycon", 500);

  expect(cliente.credito(500)).toBe(true);
});

test("test", () => {
  const cliente = new Cliente("Maycon", 0);
  expect(cliente.credito(500)).toBe(true);
  expect(cliente.debito(300)).toBe(true);
});
