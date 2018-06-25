export class tarifarios {
    constructor(
      public tarifario: string,
      public tipo: string,
      public tipoUnidad_id: string,
      public importe: number,
      public vigenteDesde: string,
      public vigenteHasta: string,
      public recorrido: string[],
      public kmDesde: string,
      public kmHasta: string,
      public activo: string,
      //nuevo
      public vuelta:string,
      public tipoServico:string
      ) {}
  }