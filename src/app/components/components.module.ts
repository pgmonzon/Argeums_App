import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../app.module';
import { ButtonsComponent } from './buttons/buttons.component';
import { ComponentsRoutes } from './components.routing';
import { GridSystemComponent } from './grid/grid.component';
import { IconsComponent } from './icons/icons.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { PanelsComponent } from './panels/panels.component';
import { SweetAlertComponent } from './sweetalert/sweetalert.component';
import { TypographyComponent } from './typography/typography.component';
import { TestComponent } from './test/test.component';
import { TipoUnidadComponent } from './tipounidad/tipounidad.component';
import { CategoriasComponent } from './categorias/categorias.component';
import { SindicatoComponent } from './sindicato/sindicato.component';
import { CuentaGastoComponent } from './cuenta-gasto/cuenta-gasto.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(ComponentsRoutes),
    FormsModule,
    MaterialModule
  ],
  declarations: [
      ButtonsComponent,
      GridSystemComponent,
      IconsComponent,
      NotificationsComponent,
      PanelsComponent,
      SweetAlertComponent,
      TypographyComponent,
      TestComponent,
      TipoUnidadComponent,
      CategoriasComponent,
      SindicatoComponent,
      CuentaGastoComponent
  ]
})

export class ComponentsModule {}
