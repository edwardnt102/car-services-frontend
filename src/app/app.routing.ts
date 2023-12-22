import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageNotFoundComponent } from './components/common/page-not-found/page-not-found.component';
import { SignInComponent } from './components/account/sign-in/sign-in.component';
import { SignUpComponent } from './components/account/sign-up/sign-up.component';
import { AuthGuard } from './helpers/auth.guard';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/admin' },
  { path: 'account', loadChildren: () => import('@components/account/account.module').then(m => m.AccountModule) },
  {
    path: 'admin',
    loadChildren: () => import('@components/common/layout/layout.module').then(m => m.LayoutModule),
    canActivate: [AuthGuard],
    data: {
      breadcrumb: 'Quản lý'
    },
  },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
