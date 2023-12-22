import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
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
import { NzSwitchModule } from 'ng-zorro-antd/switch';

import { WorkerRoutingModule } from './worker.routing';
import { WorkerComponent } from './worker.component';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';


@NgModule({
  declarations: [WorkerComponent],
  imports: [
    CommonModule,
    WorkerRoutingModule,
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
export class WorkerModule { }
