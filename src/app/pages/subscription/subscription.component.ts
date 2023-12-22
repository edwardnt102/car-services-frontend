import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SubscriptionService } from '@app/services/subscription.service';
import { NzModalService } from 'ng-zorro-antd/modal';
import { ToastrService } from 'ngx-toastr';
import { AddEditSubsComponent } from './add-edit-subs/add-edit-subs.component';

@Component({
  selector: 'app-subscription',
  templateUrl: './subscription.component.html',
  styleUrls: ['./subscription.component.scss']
})
export class SubscriptionComponent implements OnInit {


  listCarBrand = [];
  validateForm!: FormGroup;
  isLoading = false;

  constructor(
    private subsService: SubscriptionService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private viewContainerRef: ViewContainerRef,
    private modal: NzModalService,
    private toastService: ToastrService
  ) { }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      textSearch: ['']
    });
    this.getCarBrand();
  }

  cancel(): void { }

  confirm(id): void {
    this.subsService.delSubscriptions(id).subscribe(result => {
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
    this.subsService.getSubscriptions(paramOwner).subscribe(data => {
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
      nzTitle: 'Thêm mới mẫu xe',
      nzContent: AddEditSubsComponent,
      nzViewContainerRef: this.viewContainerRef,
      nzWidth: '800px',
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
