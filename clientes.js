class Cliente {
  constructor(email, saldo, creditoCartao) {
    this.email = email;
    this.saldo = saldo;
    this.creditoCartao = creditoCartao;
  }

  saldoCliente() {
    return this.saldo;
  }

  debito(valor) {
    if (valor <= this.saldo) {
      this.saldo = this.saldo - valor;
      return true;
    } else {
      return false;
    }
  }

  credito(valor) {
    this.saldo = this.saldo + valor;
    return true;
  }
}

module.exports = Cliente;
