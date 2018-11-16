import { Injectable } from '@angular/core';
import { Router, CanActivate} from '@angular/router';
import { JwtHelperService} from '@auth0/angular-jwt';

const jwtHelper = new JwtHelperService();

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(private router: Router) { }

  canActivate() {
    const localToken = localStorage.getItem('id_token');
    if (!jwtHelper.isTokenExpired(localToken)) {
      return true;
    }

    this.router.navigate(['/login']);
    return false;
  }

  isLoggedIn(): boolean {
    const localToken = localStorage.getItem('id_token');
    return jwtHelper.isTokenExpired(localToken);
  }
}
