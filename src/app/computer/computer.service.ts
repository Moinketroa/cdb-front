import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {Company} from '../company/company.model';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Computer} from './computer.model';

@Injectable({
  providedIn: 'root'
})
export class ComputerService {

  private _baseUrl = 'http://localhost:8080/webservices/computer';

  constructor(private httpClient: HttpClient) { }

  get({page = 1, limit = 10}): Observable<any> {
    const options = { params: new HttpParams()
        .set('page', page.toString())
        .set('limit', limit.toString())};
    return this.httpClient.get(this._baseUrl, options);
  }

  search({page = 1, limit = 10}, search: string): Observable<any> {
    const options = { params: new HttpParams()
        .set('page', page.toString())
        .set('limit', limit.toString())
        .set('search', search)};
    return this.httpClient.get(this._baseUrl, options);
  }

  getById(id: string): Observable<Computer> {
    return this.httpClient.get<Computer>(`${this._baseUrl}?id=${ id }`);
  }

  add(computer: Computer): Observable<Computer> {
    return this.httpClient.post<Computer>(this._baseUrl, computer);
  }

  update(computer: Computer, id: string): Observable<Computer> {
    return this.httpClient.put<Computer>(`${this._baseUrl}/${ id }`, computer);
  }

  delete(computer: Computer): Observable<Computer> {
    return this.httpClient.delete<Computer>(`${this._baseUrl}/${ computer.id }`);
  }
}
