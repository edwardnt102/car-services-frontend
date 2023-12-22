import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { PricesService } from '@app/services/prices.service';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-edit-price',
  templateUrl: './add-edit-price.component.html',
  styleUrls: ['./add-edit-price.component.scss']
})
export class AddEditPriceComponent implements OnInit {

  priceForm: FormGroup;
  loading = false;
  @Input() data: any;
  @Input() edit: string;
  brands: Array<{ value: string; text: string }> = [];
  carClass: Array<{ value: string; text: string }> = [];
  nzFilterOption = () => true;
  nzFilterOptionClass = () => true;

  constructor(
    private fb: FormBuilder,
    private priceService: PricesService,
    private toastService: ToastrService,
    private modal: NzModalRef,
  ) { }

  ngOnInit(): void {
    this.priceForm = this.fb.group({
      id: [0],
      title: ['', [Validators.required]],
      placeId: [''],
      subtitle: [''],
      description: [''],
      priceClassA: [''],
      priceClassB: [''],
      priceClassC: [''],
      priceClassD: [''],
      priceClassE: [''],
      files: this.fb.array([])
    });

    if (this.data) {
      this.priceForm.patchValue(this.data);
    }
  }


  createItem(data): FormGroup {
    return this.fb.group(data);
  }

  get attachmentFiles(): FormArray {
    return this.priceForm.get('files') as FormArray;
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
    return this.priceForm.get('userName');
  }
  public get email(): any {
    return this.priceForm.get('email');
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
    for (const i in this.priceForm.controls) {
      this.priceForm.controls[i].markAsDirty();
      this.priceForm.controls[i].updateValueAndValidity();
    }

    if (this.priceForm.invalid) {
      return;
    }

    this.loading = true;
    const params = this.priceForm.value;
    params.placeId = 1;
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
    this.priceService.addEditPrices(formData).subscribe(
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
