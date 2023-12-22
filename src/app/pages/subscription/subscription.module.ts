import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SubscriptionRoutingModule } from './subscription.routing';
import { SubscriptionComponent } from './subscription.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzSwitchModule } from 'ng-zorro-antd/switch';
import { AddEditSubsComponent } from './add-edit-subs/add-edit-subs.component';


@NgModule({
  declarations: [
    SubscriptionComponent,
    AddEditSubsComponent
  ],
  imports: [
    CommonModule,
    SubscriptionRoutingModule,
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
export class SubscriptionModule { }
