import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../../app.module';
import { ComponentsRoutes } from './components.routing';
import { SucursalComponent } from './sucursal/sucursal.component';
import { RubroComponent } from './rubro/rubro.component';
import { ArticuloComponent } from './articulo/articulo.component';
import { IngresoSucursalComponent } from './ingreso-sucursal/ingreso-sucursal.component';
import { RemitoSucursalComponent } from './remito-sucursal/remito-sucursal.component';
import { RecepcionRemitoComponent } from './recepcion-remito/recepcion-remito.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(ComponentsRoutes),
    FormsModule,
    MaterialModule
  ],
  declarations: [

      SucursalComponent,

      RubroComponent,

      ArticuloComponent,

      IngresoSucursalComponent,

      RemitoSucursalComponent,

      RecepcionRemitoComponent
  ]
})

export class ComponentsModule {}
