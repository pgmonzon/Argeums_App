import { Routes } from '@angular/router';

import { TimelineComponent } from './timeline.component';
import { CuentaGastoComponent } from './cuenta-gasto/cuenta-gasto.component';

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
}
];
