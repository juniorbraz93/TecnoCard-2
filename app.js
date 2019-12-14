const Plataforma = require("./plataforma");
const { Engine, Operation } = require("./engine");
const Clientes = require("./clientes.js");

const Express = require("express");
const App = Express();

let plataforma = new Plataforma({});
let engine = new Engine(plataforma);

App.use(Express.json());

App.post("/client", async (req, res) => {
  const dados = req.body;

  const cliente1 = new Clientes(dados.email, 0, dados.cardNumber);

  await engine.addOperation(new Operation("addCliente", cliente1, plataforma));
  engine = await engine.executeNext();

  const plataforma1 = await engine.getPlataforma();

  const novoCliente = plataforma1.getCliente({ email: dados.email });

  res.status(201).json({
    data: {
      email: novoCliente.email,
      cardNumber: novoCliente.creditoCartao
    }
  });
});

App.post("/client/get", async (req, res) => {
  const newGetPlataforma = await engine.getPlataforma();
  const retorno = newGetPlataforma.getCliente({ email: req.body.email });

  res.status(200).json({
    data: { email: retorno.email, cardNumber: retorno.creditoCartao }
  });
});

App.post("/client/transfer", async (req, res) => {
  const client1 = await req.body.client1;
  const client2 = await req.body.client2;

  plataforma = plataforma.addCliente(client1);
  plataforma = plataforma.addCliente(client2);

  const cliente1 = plataforma.getCliente({ email: client1.email });
  const cliente2 = plataforma.getCliente({ email: client2.email });

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


  const plataforma1 = await engineNext.getPlataforma();


  const novoCliente1 = plataforma1.getCliente({ email: client1.email });
  const novoCliente2 = plataforma1.getCliente({ email: client2.email });

  console.log(novoCliente1.saldo);
  console.log(novoCliente2.saldo);

  res.status(200).json({
    data: {
      client1: { email: novoCliente1.email, saldo: novoCliente1.saldo },
      client2: { email: novoCliente2.email, saldo: novoCliente2.saldo }
    }
  });
});

module.exports = App;
