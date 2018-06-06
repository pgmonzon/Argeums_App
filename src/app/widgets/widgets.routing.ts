import { Routes } from '@angular/router';

import { WidgetsComponent } from './widgets.component';
import { ClienteComponent } from './cliente/cliente.component';
import { TransportistaComponent } from './transportista/transportista.component';
import { FacturacionComponent } from './facturacion/facturacion.component';
import { LiquidacionComponent } from './liquidacion/liquidacion.component';

export const WidgetsRoutes: Routes = [
    {

      path: '',
      children: [ {
        path: '',
        component: WidgetsComponent
    }]
},
{
    path: '',
    children: [ {
        path: 'clientes',
        component: ClienteComponent
    }]
}
,
{
    path: '',
    children: [ {
        path: 'transportistas',
        component: TransportistaComponent
    }]
}
,
{
    path: '',
    children: [ {
        path: 'facturacion',
        component: FacturacionComponent
    }]
}
,
{
    path: '',
    children: [ {
        path: 'liquidacion',
        component: LiquidacionComponent
    }]
}
];
