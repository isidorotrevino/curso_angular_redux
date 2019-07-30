import {Component, OnDestroy, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {AppState} from '../../app.reducer';
import {IngresoEgreso} from '../ingreso-egreso.model';
import {Subscription} from 'rxjs';
import {IngresoEgresoService} from '../ingreso-egreso.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styles: []
})
export class DetalleComponent implements OnInit, OnDestroy {

  items: IngresoEgreso[];
  subscription: Subscription = new Subscription();

  constructor(private store: Store<AppState>, public ingresoEgresoService: IngresoEgresoService) {
  }

  ngOnInit() {
    this.subscription = this.store.select('ingresoEgreso')
      .subscribe(ingresoEgreso => {
        console.log(ingresoEgreso);
        this.items = ingresoEgreso.items;
      });
  }


  borrarItem(item: IngresoEgreso) {
    this.ingresoEgresoService.eliminarIngresoEgreso(item.uid).then(() => {
      Swal.fire('Registro eliminado', item.descripcion, 'warning');
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
