import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CarModelComponent } from './car-model.component';

const routes: Routes = [
  {
    path: '',
    component: CarModelComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CarModelRoutingModule { }
