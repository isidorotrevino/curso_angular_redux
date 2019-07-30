import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DashboardComponent} from '../dashboard/dashboard.component';
import {IngresoEgresoComponent} from './ingreso-egreso.component';
import {EstadisticasComponent} from './estadisticas/estadisticas.component';
import {DetalleComponent} from './detalle/detalle.component';
import {OrdenIngresoEgresoPipe} from './orden-ingreso-egreso.pipe';
import {ReactiveFormsModule} from '@angular/forms';
import {SharedModule} from '../shared/shared.module';
import {DashboardRoutingModule} from '../dashboard/dashboard-routing.module';
import {StoreModule} from '@ngrx/store';
import {IngresoEgresoReducer} from './ingreso-egreso.reducer';

@NgModule({
  declarations: [
    DashboardComponent,
    IngresoEgresoComponent,
    EstadisticasComponent,
    DetalleComponent,
    OrdenIngresoEgresoPipe
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SharedModule,
    DashboardRoutingModule,
    StoreModule.forFeature('ingreso-egreso', IngresoEgresoReducer)
  ]
})
export class IngresoEgresoModule {
}
