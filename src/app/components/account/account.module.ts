import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountRoutingModule } from './account.routing';
import { SharesModule } from '@app/shares/shares.module';
import { SignUpComponent } from './sign-up/sign-up.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AccountComponent } from './account.component';


@NgModule({
  declarations: [
    SignUpComponent,
    SignInComponent,
    AccountComponent,
  ],
  imports: [
    CommonModule,
    AccountRoutingModule,
    ReactiveFormsModule,
    SharesModule
  ],
  exports: [
    SignUpComponent,
    SignInComponent,
  ]
})
export class AccountModule { }
