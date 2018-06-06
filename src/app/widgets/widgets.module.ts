import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../app.module';

import { NouisliderModule } from 'ng2-nouislider';
import { TagInputModule } from 'ngx-chips';
import { SelectModule } from 'ng2-select';
import { WidgetsComponent } from './widgets.component';
import { WidgetsRoutes } from './widgets.routing';
import { ClienteComponent } from './cliente/cliente.component';
import { TransportistaComponent } from './transportista/transportista.component';
import { FacturacionComponent } from './facturacion/facturacion.component';
import { LiquidacionComponent } from './liquidacion/liquidacion.component';

@NgModule({
    imports: [
        RouterModule.forChild(WidgetsRoutes),
        CommonModule,
        FormsModule,
        MaterialModule,
    ],
    declarations: [WidgetsComponent, ClienteComponent, TransportistaComponent, FacturacionComponent, LiquidacionComponent]
})

export class WidgetsModule {}
