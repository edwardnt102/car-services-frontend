import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CarBrandService } from '@app/services/car-brand.service';
import { CarModelService } from '@app/services/car-model.service';
import { CarOwnerService } from '@app/services/car-owner.service';
import { CarsService } from '@app/services/cars.service';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-edit-car',
  templateUrl: './add-edit-car.component.html',
  styleUrls: ['./add-edit-car.component.scss']
})
export class AddEditCarComponent implements OnInit {

  validateForm: FormGroup;
  loading = false;
  @Input() data: any;
  @Input() edit: string;
  brands: Array<{ value: string; text: string }> = [];
  carModel: Array<{ value: string; text: string }> = [];
  customers: Array<{ value: string; text: string }> = [];
  nzFilterOption = () => true;
  nzFilterOptionClass = () => true;

  constructor(
    private fb: FormBuilder,
    private carModelService: CarModelService,
    private carBrandService: CarBrandService,
    private customerService: CarOwnerService,
    private carService: CarsService,
    private toastService: ToastrService,
    private modal: NzModalRef,
  ) { }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      id: [0],
      title: ['', [Validators.required]],
      subtitle: [''],
      description: [''],
      brandId: ['', Validators.required],
      carModelId: ['', Validators.required],
      customerId: ['', Validators.required],
      yearOfManufacture: [''],
      carColor: [''],
      licensePlates: ['', [Validators.required]],
      files: this.fb.array([])
    });

    if (this.data) {
      this.searchBrand('');
      this.searchModel('');
      this.searchCustomer('');
      this.validateForm.patchValue(this.data);
    }
  }


  createItem(data): FormGroup {
    return this.fb.group(data);
  }

  get attachmentFiles(): FormArray {
    return this.validateForm.get('files') as FormArray;
  }

  searchBrand(value?: string): void {
    this.carBrandService.suggestCarBrand(value)
      .subscribe(data => {
        if (data.responseCode === 200) {
          this.brands = data.listData;
        }
      });
  }

  searchModel(value?: string): void {
    this.carModelService.suggestCarModel(value)
      .subscribe(data => {
        if (data.responseCode === 200) {
          this.carModel = data.listData;
        }
      });
  }

  searchCustomer(value?: string): void {
    this.customerService.suggestOwnerCar(value)
      .subscribe(data => {
        if (data.responseCode === 200) {
          this.customers = data.listData;
        }
      });
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
    const params = this.validateForm.value;
    const formData: FormData = new FormData();
    Object.keys(params).forEach(key => {
      if (key !== 'files') {
        formData.append(key, params[key]);
      } else {
        params[key].forEach(item => {
          formData.append(key, item.file);
        });
      }
    });
    this.carService.addEditCars(formData).subscribe(
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
