import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CarBrandService } from '@app/services/car-brand.service';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-edit-brand',
  templateUrl: './add-edit-brand.component.html',
  styleUrls: ['./add-edit-brand.component.scss']
})
export class AddEditBrandComponent implements OnInit {

  @Input() data: any;
  @Input() edit: string;
  addEditCarBrand: FormGroup;
  loading = false;

  constructor(
    private fb: FormBuilder,
    private carBrandService: CarBrandService,
    private toastService: ToastrService,
    private modal: NzModalRef,
  ) { }

  ngOnInit(): void {
    this.addEditCarBrand = this.fb.group({
      id: [0],
      brandName: ['', [Validators.required]],
      subtitle: [''],
      description: [''],
      // file: ['']
    });

    if (this.data) {
      this.addEditCarBrand.patchValue(this.data);
    }
  }

  // public onFileChange(event): void {
  //   if (event.target.files.length > 0) {
  //     const file = event.target.files[0];
  //     this.addEditCarBrand.patchValue({
  //       file
  //     });
  //   }
  // }

  destroyModal(reLoad): void {
    this.modal.destroy({ reLoad });
  }

  public get userName(): any {
    return this.addEditCarBrand.get('userName');
  }
  public get email(): any {
    return this.addEditCarBrand.get('email');
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

  submitForm(): void {
    // tslint:disable-next-line:forin
    for (const i in this.addEditCarBrand.controls) {
      this.addEditCarBrand.controls[i].markAsDirty();
      this.addEditCarBrand.controls[i].updateValueAndValidity();
    }

    if (this.addEditCarBrand.invalid) {
      return;
    }

    this.loading = true;
    const params = this.addEditCarBrand.value;
    const formData: FormData = new FormData();
    Object.keys(params).forEach(key => {
      formData.append(key, params[key]);
    });
    this.carBrandService.addEditCarBrand(formData).subscribe(
      data => {
        if (data.responseCode === 200) {
          this.loading = false;
          this.toastService.success('Lưu thành công!');
          this.destroyModal(true);
        } else {
          this.loading = false;
          this.toastService.error('Lưu không thành công!');
        }
      },
      err => {
        this.loading = false;
        this.toastService.error('Lưu không thành công!');
      }
    );
  }
}
