import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StaffsRoutingModule } from './staffs.routing';
import { StaffsComponent } from './staffs.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OwnerCarsRoutingModule } from '../owner-cars/owner-cars.routing';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzUploadModule } from 'ng-zorro-antd/upload';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { NzSwitchModule } from 'ng-zorro-antd/switch';

@NgModule({
  declarations: [StaffsComponent],
  imports: [
    CommonModule,
    StaffsRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    OwnerCarsRoutingModule,
    NzTableModule,
    NzFormModule,
    NzButtonModule,
    NzIconModule,
    NzInputModule,
    NzModalModule,
    NzGridModule,
    NzSelectModule,
    NzDatePickerModule,
    NzSpinModule,
    NzUploadModule,
    NzPopconfirmModule,
    NzSwitchModule
  ]
})
export class StaffsModule { }
