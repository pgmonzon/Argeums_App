export class liquidaciones {
  constructor(
    public id: number,
    public liquidacion: string,
    public fecha: string,
    public transportista_id: string,
    public transportista: string,
    public descripcion: string,
    public neto: number,
    public iva105: number,
    public iva21: number,
    public total: number,
    public cuentaIngreso: string,
    public viajesLiq: string[],
  ) { }
}
