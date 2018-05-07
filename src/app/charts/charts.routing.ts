import { Routes } from '@angular/router';

import { ChartsComponent } from './charts.component';
import { UnidadComponent } from './unidad/unidad.component';

export const ChartsRoutes: Routes = [
    {

        path: '',
        children: [{
            path: '',
            component: ChartsComponent
        }]
    }
    ,
    {
        path: '',
        children: [{
            path: 'unidades',
            component: UnidadComponent
        }]
    }
];
