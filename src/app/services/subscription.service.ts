import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { URL_API } from '@app/constants';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SubscriptionService {

  constructor(
    private http: HttpClient
  ) { }

  public getSubscriptions(request): Observable<any> {
    const params = `?Page=${request.page}&PageSize=${request.pageSize}&SearchText=${request.searchText}`;
    return this.http.get<any>(`${URL_API}Subscriptions${params}`);
  }

  public addEditSubscriptions(params): Observable<any> {
    return this.http.post<any>(`${URL_API}Subscriptions/save`, params);
  }

  public suggestSubscriptions(searchText: string): Observable<any> {
    const param = `?textSearch=${searchText}`;
    return this.http.get<any>(`${URL_API}Subscriptions/suggestion${param}`);
  }

  public delSubscriptions(id: number): Observable<any> {
    return this.http.delete<any>(`${URL_API}Subscriptions/${id}`);
  }
}
