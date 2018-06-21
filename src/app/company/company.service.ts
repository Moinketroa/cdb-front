import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {Company} from './company.model';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  private _baseUrl = 'http://localhost:8090/webservices/v1/company';
  private _googleUrl = 'https://www.googleapis.com/customsearch/v1';
  private KEY = 'AIzaSyBOYe1ve3pr3OuOUBao-7R_xyROu1aBFhQ';

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

  update(company: Company): Observable<Company> {
     return this.httpClient.put<Company>(`${this._baseUrl}?id=${ company.id }`, company);
  }

  delete(company: Company): Observable<Company> {
     return this.httpClient.delete<Company>(`${this._baseUrl}/${ company.id }`);
  }

  getDetails(name: string): Observable<any> {
    const options = { params: new HttpParams()
        .set('key', this.KEY)
        .set('q', name)};
    return this.httpClient.get(this._googleUrl, options);
  }
}
