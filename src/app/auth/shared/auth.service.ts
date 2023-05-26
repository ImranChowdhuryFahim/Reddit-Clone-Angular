import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable, Output } from '@angular/core';
import { LocalStorageService } from './local-storage.service';
import { SignupRequestPayload } from '../sign-up/signup-request.payload';
import { Observable, throwError } from 'rxjs';
import { LoginRequestPayload } from '../login/login-request.payload';
import { LoginResponsePayload } from '../login/login-response.payload';
import { map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  @Output() loggedIn: EventEmitter<boolean> = new EventEmitter();
  @Output() username: EventEmitter<string> = new EventEmitter();

  refreshTokenPayload = {
    refreshToken: this.getRefreshToken(),
    username: this.getUserName()
  }

  constructor(private httpClient:HttpClient, private localStorage:LocalStorageService) { }

  signup(signupRequestPayload: SignupRequestPayload): Observable<any>{
    return this.httpClient.post('http://localhost:8080/api/auth/signup',signupRequestPayload,{responseType:'text'})
  }

  login(loginRequestPayload: LoginRequestPayload): Observable<boolean> {
    return this.httpClient.post<LoginResponsePayload>('http://localhost:8080/api/auth/login',
      loginRequestPayload).pipe(map(data => {
        this.localStorage.saveData('authenticationToken', data.authenticationToken);
        this.localStorage.saveData('username', data.username);
        this.localStorage.saveData('refreshToken', data.refreshToken);
        this.localStorage.saveData('expiresAt', data.expiresAt.toString());

        this.loggedIn.emit(true);
        this.username.emit(data.username);
        return true;
      }));
  }

  getJwtToken() {
    return this.localStorage.getData('authenticationToken');
  }

  refreshToken() {
    return this.httpClient.post<LoginResponsePayload>('http://localhost:8080/api/auth/refresh/token',
      this.refreshTokenPayload)
      .pipe(tap(response => {
        this.localStorage.removeData('authenticationToken');
        this.localStorage.removeData('expiresAt');

        this.localStorage.saveData('authenticationToken',
          response.authenticationToken);
        this.localStorage.saveData('expiresAt', response.expiresAt.toString());
      }));
  }

  logout() {
    this.httpClient.post('http://localhost:8080/api/auth/logout', this.refreshTokenPayload,
      { responseType: 'text' })
      .subscribe(data => {
        console.log(data);
      }, error => {
        throwError(error);
      })
    this.localStorage.removeData('authenticationToken');
    this.localStorage.removeData('username');
    this.localStorage.removeData('refreshToken');
    this.localStorage.removeData('expiresAt');
  }

  getUserName() {
    return this.localStorage.getData('username');
  }
  getRefreshToken() {
    return this.localStorage.getData('refreshToken');
  }

  isLoggedIn(): boolean {
    return this.getJwtToken() != null;
  }



}
