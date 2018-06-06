import { Routes } from '@angular/router';

import { TimelineComponent } from './timeline.component';
import { CuentaGastoComponent } from './cuenta-gasto/cuenta-gasto.component';
import { ViajesComponent } from './viajes/viajes.component';
import { AutorizacionComponent } from './autorizacion/autorizacion.component';

export const TimelineRoutes: Routes = [
    {

      path: '',
      children: [ {
        path: 'pages/timeline',
        component: TimelineComponent
    }]
},
{
    path: '',
    children: [ {
        path: 'cuentaGastos',
        component: CuentaGastoComponent
    }]
},
{
    path: '',
    children: [ {
        path: 'viajes',
        component: ViajesComponent
    }]
},
{
    path: '',
    children: [ {
        path: 'autorizaciones',
        component: AutorizacionComponent
    }]
}
];
