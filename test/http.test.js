const App = require("../app.js");
const Request = require("supertest");
const Clientes = require("../clientes");

test("Recuperar dados do cliente", done => {
  Request(App)
    .post("/client")
    .set("Content-Type", "application/json")
    .send({ email: "rafael@gmail.com", cardNumber: "4444555566667777" })
    .expect(
      201,
      {
        data: { email: "rafael@gmail.com", cardNumber: "4444555566667777" }
      },
      done
    );

  Request(App)
    .post("/client/get")
    .set("Content-Type", "application/json")
    .send({ email: "rafael@gmail.com" })
    .expect(
      200,
      {
        data: { email: "rafael@gmail.com", cardNumber: "4444555566667777" }
      },
      done
    );
});

test("route transfer", done => {
  //Criando clientes na instancia de clientes
  const cliente1 = new Clientes("jb@gmail.com", 100, "1234567890");

  const cliente2 = new Clientes("fb@gmail.com", 100, "0987654321");

  Request(App)
    .post("/client/transfer")
    .set("Content-Type", "application/json")
    .send({
      client1: {
        email: cliente1.email,
        saldo: cliente1.saldo,
        cardNumber: cliente1.creditoCartao
      },
      client2: {
        email: cliente2.email,
        saldo: cliente2.saldo,
        cardNumber: cliente2.creditoCartao
      }
    })
    .expect(
      200,
      {
        data: {
          client1: {
            email: "jb@gmail.com",
            saldo: 40
          },
          client2: {
            email: "fb@gmail.com",
            saldo: 160
          }
        }
      },
      done
    );
});
