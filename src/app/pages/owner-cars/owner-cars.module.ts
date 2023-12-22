import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { NzSwitchModule } from 'ng-zorro-antd/switch';

import { OwnerCarsRoutingModule } from './owner-cars.routing';
import { OwnerCarsComponent } from './owner-cars.component';

@NgModule({
  declarations: [
    OwnerCarsComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    OwnerCarsRoutingModule,
    NzTableModule,
    NzFormModule,
    NzButtonModule,
    NzIconModule,
    NzInputModule,
    NzSpinModule,
    NzSwitchModule,
    NzPopconfirmModule
  ],
  providers: [{
    provide: NzModalRef,
    useValue: {
      getInstance: () => {
        return {
          setFooterWithTemplate: () => { }
        };
      }
    }
  }]
})
export class OwnerCarsModule { }
