import {Action} from '@ngrx/store';
import construct = Reflect.construct;
import {Usuario} from '../../models/usuario.model';


export const CARGAR_USUARIOS = '[Usuarios] - Cargar usuarios';
export const CARGAR_USUARIOS_FAIL = '[Usuarios] - Cargar usuario fail';
export const CARGAR_USUARIOS_SUCCESS = '[Usuarios] - Cargar usuario success';

export class CargarUsuarios implements Action {
  readonly type = CARGAR_USUARIOS;
}

export class CargarUsuariosFail implements Action {
  readonly type = CARGAR_USUARIOS_FAIL;

  constructor(public payload: any) {
  }
}

export class CargarUsuariosSuccess implements Action {
  readonly type = CARGAR_USUARIOS_SUCCESS;

  constructor(public usuarios: Usuario[]) {
  }
}

export type usuarioAcciones = CargarUsuarios | CargarUsuariosFail | CargarUsuariosSuccess;
