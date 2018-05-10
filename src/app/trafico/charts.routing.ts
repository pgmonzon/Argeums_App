import { Routes } from '@angular/router';

import { ChartsComponent } from './charts.component';
import { UnidadComponent } from './unidad/unidad.component';
import { TipoUnidadComponent } from './tipounidad/tipounidad.component';
import { LocacionesComponent } from './locaciones/locaciones.component';

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
    },
    {
        path: '',
        children: [ {
            path: 'tipoUnidades',
            component: TipoUnidadComponent
        }]
    }
    ,
    {
        path: '',
        children: [ {
            path: 'locaciones',
            component: LocacionesComponent
        }]
    }
    
];
