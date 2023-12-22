import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CarBrandService } from '@app/services/car-brand.service';
import { CarModelService } from '@app/services/car-model.service';
import { CommonService } from '@app/services/common.service';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-edit-car-model',
  templateUrl: './add-edit-car-model.component.html',
  styleUrls: ['./add-edit-car-model.component.scss']
})
export class AddEditCarModelComponent implements OnInit {
  carModelForm: FormGroup;
  loading = false;
  @Input() data: any;
  @Input() edit: string;
  brands: Array<{ value: string; text: string }> = [];
  carClass: Array<{ value: string; text: string }> = [];
  nzFilterOption = () => true;
  nzFilterOptionClass = () => true;

  constructor(
    private fb: FormBuilder,
    private carModelService: CarModelService,
    private carBrandService: CarBrandService,
    private commonService: CommonService,
    private toastService: ToastrService,
    private modal: NzModalRef,
  ) { }

  ngOnInit(): void {
    this.carModelForm = this.fb.group({
      id: [0],
      name: ['', [Validators.required]],
      subtitle: [''],
      description: [''],
      brandId: ['', Validators.required],
      classId: ['', Validators.required],
      note: [''],
      long: [''],
      wide: [''],
      high: [''],
      heavy: [''],
      referencePrice: [''],
      // file: this.fb.array([])
    });

    if (this.data) {
      this.search('');
      this.searchClass('');
      this.carModelForm.patchValue(this.data);
    }
  }


  createItem(data): FormGroup {
    return this.fb.group(data);
  }

  get attachmentFiles(): FormArray {
    return this.carModelForm.get('file') as FormArray;
  }

  search(value?: string): void {
    this.carBrandService.suggestCarBrand(value)
      .subscribe(data => {
        if (data.responseCode === 200) {
          this.brands = data.listData;
        }
      });
  }

  searchClass(value?: string): void {
    this.commonService.suggestCarClass(value)
      .subscribe(data => {
        if (data.responseCode === 200) {
          this.carClass = data.listData;
        }
      });
  }

  // tslint:disable-next-line:typedef
  // public detectFiles(event) {
  //   const files = event.target.files;
  //   if (files) {
  //     for (const file of files) {
  //       const reader = new FileReader();
  //       reader.onload = (e: any) => {
  //         this.attachmentFiles.push(this.createItem({
  //           file,
  //           fileName: file.name
  //         }));
  //       };
  //       reader.readAsDataURL(file);
  //     }
  //   }
  // }

  // public removePhoto(i): void {
  //   this.attachmentFiles.removeAt(i);
  // }

  destroyModal(reLoad): void {
    this.modal.destroy({ reLoad });
  }

  public get userName(): any {
    return this.carModelForm.get('userName');
  }
  public get email(): any {
    return this.carModelForm.get('email');
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
    for (const i in this.carModelForm.controls) {
      this.carModelForm.controls[i].markAsDirty();
      this.carModelForm.controls[i].updateValueAndValidity();
    }

    if (this.carModelForm.invalid) {
      return;
    }

    this.loading = true;
    const params = this.carModelForm.value;
    params.placeId = 1;
    const formData: FormData = new FormData();
    Object.keys(params).forEach(key => {
      if (key !== 'file') {
        formData.append(key, params[key]);
      } else {
        params[key].forEach(item => {
          formData.append(key, item.file);
        });
      }
    });
    this.carModelService.addEditCarModel(formData).subscribe(
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
