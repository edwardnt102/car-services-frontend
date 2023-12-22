import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { URL_API } from '@app/constants';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CarOwnerService {

  constructor(
    private http: HttpClient
  ) { }

  public getOwners(request): Observable<any> {
    const params = `?Page=${request.page}&PageSize=${request.pageSize}&SearchText=${request.searchText}`;
    return this.http.get<any>(`${URL_API}Customers${params}`);
  }

  public addOwnerCar(params): Observable<any> {
    return this.http.post<any>(`${URL_API}Customers/add`, params);
  }

  public updateOwnerCar(formData): Observable<any> {
    return this.http.post<any>(`${URL_API}Customers/update`, formData);
  }

  public delOwnerCar(id): Observable<any> {
    return this.http.delete<any>(`${URL_API}Customers/${id}`);
  }

  public suggestOwnerCar(searchText): Observable<any> {
    const param = `?textSearch=${searchText}`;
    return this.http.get<any>(`${URL_API}Customers/suggestion${param}`);
  }
}
