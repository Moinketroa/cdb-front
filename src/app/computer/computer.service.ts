import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {Company} from '../company/company.model';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Computer} from './computer.model';
import {catchError} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ComputerService {

  private _baseUrl = 'http://localhost:8090/webservices/v1/computer';

  constructor(private httpClient: HttpClient) { }

  get({page = 1, limit = 10}, order: string): Observable<any> {
    const options = { params: new HttpParams()
        .set('page', page.toString())
        .set('limit', limit.toString())
        .set('order', order)};
    return this.httpClient.get(this._baseUrl, options);
  }

  search({page = 1, limit = 10}, search: string, order: string): Observable<any> {
    const options = { params: new HttpParams()
        .set('page', page.toString())
        .set('limit', limit.toString())
        .set('search', search)
        .set('order', order)
      };
    return this.httpClient.get(this._baseUrl, options);
  }

  getById(id: string): Observable<Computer> {
    return this.httpClient.get<Computer>(`${this._baseUrl}/${ id }`);
  }

  add(computer: Computer): Observable<Computer> {
    console.log(computer);
    return this.httpClient.post<Computer>(this._baseUrl, computer);
  }

  update(computer: Computer): Observable<Computer> {
    return this.httpClient.put<Computer>(`${this._baseUrl}`, computer);
  }

  delete(id: Number): Observable<Number> {
    return this.httpClient.delete<Number>(`${this._baseUrl}/${ id }`);
  }
}
