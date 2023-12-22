import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { URL_API } from '@app/constants';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PricesService {

  constructor(
    private http: HttpClient
  ) { }

  public getPrices(request): Observable<any> {
    const params = `?Page=${request.page}&PageSize=${request.pageSize}&SearchText=${request.searchText}`;
    return this.http.get<any>(`${URL_API}Prices${params}`);
  }

  public addEditPrices(params): Observable<any> {
    return this.http.post<any>(`${URL_API}Prices/save`, params);
  }

  public suggestPrices(searchText: string): Observable<any> {
    const param = `?textSearch=${searchText}`;
    return this.http.get<any>(`${URL_API}Prices/suggestion${param}`);
  }

  public delPrices(id: number): Observable<any> {
    return this.http.delete<any>(`${URL_API}Prices/${id}`);
  }
}
