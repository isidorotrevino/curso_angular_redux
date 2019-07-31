import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import * as usuarioActions from '../actions';
import {catchError, map, switchMap} from 'rxjs/operators';
import {UsuarioService} from '../../services/usuario.service';
import {of} from 'rxjs';

@Injectable()
export class UsuarioEffects {

  @Effect()
  cargarUsuario$ = this.action$.pipe(
    ofType(usuarioActions.CARGAR_USUARIO))
    .pipe(
      switchMap((accion: usuarioActions.CargarUsuario) => {
        return this.usuariosService.getUserById(accion.id)
          .pipe(
            map(user => new usuarioActions.CargarUsuarioSuccess(user)),
            catchError(error => of(new usuarioActions.CargarUsuarioFail(error)))
          );
      })
    );

  constructor(private action$: Actions, public usuariosService: UsuarioService) {
  }


}
