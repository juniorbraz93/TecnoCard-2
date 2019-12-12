const { Engine, Operation } = require("../engine.js");
const Plataforma = require("../plataforma.js");
const Clientes = require("../clientes.js");

test("TesteFIFO", async () => {
  const cliente1 = new Clientes("Rafael", 100);
  const cliente2 = new Clientes("Thiago", 100);

  const plataforma = new Plataforma({ Rafael: cliente1, Thiago: cliente2 });
  const engine = new Engine(plataforma);

  await engine.addOperation("Operation 1");
  await engine.addOperation("Operation 2");

  const operations = await engine.getOperations();
  expect(operations.shift()).toBe("Operation 1");
});

test("Run", async () => {
  const cliente1 = new Clientes("Rafael", 100);
  const cliente2 = new Clientes("Thiago", 100);

  let plataforma = new Plataforma({ Rafael: cliente1, Thiago: cliente2 });
  const engine = new Engine(plataforma);

  await engine.addOperation(new Operation("addCliente", cliente1, plataforma));
  await engine.addOperation(new Operation("addCliente", cliente2, plataforma));
  await engine.addOperation(
    new Operation(
      "transfer",
      { clientEmail1: cliente1.email, clientEmail2: cliente2.email, valor: 60 },
      plataforma
    )
  );

  await engine.executeNext();
  await engine.executeNext();
  const engineNext = await engine.executeNext();

  console.log(engineNext);

  plataforma = await engineNext.getPlataforma();
  console.log(plataforma);

  const novoCliente1 = plataforma.getCliente({ email: cliente1.email });
  const novoCliente2 = plataforma.getCliente({ email: cliente2.email });

  expect(novoCliente1.saldoCliente()).toBe(40);
  expect(novoCliente2.saldoCliente()).toBe(160);
});
