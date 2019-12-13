const app = require("../app.js");
const request = require("supertest");
const Clientes = require("../clientes");

test("Recuperar dados do cliente", done => {
  request(app)
    .post("/client")
    .set("Content-Type", "application/json")
    .send({ email: "jb@gmail.com", cardNumber: "1234567890" })
    .expect(
      201,
      {
        data: { email: "jb@gmail.com", cardNumber: "1234567890" }
      },
      done
    );

  request(app)
    .post("/client/get")
    .set("Content-Type", "application/json")
    .send({ email: "jb@gmail.com" })
    .expect(
      200,
      {
        data: { email: "jb@gmail.com", cardNumber: "1234567890" }
      },
      done
    );
});

test("transfer", done => {
  const cliente1 = new Clientes("jb@gmail.com", 100, "1234567890");
  const cliente2 = new Clientes("fb@gmail.com", 100, "0987654321"); 

  request(app)
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
