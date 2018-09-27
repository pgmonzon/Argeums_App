import { Routes } from '@angular/router';
import { RubroComponent } from './rubro/rubro.component';
import { SucursalComponent } from './sucursal/sucursal.component';
import { ArticuloComponent } from './articulo/articulo.component';
import { IngresoSucursalComponent } from './ingreso-sucursal/ingreso-sucursal.component';
import { RemitoSucursalComponent } from './remito-sucursal/remito-sucursal.component';
import { RecepcionRemitoComponent } from './recepcion-remito/recepcion-remito.component';

export const ComponentsRoutes: Routes = [
 
    {
        path: '',
        children: [ {
            path: 'sbrSucursales',
            component: SucursalComponent
        }]
    },
    {
        path: '',
        children: [ {
            path: 'sbrRubros',
            component: RubroComponent
        }]
    }
    ,
    {
        path: '',
        children: [ {
            path: 'sbrArticulos',
            component: ArticuloComponent
        }]
    }
    ,
    {
        path: '',
        children: [ {
            path: 'sbrIngresoSucursal',
            component: IngresoSucursalComponent
        }]
    }
    ,
    {
        path: '',
        children: [ {
            path: 'sbrRemitoSucursal',
            component: RemitoSucursalComponent
        }]
    }
    ,
    {
        path: '',
        children: [ {
            path: 'sbrRecepcionRemitos',
            component: RecepcionRemitoComponent
        }]
    }
];
