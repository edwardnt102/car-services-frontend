import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { URL_API } from '@app/constants';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WorkerService {

  constructor(
    private http: HttpClient
  ) { }

  public getWorker(request): Observable<any> {
    const params = `?Page=${request.page}&PageSize=${request.pageSize}&SearchText=${request.searchText}`;
    return this.http.get<any>(`${URL_API}Workers${params}`);
  }

  public addWorker(params): Observable<any> {
    return this.http.post<any>(`${URL_API}Workers/add`, params);
  }

  public updateWorker(formData): Observable<any> {
    return this.http.post<any>(`${URL_API}Workers/update`, formData);
  }

  public delWorker(id): Observable<any> {
    return this.http.delete<any>(`${URL_API}Workers/${id}`);
  }
}
