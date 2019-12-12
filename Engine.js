class Operation {
  constructor(name, payload, plataforma) {
    this.name = name;
    this.payload = payload;
    this.plataforma = plataforma;
  }
}

class OperationError {
  constructor(operation, engine, messageError) {
    this.engine = engine;
    this.messageError = messageError;
    this.operation = operation;
  }

  getEngine() {
    return this.engine;
  }
  getErrorMessage() {
    return this.messageError;
  }

  getOperation() {
    return this.operation;
  }
}

class Engine {
  constructor(plataforma) {
    this.plataforma = plataforma;
    this.operations = [];
    this.terminate = false;
    this.history = [];
  }

  async operate(operation) {
    switch (operation.name) {
      case "addCliente":
        this.plataforma = this.plataforma.addCliente(operation.payload);
        this.history.push(this.plataforma);
        return this;
      case "transfer":
        this.plataforma = this.plataforma.transfer({
          clientEmail1: operation.payload.clientEmail1,
          clientEmail2: operation.payload.clientEmail2,
          valor: operation.payload.valor
        });
        this.history.push(this.plataforma);
        return this;

      default:
        throw new OperationError(operation, this, "Operação não cadastrada");
    }
  }

  async executeNext() {
    if (this.operations.length > 0) {
      return this.operate(this.operations.shift());
    } else {
      return this;
    }
  }

  // run() {
  //   return new Promise((resolve, reject) => {
  //     while (true) {
  //       console.log(this.terminate);

  //       if (this.operations.length > 0) {
  //         try {
  //           const operation = this.operations.shift();
  //           const newState = this.operate(operation).then(state => state);

  //           this.plataforma = newState.plataforma;
  //         } catch (error) {
  //           this.plataforma = error.engine.plataforma;
  //           console.log("Houve um erro na operação");
  //         }
  //       }

  //       if (this.terminate) {
  //         console.log("Terminei");

  //         return resolve(this);
  //       }
  //     }
  //   });
  // }

  async terminate() {
    console.log("Terminei");

    this.terminate = true;
    return true;
  }

  async getPlataforma() {
    return this.plataforma;
  }

  async addOperation(operation) {
    this.operations.push(operation);
    return this;
  }
  async getOperations() {
    return this.operations;
  }
}

module.exports = { Engine, Operation };
