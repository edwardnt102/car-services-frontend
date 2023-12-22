import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { URL_API } from '@app/constants';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CarBrandService {

  constructor(
    private http: HttpClient
  ) { }

  public getCarBrand(request): Observable<any> {
    const params = `?Page=${request.page}&PageSize=${request.pageSize}&SearchText=${request.searchText}`;
    return this.http.get<any>(`${URL_API}Brands${params}`);
  }

  public addEditCarBrand(params): Observable<any> {
    return this.http.post<any>(`${URL_API}Brands/save`, params);
  }

  public suggestCarBrand(searchText: string): Observable<any> {
    const param = `?textSearch=${searchText}`;
    return this.http.get<any>(`${URL_API}Brands/suggestion${param}`);
  }

  public delCarBrand(id: number): Observable<any> {
    return this.http.delete<any>(`${URL_API}Brands/${id}`);
  }
}
