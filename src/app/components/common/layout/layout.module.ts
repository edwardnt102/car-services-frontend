import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LayoutRoutingModule } from './layout.routing';
import { LayoutComponent } from './layout.component';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { IconsProviderModule } from '@app/icons-provider.module';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { AddUserComponent } from '../add-user/add-user.component';
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
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UpdateUserComponent } from '../update-user/update-user.component';


@NgModule({
  declarations: [
    LayoutComponent,
    AddUserComponent,
    UpdateUserComponent
  ],
  imports: [
    CommonModule,
    IconsProviderModule,
    FormsModule,
    ReactiveFormsModule,
    NzLayoutModule,
    NzMenuModule,
    NzToolTipModule,
    LayoutRoutingModule,
    NzBreadCrumbModule,
    NzAvatarModule,
    NzDropDownModule,
    NzDividerModule,
    NzTypographyModule,
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
    NzPopconfirmModule
  ]
})
export class LayoutModule { }
