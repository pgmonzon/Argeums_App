export class transportistas {
    constructor(
      public id: number,
      public transportista: string,
      public mail: string,
      public activo: string,
      public contactos: string[],
      public tarifarios:string[]

      ) {}
  }