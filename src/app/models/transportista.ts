export class transportistas {
    constructor(
      public id: number,
      public transportista: string,
      public mail: string,
      //nuevo
      public Factura:string,
      public activo: string,
      public contactos: string[],
      public tarifarios:string[]

      ) {}
  }