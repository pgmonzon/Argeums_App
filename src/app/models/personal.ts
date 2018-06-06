export class personal {
    constructor(
      public id: number,
      public apellido: string,
      public nombre: string,
      public categoria_id:string,
      public propio: string,
      public basicoSindicato_id:string,
      public comision:number,
      public curso:string,
      public lnh:string,
      public registro:string,
      public activo:boolean,
      //nuevos cambios
      public celular:string,
      public direccion:string,
      public latitud:string,
      public longitud: string,
      public fechaAlta:string,
      public fechaBaja:string,


      ) {}
  }
