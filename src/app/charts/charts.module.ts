import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// import { LbdTableComponent } from '../lbd/lbd-table/lbd-table.component';
import { MaterialModule } from '../app.module';

import { ChartsComponent } from './charts.component';
import { ChartsRoutes } from './charts.routing';
import { UnidadComponent } from './unidad/unidad.component';

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(ChartsRoutes),
        FormsModule,
        MaterialModule

    ],
    declarations: [ChartsComponent, UnidadComponent]
})

export class ChartsModule {}

