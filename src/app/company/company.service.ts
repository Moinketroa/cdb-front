import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {Company} from './company.model';
import {Page} from '../page.model';
@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  private _baseUrl = 'http://localhost:8090/webservices/v1/company';

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

  getById(id: string): Observable<Company> {
    return this.httpClient.get<Company>(`${this._baseUrl}/${ id }`);
  }

  add(company: Company): Observable<Company> {
     return this.httpClient.post<Company>(this._baseUrl, company);
  }

  update(company: Company, id: string): Observable<Company> {
     return this.httpClient.put<Company>(`${this._baseUrl}/${ id }`, company);
  }

  delete(company: Company): Observable<Company> {
     return this.httpClient.delete<Company>(`${this._baseUrl}/${ company.id }`);
  }
}
