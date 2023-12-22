import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '@app/models/user';
import { BehaviorSubject, Observable } from 'rxjs';
import {map} from 'rxjs/operators';
import { URL_API } from '../constants';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private userSubject: BehaviorSubject<User>;
  public user: Observable<User>;
  constructor(
    private http: HttpClient,
    private router: Router
  ) {
    this.userSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('user')));
    this.user = this.userSubject.asObservable();
  }

  public get userValue(): User {
    return this.userSubject.value;
  }

  public signIn(username: string, passWord: string) {
    const userName = username.trim();
    const password = passWord.trim();

    return this.http.post<any>(`${URL_API}Authentication/login`, { userName, password }).pipe(
      map(user => {
        // store user details and basic auth credentials in local storage to keep user logged in between page refreshes
        // user.authdata = window.btoa(userName + ':' + password);
        localStorage.setItem('user', JSON.stringify(user.data));
        this.userSubject.next(user);
        return user;
      })
    )
  }

  public logout() {
    localStorage.removeItem('user');
    this.userSubject.next(null);
    this.router.navigate(['/account/sign-in']);
  }
}
