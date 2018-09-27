import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../app.module';
import { ComponentsRoutes } from './components.routing';
import { PanelsComponent } from './panels/panels.component';
import { CategoriasComponent } from './categorias/categorias.component';
import { SindicatoComponent } from './sindicato/sindicato.component';
import { PersonalComponent } from './personal/personal.component';
import { RendicionComponent } from './rendicion/rendicion.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(ComponentsRoutes),
    FormsModule,
    MaterialModule
  ],
  declarations: [
      PanelsComponent,
      CategoriasComponent,
      SindicatoComponent,
      PersonalComponent,
      RendicionComponent
  ]
})

export class ComponentsModule {}
