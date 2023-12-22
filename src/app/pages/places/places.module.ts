import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PlacesRoutingModule } from './places.routing';
import { PlacesComponent } from './places.component';
import { AddEditPlaceComponent } from './add-edit-place/add-edit-place.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzSwitchModule } from 'ng-zorro-antd/switch';


@NgModule({
  declarations: [
    PlacesComponent,
    AddEditPlaceComponent
  ],
  imports: [
    CommonModule,
    PlacesRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NzTableModule,
    NzFormModule,
    NzButtonModule,
    NzIconModule,
    NzInputModule,
    NzSpinModule,
    NzPopconfirmModule,
    NzSelectModule,
    NzSwitchModule
  ]
})
export class PlacesModule { }
