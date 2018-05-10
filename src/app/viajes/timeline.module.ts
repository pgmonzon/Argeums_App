import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { TimelineComponent } from './timeline.component';
import { TimelineRoutes } from './timeline.routing';
import { CuentaGastoComponent } from './cuenta-gasto/cuenta-gasto.component';

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(TimelineRoutes),
        FormsModule
    ],
    declarations: [TimelineComponent, CuentaGastoComponent
    ]
})

export class TimelineModule {}
