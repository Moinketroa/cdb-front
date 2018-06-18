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

  getCompanies({page = 1, limit = 10}): Observable<any> {
    return this.httpClient.get(this._baseUrl + `?page=${ page }&limit=${ limit }`);
  }
  //
  // getCompaniesPage(page: string): Observable<Company[]> {
  //   const options = { params: new HttpParams()
  //       .set('page', page)};
  //   return new Observable<Page<Company> >(new Page<Company>(this.httpClient.get<Company[]>(this._baseUrl, options)));
  // }
  //
  // getCompaniesPageLimit(page: string, limit: string): Observable<Company[]> {
  //   const options = { params: new HttpParams()
  //       .set('page', page)
  //       .set('limit', limit)};
  //   return new Observable<Page<Company> >(new Page<Company>(this.httpClient.get<Company[]>(this._baseUrl, options)));
  // }
  //
  // getCompaniesSearchPageLimit(page: string, limit: string, search: string): Observable<Company[]> {
  //   const options = { params: new HttpParams()
  //       .set('page', page)
  //       .set('limit', limit)
  //       .set('search', search)};
  //   return new Observable<Page<Company> >(new Page<Company>(this.httpClient.get<Company[]>(this._baseUrl, options)));
  // }
  //
  // getCompany(id: string): Observable<Company> {
  //   return new Observable<Page<Company> >(new Page<Company>(this.httpClient.get<Company>(`${this._baseUrl}/${ id }`)));
  // }

  addCompany(company: Company) {
    this.httpClient.post(this._baseUrl, company).subscribe();
  }

  updateCompany(company: Company, id: string) {
    this.httpClient.put(`${this._baseUrl}/${ id }`, company).subscribe();
  }

  deleteCompany(company: Company) {
    this.httpClient.delete(`${this._baseUrl}/${ company.id }`).subscribe();
  }
}
