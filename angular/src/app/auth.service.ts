import { Injectable, OnDestroy } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import {Observable, Subject} from 'rxjs';
import {User} from './user';
import { JwtHelperService } from "@auth0/angular-jwt";

const jwtHelper = new JwtHelperService();
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

interface RegisterResponse {
  success: boolean,
  message: string,
  user: User;
}
interface AuthenticateResponse {
  success: boolean,
  token: string,
  message: string;
  user: User;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService implements  OnDestroy {
  private url = 'http://localhost:8080/users/';
  private authToken = new Subject<string>();
  isLoggedIn = new Subject<boolean>();


  constructor(private httpService: HttpClient) {
    if(this.isLoggedIn){
      this.logStatus = this.localToken;
    } else {
      this.isLoggedIn.next(false); // Just to initialize the logged in status, so the subscribers can get a value.
    }
  }
  ngOnDestroy() {
    //TODO: find out how to destroy a variable in js or ts.
    this.isLoggedIn.complete();
    this.isLoggedIn = undefined;
    this.authToken.complete();
    this.authToken = undefined;
  }

  register(user: User): Observable<RegisterResponse>{
    if (user.validateUser() && user.validateEmail()) {
      return this.httpService.post<RegisterResponse>(this.url + `register`,user, httpOptions );
    } else {
      ///TODO: return some error handler
      console.log('User validation failed at registration process.');
    }
  }
  authenticate(email: string, password: string): Observable<AuthenticateResponse>{
    return this.httpService.post<AuthenticateResponse>(this.url + `authenticate`,{email: email, password: password},httpOptions).pipe(
      tap(res => {
        if (res.success)  {
          this.localToken = res.token;
          this.logStatus = res.token;
          localStorage.setItem('user', JSON.stringify(res.user));
        } else {
          console.log(res);
        }
      })
    );
  }

  logOut(): void{
    this.isLoggedIn.next(false);
    localStorage.clear();
  }
  set localToken(value: string) {
    this.authToken.next(value); // this will make sure to tell every subscriber about the change.
    localStorage.setItem('id_token', value);
  }
  get localToken(): string {
    return localStorage.getItem('id_token');
  }
  get validateToken(): boolean {
    let token = this.localToken;
    if(token){
      return !jwtHelper.isTokenExpired(token);
    }else {
      return false;
    }
  }
  set logStatus(value: string){
    this.isLoggedIn.next(!jwtHelper.isTokenExpired(value));
  }
  // private handleError<T> (operation = 'operation', result?: T) {
  //   return (error: any): Observable<T> => {
  //
  //     // TODO: send the error to remote logging infrastructure
  //     console.error(error); // log to console instead
  //
  //     // TODO: better job of transforming error for user consumption
  //
  //     // send this to backend (`${operation} failed: ${error.message}`);
  //
  //     // Let the app keep running by returning an empty result.
  //     return of(result as T);
  //   };
  // }
}
