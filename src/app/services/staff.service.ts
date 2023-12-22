import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { URL_API } from '@app/constants';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StaffService {

  constructor(
    private http: HttpClient
  ) { }

  public getStaffs(request): Observable<any> {
    const params = `?Page=${request.page}&PageSize=${request.pageSize}&SearchText=${request.searchText}`;
    return this.http.get<any>(`${URL_API}Staffs${params}`);
  }

  public addStaff(params): Observable<any> {
    return this.http.post<any>(`${URL_API}Staffs/add`, params);
  }

  public updateStaff(formData): Observable<any> {
    return this.http.post<any>(`${URL_API}Staffs/update`, formData);
  }

  public delStaff(id): Observable<any> {
    return this.http.delete<any>(`${URL_API}Staffs/${id}`);
  }
}
