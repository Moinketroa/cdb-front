import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from './user.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  public static token_key = 'token';
  private _baseUrl = 'http://localhost:8090/webservices/authenticate';
  private _authUrl = '/auth';
  private _refreshUrl = '/refresh';

  constructor(private httpClient: HttpClient) {}

  authenticate(user: User): Observable<string> {
    return this.httpClient.post<string>(this._baseUrl + this._authUrl, user, {withCredentials : true});
  }

  refresh(token: string): Observable<string> {
    const token_modif: string = 'Bearer ' + token;
    const head: HttpHeaders = new HttpHeaders({token_modif});
    return this.httpClient.get<string>(this._baseUrl + this._refreshUrl, {headers: head, withCredentials: true});
  }

  isLogIn() {
    return localStorage.getItem(UserService.token_key) != null;
  }
}
