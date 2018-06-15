import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Company} from './company.model';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  private _baseUrl = 'htpp://localhost:8080/webservices/v1/company';

  constructor(private httpClient: HttpClient) { }

  getCompanies(): Observable<Company[]> {
    return this.httpClient.get<Company[]>(this._baseUrl);
  }

  getCompaniesPage(page: string): Observable<Company[]> {
    const options = { params: new HttpParams()
        .set('page', page)};
    return this.httpClient.get<Company[]>(this._baseUrl, options);
  }

  getCompaniesPageLimit(page: string, limit: string): Observable<Company[]> {
    const options = { params: new HttpParams()
        .set('page', page)
        .set('limit', limit)};
    return this.httpClient.get<Company[]>(this._baseUrl, options);
  }

  getCompaniesSearchPageLimit(page: string, limit: string, search: string): Observable<Company[]> {
    const options = { params: new HttpParams()
        .set('page', page)
        .set('limit', limit)
        .set('search', search)};
    return this.httpClient.get<Company[]>(this._baseUrl, options);
  }

  getCompany(id: string): Observable<Company> {
    return this.httpClient.get<Company>(`${this._baseUrl}/${ id }`);
  }

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
