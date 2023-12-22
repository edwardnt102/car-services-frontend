import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PricesService } from '@app/services/prices.service';
import { NzModalService } from 'ng-zorro-antd/modal';
import { ToastrService } from 'ngx-toastr';
import { AddEditPriceComponent } from './add-edit-price/add-edit-price.component';

@Component({
  selector: 'app-prices',
  templateUrl: './prices.component.html',
  styleUrls: ['./prices.component.scss']
})
export class PricesComponent implements OnInit {

  prices = [];
  validateForm!: FormGroup;
  isLoading = false;

  constructor(
    private priceService: PricesService,
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
    this.getPrices();
  }

  cancel(): void { }

  confirm(id): void {
    this.priceService.delPrices(id).subscribe(result => {
      if (result.responseCode === 200) {
        this.toastService.success('Xóa thành công!');
        this.getPrices();
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
    this.getPrices(params);
  }

  // call api
  private getPrices(requset?): void {
    this.isLoading = true;
    const paramOwner = {
      page: requset?.page || 1,
      pageSize: requset?.pageSize || 10,
      sortField: '',
      sortDir: '',
      searchText: requset?.searchText || ''
    };
    this.priceService.getPrices(paramOwner).subscribe(data => {
      if (data.responseCode === 200) {
        this.isLoading = false;
        this.prices = data.listData;
      }

    });
  }

  public onCurrentPageDataChange(e): void { }

  // open modal add profile
  public addProfileModal(data?): void {
    const modal = this.modal.create({
      nzTitle: 'Thêm mới bảng giá',
      nzContent: AddEditPriceComponent,
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
        this.getPrices();
      }
    });
  }

}
