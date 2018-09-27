import { DetalleIngresoSucursal } from "./detalleIngresoSucursal";
export class IngresoSucursal {
    public id:number; 
    public fecha: Date=new Date();
    public ingresante_id: string;
    public ingresante: string;
    public sucursal_id: string;
    public sucursal: string;
    public recibio_id: string;
    public recibio: string;
    public detalle: Array<DetalleIngresoSucursal>;
}