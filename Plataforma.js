class Plataforma {
  constructor(clientes) {
    this.clientes = clientes;
  }

  addCliente(novoCliente) {
    this.clientes[novoCliente.email] = novoCliente;
    return this;
  }

  transfer({ clientEmail1, clientEmail2, valor }) {
    if (this.clientes[clientEmail1].debito(valor)) {
      this.clientes[clientEmail2].credito(valor);
    } else {
      console.log("Não foi possível realizar transferencia");
    }
    return this;
  }

  getCliente({ email }) {
    return this.clientes[email];
  }
  getClientes() {
    return this.clientes;
  }
}

module.exports = Plataforma;
