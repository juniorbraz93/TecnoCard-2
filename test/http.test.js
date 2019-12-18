const app = require("../app.js");
const request = require("supertest");
const Clientes = require("../clientes");

function requestPost(route, payload){
  return request(app)
    .post(route)
    .set("Content-Type", "application/json")
    .send(payload)
}

test("Recuperar dados do cliente", done => {
  request(app)
    .post("/client")
    .set("Content-Type", "application/json")
    .send({ email: "jb@gmail.com", saldo: 100, cardNumber: "1234567890" })
    .expect(
      201,
      {
        data: { email: "jb@gmail.com", saldo: 100, cardNumber: "1234567890" }
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
        data: { email: "jb@gmail.com", saldo: 100, cardNumber: "1234567890" }
      },
      done
    );
});

test("transfer", done => {
  /**
   * Cria um dois 
   */
  const cliente1 = new Clientes("jb@gmail.com", 100, "1234567890");
  const cliente2 = new Clientes("fb@gmail.com", 100, "0987654321");
  
  request(app)
    .post("/client")
    .set("Content-Type", "application/json")
    .send({ email: "jb@gmail.com", saldo: 100, cardNumber: "1234567890" })
    .expect(
      201,
      {
        data: { email: "jb@gmail.com", saldo: 100, cardNumber: "1234567890" }
      },
    ).end(() => {
      request(app)
      .post("/client")
      .set("Content-Type", "application/json")
      .send({ email: "fb@gmail.com", saldo: 100, cardNumber: "0987654321" })
      .expect(
        201,
        {
          data: { email: "fb@gmail.com", saldo: 100, cardNumber: "0987654321" }
        },
      ).end(() => {
        request(app)
        .post("/client/transfer")
        .set("Content-Type", "application/json")
        .send({
          client1: {
            email: cliente1.email,
          },
          client2: {
            email: cliente2.email,
          },
          saldo: 60
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
      }) 
    })

});

test('history', done => {
  requestPost('/client', { email: "jb@gmail.com", saldo: 100, cardNumber: "1234567890" }).end(() => {
    requestPost('/client', { email: "fb@gmail.com", saldo: 100, cardNumber: "0987654321" }).end(() => {
      requestPost('/client/transfer', {
        client1: {
          email: "jb@gmail.com",
        },
        client2: {
          email: "fb@gmail.com",
        },
        saldo: 60
      }).end(() => {
        requestPost('/client/history', {email: "jb@gmail.com"})
          .expect(200).end((err, result) => {
            expect(result.body.data[0].to).toBe("fb@gmail.com")
            done()
          })
      })
    })
  })
})