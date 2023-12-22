import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { URL_API } from '@app/constants';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  constructor(
    private http: HttpClient
  ) { }

  public getCompanies(request): Observable<any> {
    const params = `?Page=${request.page}&PageSize=${request.pageSize}&SearchText=${request.searchText}`;
    return this.http.get<any>(`${URL_API}Companies${params}`);
  }

  public addEditCompanies(params): Observable<any> {
    return this.http.post<any>(`${URL_API}Companies/save`, params);
  }

  public suggestCompanies(searchText: string): Observable<any> {
    const param = `?textSearch=${searchText}`;
    return this.http.get<any>(`${URL_API}Companies/suggestion${param}`);
  }

  public delCompanies(id: number): Observable<any> {
    return this.http.delete<any>(`${URL_API}Companies/${id}`);
  }
}
