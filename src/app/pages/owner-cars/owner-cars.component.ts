import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AddUserComponent } from '@app/components/common/add-user/add-user.component';
import { UpdateUserComponent } from '@app/components/common/update-user/update-user.component';
import { CarOwnerService } from '@app/services/car-owner.service';
import { NzModalService, NzModalRef } from 'ng-zorro-antd/modal';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-owner-cars',
  templateUrl: './owner-cars.component.html',
  styleUrls: ['./owner-cars.component.scss']
})
export class OwnerCarsComponent implements OnInit {
  listCustomer = [];
  validateForm!: FormGroup;
  controlArray: Array<{ index: number; show: boolean }> = [];
  isVisible = false;
  isUpdate = false;
  isLoading = false;
  item;

  constructor(
    private ownerService: CarOwnerService,
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
    this.getOwners();
  }

  cancel(): void { }

  confirm(id): void {
    this.ownerService.delOwnerCar(id).subscribe(result => {
      if (result.responseCode === 200) {
        this.toastService.success('Xóa thành công!');
        this.getOwners();
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
      this.getOwners();
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
    this.getOwners(params);
  }

  // call api
  private getOwners(requset?): void {
    this.isLoading = true;
    const paramOwner = {
      page: requset?.page || 1,
      pageSize: requset?.pageSize || 10,
      sortField: '',
      sortDir: '',
      searchText: requset?.searchText || ''
    };
    this.ownerService.getOwners(paramOwner).subscribe(data => {
      if (data.responseCode === 200) {
        this.isLoading = false;
        this.listCustomer = data.listData;
      }

    });
  }

  public onCurrentPageDataChange(e): void { }

  // open modal add profile
  public addProfileModal(): void {
    const modal = this.modal.create({
      nzTitle: 'Thêm mới khách hàng',
      nzContent: AddUserComponent,
      nzViewContainerRef: this.viewContainerRef,
      nzWidth: '900px',
      nzComponentParams: {
        add: 'customer'
      },
      nzFooter: null
    });
    modal.afterClose.subscribe(result => {
      if (result.reLoad) {
        this.getOwners();
      }
    });
  }

  // open modal update profile
  updateProfileModal(data): void {
    const modal = this.modal.create({
      nzTitle: 'Cập nhật thông tin',
      nzContent: UpdateUserComponent,
      nzViewContainerRef: this.viewContainerRef,
      nzWidth: '900px',
      nzComponentParams: {
        edit: 'customer',
        data
      },
      nzFooter: null,
      nzMaskClosable: false,
      nzClosable: false
    });
    modal.afterClose.subscribe(result => {
      if (result.reLoad) {
        this.getOwners();
      }
    });
  }
}
