import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { URL_API } from '@app/constants';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CarsService {

  constructor(
    private http: HttpClient
  ) { }

  public getCars(request): Observable<any> {
    const params = `?Page=${request.page}&PageSize=${request.pageSize}&SearchText=${request.searchText}`;
    return this.http.get<any>(`${URL_API}Cars${params}`);
  }

  public addEditCars(params): Observable<any> {
    return this.http.post<any>(`${URL_API}Cars/save`, params);
  }

  public suggestCars(searchText: string): Observable<any> {
    const param = `?textSearch=${searchText}`;
    return this.http.get<any>(`${URL_API}Cars/suggestion${param}`);
  }

  public delCars(id: number): Observable<any> {
    return this.http.delete<any>(`${URL_API}Cars/${id}`);
  }
}
