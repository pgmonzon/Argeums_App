export class Viajes {
    constructor(
        public id: number,
        public fechaHora: string,
        public cliente_id: string,
        public cliente: string,
        public tipoUnidad_id: string,
        public tipoUnidad: string,
        public transportista_id: string,
        public transportista: string,
        public unidad_id: string,
        public unidad: string,
        public personal_id: string,
        public personal: string,
        public peajes: string,
        public observaciones: string,
        public kilometraje: number,
        public paradas: string[],
            // nuevos campos
         public vuelta: string,
         public celuar: string,
         public tipo:string,
         public adicional:string,
         public importe:number,
         public regreso: number,

         //reciente
         public remitosDetalle:string
    ) { }
}


