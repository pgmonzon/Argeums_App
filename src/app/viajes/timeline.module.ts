import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MaterialModule } from '../app.module';

import { TimelineComponent } from './timeline.component';
import { TimelineRoutes } from './timeline.routing';
import { CuentaGastoComponent } from './cuenta-gasto/cuenta-gasto.component';
import { ViajesComponent } from './viajes/viajes.component';
import { AutorizacionComponent } from './autorizacion/autorizacion.component';

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(TimelineRoutes),
        FormsModule,
        MaterialModule
    ],
    declarations: [TimelineComponent, CuentaGastoComponent, ViajesComponent, AutorizacionComponent
    ]
})

export class TimelineModule {}
