import { Routes } from '@angular/router';

import { WidgetsComponent } from './widgets.component';
import { ClienteComponent } from './cliente/cliente.component';
import { TransportistaComponent } from './transportista/transportista.component';

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
];
