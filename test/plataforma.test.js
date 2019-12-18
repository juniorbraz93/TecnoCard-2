const Plataforma = require("../plataforma.js");
const Cliente = require("../clientes.js");

/*
  Notação de tempo BigO = O(n) : tempo(array)

  Se n = 2 e cada m = 3, O(n*m) = 6

  Se n = 2 e cada n = 2 temos m = 2, O(n*m) => O(n^2) = 4

*/

test("hashMap", () => {
  const cliente1 = {};
  cliente1["1"] = 100;
  cliente1["1"] = 50;
});

test("Plataforma", () => {
  const cliente1 = new Cliente("Rafael", 100);
  const cliente2 = new Cliente("Thiago", 100);

  let plataforma = new Plataforma({});

  plataforma = plataforma.addCliente(cliente1);
  plataforma = plataforma.addCliente(cliente2);

  plataforma = plataforma.transfer({
    clientEmail1: cliente1.email,
    clientEmail2: cliente2.email,
    valor: 50
  });

  const novoCliente1 = plataforma.getCliente({ email: cliente1.email });
  const novoCliente2 = plataforma.getCliente({ email: cliente2.email });

  expect(novoCliente1.saldoCliente()).toBe(50);
  expect(novoCliente2.saldoCliente()).toBe(150);
});

test("TesteNegativo", () => {
  const cliente1 = new Cliente("Rafael", 50);
  const cliente2 = new Cliente("Thiago", 100);

  let plataforma = new Plataforma({});

  plataforma = plataforma.addCliente(cliente1);
  plataforma = plataforma.addCliente(cliente2);

  plataforma = plataforma.transfer({
    clientEmail1: cliente1.email,
    clientEmail2: cliente1.email,
    valor: 100
  });

  const novoCliente1 = plataforma.getCliente({ email: cliente1.email });
  const novoCliente2 = plataforma.getCliente({ email: cliente2.email });

  expect(novoCliente1.saldoCliente()).toBe(50);
  expect(novoCliente2.saldoCliente()).toBe(100);
});

test("TesteHashMap", () => {
  let cliente1 = {};
  cliente1["hasmap"] = {};
  cliente1.hasmap["dez"] = 10;
});

test("exercicio", () => {
  let cliente1 = {};
  cliente1["hasmap"] = {};
  cliente1.hasmap["dez"] = {};
  cliente1.hasmap.dez["cem"] = 100;
});
