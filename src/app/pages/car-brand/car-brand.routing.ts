import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CarBrandComponent } from './car-brand.component';

const routes: Routes = [
  {
    path: '',
    component: CarBrandComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CarBrandRoutingModule { }
