import { Routes } from '@angular/router';

import { ButtonsComponent } from './buttons/buttons.component';
import { GridSystemComponent } from './grid/grid.component';
import { IconsComponent } from './icons/icons.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { PanelsComponent } from './panels/panels.component';
import { SweetAlertComponent } from './sweetalert/sweetalert.component';
import { TypographyComponent } from './typography/typography.component';
import { TestComponent } from './test/test.component';

import { CategoriasComponent } from './categorias/categorias.component';
import { SindicatoComponent } from './sindicato/sindicato.component';
import { PersonalComponent } from './personal/personal.component';
import { RendicionComponent } from './rendicion/rendicion.component';

export const ComponentsRoutes: Routes = [
    {
      path: '',
      children: [ {
        path: 'buttons',
        component: ButtonsComponent
    }]}, {
    path: '',
    children: [ {
      path: 'grid',
      component: GridSystemComponent
    }]
    }, {
      path: '',
      children: [ {
        path: 'icons',
        component: IconsComponent
        }]
    }, {
        path: '',
        children: [ {
            path: 'notifications',
            component: NotificationsComponent
        }]
    }, {
        path: '',
        children: [ {
            path: 'panels',
            component: PanelsComponent
        }]
    }, {
        path: '',
        children: [ {
            path: 'sweet-alert',
            component: SweetAlertComponent
        }]
    }, {
        path: '',
        children: [ {
            path: 'typography',
            component: TypographyComponent
        }]
    },
    {
        path: '',
        children: [ {
            path: 'test',
            component: TestComponent
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
