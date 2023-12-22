import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from '@app/services/authentication.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {
  signinForm!: FormGroup;
  isSpinning = false;
  returnUrl: string;
  error: string;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private athuService: AuthenticationService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.signinForm = this.fb.group({
      userName: [null, [Validators.required]],
      password: [null, [Validators.required]],
      remember: [false]
    });

    this.returnUrl = this.route.snapshot.queryParams.returnUrl || '/admin';
  }

  get f() { return this.signinForm.controls; }

  public submitForm(): void {
    this.isSpinning = true;
    if (this.signinForm.invalid) {
      return;
    }

    this.athuService.signIn(this.f.userName.value, this.f.password.value)
      .pipe(first())
      .subscribe(
        // tslint:disable-next-line:no-unused-expression
        data => {
          this.isSpinning = false;
          // tslint:disable-next-line:no-unused-expression
          this.router.navigate([this.returnUrl]);
        },
        error => {
          this.error = error;
          this.isSpinning = false;
        }
      )
  }
}
