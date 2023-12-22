import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OwnerCarsComponent } from './owner-cars.component';


const routes: Routes = [
  {
    path: '',
    component: OwnerCarsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OwnerCarsRoutingModule { }
