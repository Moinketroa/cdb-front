import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {Company} from './company.model';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  private _baseUrl = 'http://localhost:8090/webservices/v1/company';

  constructor(private httpClient: HttpClient) { }

  get({page = 1, limit = 10}, order: string = 'BY_NAME'): Observable<any> {
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

  getById(id: string): Observable<Company> {
    const options = { params: new HttpParams()
      .set('fetch', 'EAGER')};
    return this.httpClient.get<Company>(`${this._baseUrl}/${ id }`, options);
  }

  add(company: Company): Observable<Company> {
     return this.httpClient.post<Company>(this._baseUrl, company);
  }

  update(company: Company): Observable<Company> {
    console.log(company);
     return this.httpClient.put<Company>(`${this._baseUrl}?id=${ company.id }`, company);
  }

  delete(company: Company): Observable<Number> {
     return this.httpClient.delete<Number>(`${this._baseUrl}/${ company.id }`);
  }
}
