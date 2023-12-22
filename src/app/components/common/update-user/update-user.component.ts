import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { OwnerData } from '@app/models/owner';
import { CarOwnerService } from '@app/services/car-owner.service';
import { CommonService } from '@app/services/common.service';
import { StaffService } from '@app/services/staff.service';
import { WorkerService } from '@app/services/worker.service';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.scss']
})
export class UpdateUserComponent implements OnInit {
  validateForm: FormGroup;
  provinces = [];
  districts = [];
  pId = '';
  wards = [];
  loading = false;
  dateFormat = 'dd/MM/yyyy';
  @Input() data: OwnerData;
  @Input() edit: string;

  constructor(
    private fb: FormBuilder,
    private ownerService: CarOwnerService,
    private commonService: CommonService,
    private toastService: ToastrService,
    private modal: NzModalRef,
    private workerService: WorkerService,
    private staffService: StaffService
  ) { }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      id: ['', [Validators.required]],
      userId: ['', [Validators.required]],
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
      facebook: ['', [Validators.required]],
      zalo: [''],
      phoneNumberOther: [''],
      subtitle: [''],
      description: [''],
      roomAndOutNumber: [''],
      placeId: [1],
      attachmentFiles: this.fb.array([])
    });

    this.validateForm.patchValue(this.data);

    this.getProvince();
    this.getDistrict(this.data.provinceId);
    this.getWard(this.data.districtId);
  }


  createItem(data): FormGroup {
    return this.fb.group(data);
  }

  get attachmentFiles(): FormArray {
    return this.validateForm.get('attachmentFiles') as FormArray;
  }

  // tslint:disable-next-line:typedef
  public detectFiles(event) {
    const files = event.target.files;
    if (files) {
      for (const file of files) {
        const reader = new FileReader();
        reader.onload = (e: any) => {
          this.attachmentFiles.push(this.createItem({
            file,
            fileName: file.name
          }));
        };
        reader.readAsDataURL(file);
      }
    }
  }

  public removePhoto(i): void {
    this.attachmentFiles.removeAt(i);
  }

  destroyModal(reLoad): void {
    this.modal.destroy({ reLoad });
  }

  public get userName(): any {
    return this.validateForm.get('userName');
  }
  public get email(): any {
    return this.validateForm.get('email');
  }

  // validation space
  public noWhitespaceValidator(control: FormControl): any {
    const isWhitespace = (control.value || '').trim().length === 0;
    const isValid = !isWhitespace;
    return isValid ? null : { whitespace: true };
  }

  handleCancel(reLoading): void {
    this.modal.destroy({ reLoading });
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
    console.log(this.validateForm.value);
    const params = this.validateForm.value;
    params.placeId = 1;
    const formData: FormData = new FormData();
    Object.keys(params).forEach(key => {
      if (key !== 'attachmentFiles') {
        formData.append(key, params[key]);
      } else {
        params[key].forEach(item => {
          formData.append(key, item.file);
        });
      }
    });

    switch (this.edit) {
      case 'worker':
        const respWorker = this.workerService.updateWorker(formData);
        this.callApi(respWorker);
        break;
      case 'staff':
        const respStaff = this.staffService.updateStaff(formData);
        this.callApi(respStaff);
        break;
      case 'customer':
        const respCustomer = this.ownerService.updateOwnerCar(formData);
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
