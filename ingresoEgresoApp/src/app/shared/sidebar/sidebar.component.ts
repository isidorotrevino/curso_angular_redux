import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthService} from 'src/app/auth/auth.service';
import {Subscription} from 'rxjs';
import {Store} from '@ngrx/store';
import {AppState} from '../../app.reducer';
import {filter} from 'rxjs/operators';
import {IngresoEgresoService} from '../../ingreso-egreso/ingreso-egreso.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: []
})
export class SidebarComponent implements OnInit, OnDestroy {

  usuario: string;
  subscription: Subscription = new Subscription();

  constructor(private authService: AuthService,
              private store: Store<AppState>,
              public ingresoEgresoService: IngresoEgresoService) {
  }

  ngOnInit() {
    this.subscription = this.store.select('auth')
      .pipe(
        filter(auth => auth.user != null)
      )
      .subscribe(auth => {
        this.usuario = auth.user.nombre;
      });
  }

  logout() {
    this.authService.logout();
    this.ingresoEgresoService.cancelarSuscripciones();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
