import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CarBrandService } from '@app/services/car-brand.service';
import { CarOwnerService } from '@app/services/car-owner.service';
import { NzModalService } from 'ng-zorro-antd/modal';
import { ToastrService } from 'ngx-toastr';
import { AddEditBrandComponent } from './add-edit-brand/add-edit-brand.component';

@Component({
  selector: 'app-car-brand',
  templateUrl: './car-brand.component.html',
  styleUrls: ['./car-brand.component.scss']
})
export class CarBrandComponent implements OnInit {

  listCarBrand = [];
  validateForm!: FormGroup;
  controlArray: Array<{ index: number; show: boolean }> = [];
  isVisible = false;
  isUpdate = false;
  isLoading = false;
  item;

  constructor(
    private carBrandService: CarBrandService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private viewContainerRef: ViewContainerRef,
    private modal: NzModalService,
    private toastService: ToastrService
  ) { }

  ngOnInit(): void {
    // this.route.queryParams.subscribe(v => console.log(v));
    // this.router.navigate([], {
    //   queryParams: {
    //     Page: 1,
    //     PageSize: 20
    //   }
    // });
    // this.route.queryParams.subscribe(v => console.log(v));
    this.validateForm = this.fb.group({
      textSearch: ['']
    });
    this.getCarBrand();
  }

  cancel(): void { }

  confirm(id): void {
    this.carBrandService.delCarBrand(id).subscribe(result => {
      if (result.responseCode === 200) {
        this.toastService.success('Xóa thành công!');
        this.getCarBrand();
      }
    },
      err => {
        this.toastService.error('Xóa không thành công!');
      }
    );
  }

  showModal(): void {
    this.isVisible = true;
  }

  closeModal(isHide): void {
    this.isVisible = isHide.open;
    if (isHide.callBack) {
      this.getCarBrand();
    }
  }

  resetForm(): void {
    this.validateForm.reset();
  }

  // search function
  public search(value) {
    const params = {
      page: 1,
      pageSize: 10,
      searchText: value.textSearch
    };
    this.getCarBrand(params);
  }

  // call api
  private getCarBrand(requset?): void {
    this.isLoading = true;
    const paramOwner = {
      page: requset?.page || 1,
      pageSize: requset?.pageSize || 10,
      sortField: '',
      sortDir: '',
      searchText: requset?.searchText || ''
    };
    this.carBrandService.getCarBrand(paramOwner).subscribe(data => {
      if (data.responseCode === 200) {
        this.isLoading = false;
        this.listCarBrand = data.listData;
      }

    });
  }

  public onCurrentPageDataChange(e): void { }

  // open modal add profile
  public addProfileModal(data?): void {
    const modal = this.modal.create({
      nzTitle: 'Thêm mới hãng xe',
      nzContent: AddEditBrandComponent,
      nzViewContainerRef: this.viewContainerRef,
      nzWidth: '600px',
      nzComponentParams: {
        data
      },
      nzFooter: null,
      nzMaskClosable: false,
      nzClosable: false
    });
    modal.afterClose.subscribe(result => {
      if (result.reLoad) {
        this.getCarBrand();
      }
    });
  }

}
