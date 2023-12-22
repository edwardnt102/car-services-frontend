import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { URL_API } from '@app/constants';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CarModelService {

  constructor(private http: HttpClient) { }

  public getCarModel(request): Observable<any> {
    const params = `?Page=${request.page}&PageSize=${request.pageSize}&SearchText=${request.searchText}`;
    return this.http.get<any>(`${URL_API}CarModels${params}`);
  }

  public addEditCarModel(params): Observable<any> {
    return this.http.post<any>(`${URL_API}CarModels/save`, params);
  }

  public suggestCarModel(searchText: string): Observable<any> {
    const param = `?textSearch=${searchText}`;
    return this.http.get<any>(`${URL_API}CarModels/suggestion${param}`);
  }

  public delCarModel(id: number): Observable<any> {
    return this.http.delete<any>(`${URL_API}CarModels/${id}`);
  }
}
