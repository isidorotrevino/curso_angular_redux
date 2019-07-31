import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import * as usuariosActions from '../actions';
import {catchError, map, switchMap} from 'rxjs/operators';
import {UsuarioService} from '../../services/usuario.service';
import {of} from 'rxjs';

@Injectable()
export class UsuariosEffects {

  @Effect()
  cargarUsuarios$ = this.actions$.pipe(
    ofType(usuariosActions.CARGAR_USUARIOS))
    .pipe(
      switchMap(() => {
        return this.usuariosService.getUsers()
          .pipe(
            map(users => new usuariosActions.CargarUsuariosSuccess(users)),
            catchError(error => of(new usuariosActions.CargarUsuariosFail(error)))
          );
      })
    );

  constructor(private actions$: Actions, public usuariosService: UsuarioService) {
  }


}
