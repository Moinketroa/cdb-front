import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from './user.model';
import { Observable } from 'rxjs';
import { LoginComponent } from './login/login.component';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private _baseUrl = 'http://localhost:8090/webservices/authenticate';
  private _authUrl = '/auth';
  private _refreshUrl = '/refresh';

  constructor(private httpClient: HttpClient) {}

  authenticate(user: User) {
    return this.httpClient.post<string>(this._baseUrl + this._authUrl, user);
  }

  refresh(token: string): Observable<string> {
    const token_modif: string = 'Bearer ' + token;
    const head: HttpHeaders = new HttpHeaders({token_modif});
    return this.httpClient.get<string>(this._baseUrl + this._refreshUrl, {headers: head});
  }

  isLogIn() {
    return localStorage.getItem(LoginComponent.token_key) != null;
  }
}
