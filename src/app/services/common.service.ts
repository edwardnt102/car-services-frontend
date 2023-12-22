import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { URL_API } from '@app/constants';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor(private http: HttpClient) { }

  public getDistrict(id): Observable<any> {
    const params = `?provinceId=${id}`;
    return this.http.get<any>(`${URL_API}District/suggestion${params}`);
  }

  public getProvince(): Observable<any> {
    return this.http.get<any>(`${URL_API}province/suggestion`);
  }

  public getLocation(provinceId, districId): Observable<any> {
    const url = `location/suggestion?provinceId=${provinceId}&districtId=${districId}`;
    return this.http.get<any>(`${URL_API}${url}`);
  }

  public suggestCarClass(searchText: string): Observable<any> {
    const param = `?textSearch=${searchText}`;
    return this.http.get<any>(`${URL_API}Class/suggestion${param}`);
  }

}
