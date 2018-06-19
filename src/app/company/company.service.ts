import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {Company} from './company.model';
import {Page} from '../page.model';
@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  private _baseUrl = 'http://localhost:8090/webservices/company';

  constructor(private httpClient: HttpClient) { }

  get({page = 1, limit = 10}): Observable<any> {
    return this.httpClient.get(this._baseUrl + `?page=${ page }&limit=${ limit }`);
  }
  //
  // getPage(page: string): Observable<Company[]> {
  //   const options = { params: new HttpParams()
  //       .set('page', page)};
  //   return new Observable<Page<Company> >(new Page<Company>(this.httpClient.get<Company[]>(this._baseUrl, options)));
  // }
  //
  // getPage(page: string, limit: string): Observable<Company[]> {
  //   const options = { params: new HttpParams()
  //       .set('page', page)
  //       .set('limit', limit)};
  //   return new Observable<Page<Company> >(new Page<Company>(this.httpClient.get<Company[]>(this._baseUrl, options)));
  // }
  //
  // search(page: string, limit: string, search: string): Observable<Company[]> {
  //   const options = { params: new HttpParams()
  //       .set('page', page)
  //       .set('limit', limit)
  //       .set('search', search)};
  //   return new Observable<Page<Company> >(new Page<Company>(this.httpClient.get<Company[]>(this._baseUrl, options)));
  // }
  //
  getSingle(id: number): Observable<Company> {
    return this.httpClient.get<Company>(`${this._baseUrl}?id=${ id }`);
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
}
