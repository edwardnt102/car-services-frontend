import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { URL_API } from '@app/constants';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PlacesService {

  constructor(
    private http: HttpClient
  ) { }

  public getPlaces(request): Observable<any> {
    const params = `?Page=${request.page}&PageSize=${request.pageSize}&SearchText=${request.searchText}`;
    return this.http.get<any>(`${URL_API}Places${params}`);
  }

  public addEditPlaces(params): Observable<any> {
    return this.http.post<any>(`${URL_API}Places/save`, params);
  }

  public suggestPlaces(searchText: string): Observable<any> {
    const param = `?textSearch=${searchText}`;
    return this.http.get<any>(`${URL_API}Places/suggestion${param}`);
  }

  public delPlaces(id: number): Observable<any> {
    return this.http.delete<any>(`${URL_API}Places/${id}`);
  }
}
