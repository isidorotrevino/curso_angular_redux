import {Injectable} from '@angular/core';
import {CanActivate, CanLoad, Route, Router, UrlSegment} from '@angular/router';
import {AuthService} from './auth.service';
import {take} from 'rxjs/operators';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate, CanLoad {

  constructor(private router: Router, public authService: AuthService) {
  }

  canActivate() {
    return this.authService.isAuth();
  }

  canLoad(route: Route, segments: UrlSegment[]): Observable<boolean> | Promise<boolean> | boolean {
    return this.authService.isAuth()
      .pipe(
        take(1)
      );
  }
}
