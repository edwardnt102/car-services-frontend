import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CarBrandRoutingModule } from './car-brand.routing';
import { CarBrandComponent } from './car-brand.component';
import { AddEditBrandComponent } from './add-edit-brand/add-edit-brand.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';


@NgModule({
  declarations: [
    CarBrandComponent,
    AddEditBrandComponent
  ],
  imports: [
    CommonModule,
    CarBrandRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NzTableModule,
    NzFormModule,
    NzButtonModule,
    NzIconModule,
    NzInputModule,
    NzSpinModule,
    NzPopconfirmModule
  ]
})
export class CarBrandModule { }
