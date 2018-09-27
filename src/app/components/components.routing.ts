import { Routes } from '@angular/router';

import { PanelsComponent } from './panels/panels.component';

import { CategoriasComponent } from './categorias/categorias.component';
import { SindicatoComponent } from './sindicato/sindicato.component';
import { PersonalComponent } from './personal/personal.component';
import { RendicionComponent } from './rendicion/rendicion.component';

export const ComponentsRoutes: Routes = [
  {
        path: '',
        children: [ {
            path: 'panels',
            component: PanelsComponent
        }]
    },
    {
        path: '',
        children: [ {
            path: 'categorias',
            component: CategoriasComponent
        }]
    },
    {
        path: '',
        children: [ {
            path: 'basicoSindicatos',
            component: SindicatoComponent
        }]
    }
    ,
    {
        path: '',
        children: [ {
            path: 'personal',
            component: PersonalComponent
        }]
    }
    ,
    {
        path: '',
        children: [ {
            path: 'rendiciones',
            component: RendicionComponent
        }]
    }
];
