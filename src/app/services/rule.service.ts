import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { URL_API } from '@app/constants';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RuleService {

  constructor(
    private http: HttpClient
  ) { }

  public getRules(request): Observable<any> {
    const params = `?Page=${request.page}&PageSize=${request.pageSize}&SearchText=${request.searchText}`;
    return this.http.get<any>(`${URL_API}Rules${params}`);
  }

  public addEditRules(params): Observable<any> {
    return this.http.post<any>(`${URL_API}Rules/save`, params);
  }

  public suggestRules(searchText: string): Observable<any> {
    const param = `?textSearch=${searchText}`;
    return this.http.get<any>(`${URL_API}Rules/suggestion${param}`);
  }

  public delRules(id: number): Observable<any> {
    return this.http.delete<any>(`${URL_API}Rules/${id}`);
  }
}
