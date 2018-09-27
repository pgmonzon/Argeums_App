import { Promo } from "./promo";

export class Articulo {
    public id:number; 
    public rubro_id: string;
    public rubro: string;
    public articulo: string;
    public codigoBarras: string;
    public precio: number;
    public esPromo: boolean;
    public activo: boolean;
    public promos: Array<Promo>;
}