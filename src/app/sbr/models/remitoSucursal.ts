import { DetalleIngresoSucursal } from "./detalleIngresoSucursal";
export class RemitoSucursalModel {
    public id:number; 
    public fecha: Date=new Date();
    public envia_id: string;
    public envia: string;
    public deSucursal_id: string;
    public deSucursal: string;
    public aSucursal_id: string;
    public aSucursal: string;
    public detalle: Array<DetalleIngresoSucursal>;
}