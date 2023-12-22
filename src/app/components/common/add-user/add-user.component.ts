import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CarOwnerService } from '@app/services/car-owner.service';
import { CommonService } from '@app/services/common.service';
import { StaffService } from '@app/services/staff.service';
import { WorkerService } from '@app/services/worker.service';
import * as moment from 'moment';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent implements OnInit {

  @Input() add: string;
  isOkLoading = false;
  validateForm: FormGroup;
  provinces = [];
  districts = [];
  pId = '';
  wards = [];
  loading = false;
  dateFormat = 'dd/MM/yyyy';

  constructor(
    private fb: FormBuilder,
    private ownerService: CarOwnerService,
    private staffService: StaffService,
    private workerService: WorkerService,
    private commonService: CommonService,
    private toastService: ToastrService,
    private modal: NzModalRef
  ) { }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      userName: ['', [Validators.required, this.noWhitespaceValidator]],
      phoneNumber: ['', [Validators.required, this.noWhitespaceValidator]],
      email: ['', [Validators.required, Validators.email]],
      dateOfBirth: ['', [Validators.required]],
      gender: ['', [Validators.required]],
      fullName: ['', [Validators.required, this.noWhitespaceValidator]],
      address: ['', [Validators.required, this.noWhitespaceValidator]],
      provinceId: ['', [Validators.required]],
      districtId: ['', [Validators.required]],
      wardId: ['', [Validators.required]],
    });

    this.getProvince();
  }

  public get userName() {
    return this.validateForm.get('userName');
  }
  public get email() {
    return this.validateForm.get('email');
  }

  destroyModal(reLoad): void {
    this.modal.destroy({ reLoad });
  }

  public noWhitespaceValidator(control: FormControl): any {
    const isWhitespace = (control.value || '').trim().length === 0;
    const isValid = !isWhitespace;
    return isValid ? null : { whitespace: true };
  }

  private getProvince(): void {
    this.commonService.getProvince().subscribe(data => {
      if (data.responseCode === 200) {
        this.provinces = data.listData;
      }
    });
  }

  public getDistrict(id): void {
    this.pId = id;
    if (id) {
      this.commonService.getDistrict(id).subscribe(data => {
        if (data.responseCode === 200) {
          this.districts = data.listData;
        }
      });
    }
  }

  public getWard(id): void {
    if (this.pId && id) {
      this.commonService.getLocation(this.pId, id).subscribe(data => {
        if (data.responseCode === 200) {
          this.wards = data.listData;
        }
      });
    }
  }

  submitForm(value): void {
    // tslint:disable-next-line:forin
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }

    if (this.validateForm.invalid) {
      return;
    }

    this.loading = true;
    const params = { ...value, dateOfBirth: moment(value.dateOfBirth).format() };

    switch (this.add) {
      case 'worker':
        const respWorker = this.workerService.addWorker(params);
        this.callApi(respWorker);
        break;
      case 'staff':
        const respStaff = this.staffService.addStaff(params);
        this.callApi(respStaff);
        break;
      case 'customer':
        const respCustomer = this.ownerService.addOwnerCar(params);
        this.callApi(respCustomer);
        break;

      default:
        break;
    }
  }


  private callApi(resp): any {
    resp.subscribe(
      data => {
        if (data.responseCode === 200) {
          this.loading = false;
          this.toastService.success('Lưu thành công!');
          this.destroyModal(true);
        }
      },
      err => {
        this.loading = false;
        this.toastService.error('Lưu không thành công!');
      }
    );
  }

}
