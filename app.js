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

  const cliente1 = new Clientes(dados.email, dados.saldo, dados.cardNumber);

  await engine.addOperation(new Operation("addCliente", cliente1, plataforma));
  engine = await engine.executeNext();

  const plataforma1 = await engine.getPlataforma();

  const novoCliente = plataforma1.getCliente({ email: dados.email });

  res.status(201).json({
    data: {
      email: novoCliente.email,
      saldo: novoCliente.saldo,
      cardNumber: novoCliente.creditoCartao,
    }
  });
});

App.post("/client/get", async (req, res) => {
  const newGetPlataforma = await engine.getPlataforma();
  const retorno = newGetPlataforma.getCliente({ email: req.body.email });

  res.status(200).json({
    data: { email: retorno.email, saldo: retorno.saldo, cardNumber: retorno.creditoCartao }
  });
});

App.post("/client/transfer", async (req, res) => {

  /**
   * abstraio o body de cliente1 e cliente2 em duas const
   */

  const client1 = await req.body.client1;
  const client2 = await req.body.client2;

  /**
   * busca o body de cliente1 e cliente2 dentro da plataforma
   */

  const cliente1 = plataforma.getCliente({ email: client1.email });
  const cliente2 = plataforma.getCliente({ email: client2.email });

  /**
   * adc a operação de transferencia 
   */

  await engine.addOperation(
    new Operation(
      "transfer",
      { clientEmail1: cliente1.email, clientEmail2: cliente2.email, valor: req.body.saldo },
      plataforma
    )
  );

  await engine.executeNext();
  await engine.executeNext();
  const engineNext = await engine.executeNext();

  /**
   * busca a plataforma mais atualizada e atribui em uma const
   */

  const plataforma1 = await engineNext.getPlataforma();

  /**
   * busca os clientes com os dados atualizados na constante plataforma  
   */


  const novoCliente1 = plataforma1.getCliente({ email: client1.email });
  const novoCliente2 = plataforma1.getCliente({ email: client2.email });

  /**
   * resposta final da rota 
   */
   
  res.status(200).json({
    data: {
      client1: { email: novoCliente1.email, saldo: novoCliente1.saldo },
      client2: { email: novoCliente2.email, saldo: novoCliente2.saldo }
    }
  });
});

App.post("/client/history", async (req, res) => {

  /**
   * abstraio o body de cliente1 e cliente2 em duas const
   */

  const clientEmail = req.body.email

  /**
   *  busca a plataforma na engine
   */

  const plataforma1 = await engine.getPlataforma()

  /**
   * busca o cliente na plataforma
   */

  const novoCliente = plataforma1.getCliente({email: clientEmail})

  /**
   * busca o history no cliente
   */

  const history = novoCliente.history

  /**
   * resposta final da rota 
   */
   
  res.status(200).json({ data: history})
})

module.exports = App;
