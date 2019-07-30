import {Injectable} from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {IngresoEgreso} from './ingreso-egreso.model';
import {AuthService} from '../auth/auth.service';
import {AppState} from '../app.reducer';
import {Store} from '@ngrx/store';
import {filter, map} from 'rxjs/operators';
import {SetItemsAction, UnsetItemsAction} from './ingreso-egreso.actions';
import {Subscription} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IngresoEgresoService {

  constructor(private afDB: AngularFirestore,
              public authService: AuthService,
              private store: Store<AppState>) {
  }

  ingresoEgresoListenerSubscription: Subscription = new Subscription();
  ingresoEgresoItemsSubscription: Subscription = new Subscription();

  cancelarSuscripciones(){
    this.ingresoEgresoItemsSubscription.unsubscribe();
    this.ingresoEgresoItemsSubscription.unsubscribe();
    this.store.dispatch(new UnsetItemsAction());
  }

  initIngresoEgresoListener() {
    this.ingresoEgresoListenerSubscription = this.store.select('auth')
      .pipe(
        filter(auth => auth.user != null)
      )
      .subscribe(auth => {
        this.ingresoEgresoItems(auth.user.uid);
      });

  }

  private ingresoEgresoItems(uid: string) {
    this.ingresoEgresoItemsSubscription = this.afDB.collection(`${uid}/ingresos-egresos/items`)
      .snapshotChanges()
      .pipe(
        map(docData => {
          return docData.map(doc => {
            return {
              ...doc.payload.doc.data(),
              uid: doc.payload.doc.id
            };
          });
        })
      )
      .subscribe((coleccion: any[]) => {
        console.log(coleccion);
        this.store.dispatch(new SetItemsAction(coleccion));
      });
  }

  crearIngresoEgreso(ingresoEgreso: IngresoEgreso) {
    const user = this.authService.getUsuario();
    return this.afDB.doc(`${user.uid}/ingresos-egresos`)
      .collection('items').add({...ingresoEgreso});

  }

  eliminarIngresoEgreso(uid: string){
    const user = this.authService.getUsuario();
    return this.afDB.doc(`${user.uid}/ingresos-egresos/items/${uid}`)
      .delete();
  }

}
