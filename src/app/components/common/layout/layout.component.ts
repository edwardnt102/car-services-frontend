import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '@app/services/authentication.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {
  isCollapsed = false;
  userName = '';
  urlImage = '';
  constructor(private authService: AuthenticationService) { }

  ngOnInit(): void {
    this.userName = this.authService.userValue.username;
    this.urlImage = this.authService.userValue.avatarUrl;
  }

  // tslint:disable-next-line:typedef
  logOut() {
    this.authService.logout();
  }

}
