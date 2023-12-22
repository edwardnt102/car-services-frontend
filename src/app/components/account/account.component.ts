import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '@app/services/authentication.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html'
})
export class AccountComponent implements OnInit {

  constructor(
    private router: Router,
    private authentService: AuthenticationService
  ) {
    if (this.authentService.userValue) {
      this.router.navigate(['/']);
    }
  }

  ngOnInit(): void {
  }

}
