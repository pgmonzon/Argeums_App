
export class clientes {
    constructor(
      public id: number,
      public cliente: string,
      public activo: string,
      public contactos: string[],
      public tarifarios:string[],
      //nuevo
      public cuit:string

      ) {}
  }