export class Facturacion {
    constructor(
      public id: number,
      public letra: string,
      public suc: string,
      public numero:string,
      public fecha:string,
      public vencimiento: string,

      public cliente_id: string,
      public cliente: string,
      public descripcion:string,
      public neto:number,
      public iva105: number,

      public iva21: number,
      public total: number,
      public cuentaIngreso:string,
      public viajesFact:string[],


      //nuevo
      public cuit: string,
      public noGravado:string
      ) {}
  }
