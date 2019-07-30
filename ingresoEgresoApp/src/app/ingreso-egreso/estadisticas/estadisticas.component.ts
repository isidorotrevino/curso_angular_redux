import {Component, OnInit} from '@angular/core';
import {AppState} from '../../app.reducer';
import {Subscription} from 'rxjs';
import {Store} from '@ngrx/store';
import {IngresoEgreso} from '../ingreso-egreso.model';
import {IngresoEgresoReducerAppState} from '../ingreso-egreso.reducer';

@Component({
  selector: 'app-estadisticas',
  templateUrl: './estadisticas.component.html',
  styles: []
})
export class EstadisticasComponent implements OnInit {

  ingresos: number;
  egresos: number;
  cantIngresos: number;
  cantEgresos: number;

  subscription: Subscription = new Subscription();

  public doughnutChartLabels: string[] = ['Ingresos', 'Egresos'];
  public doughnutChartData: number[] = [];

  constructor(private store: Store<IngresoEgresoReducerAppState>) {
  }

  ngOnInit() {
    this.subscription = this.store.select('ingreso-egreso')
      .subscribe(ingresoEgreso => {
        this.contarIngresoEgreso(ingresoEgreso.items);
      });
  }

  contarIngresoEgreso(items: IngresoEgreso[]) {
    this.ingresos = 0;
    this.egresos = 0;
    this.cantEgresos = 0;
    this.cantIngresos = 0;

    items.forEach(item => {
      if (item.tipo === 'ingreso') {
        this.cantIngresos++;
        this.ingresos += item.monto;
      } else {
        this.cantEgresos++;
        this.egresos += item.monto;
      }

    });
    this.doughnutChartData = [this.ingresos, this.egresos];
  }

}
