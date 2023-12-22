import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AddUserComponent } from '@app/components/common/add-user/add-user.component';
import { UpdateUserComponent } from '@app/components/common/update-user/update-user.component';
import { WorkerService } from '@app/services/worker.service';
import { NzModalService } from 'ng-zorro-antd/modal';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-worker',
  templateUrl: './worker.component.html',
  styleUrls: ['./worker.component.scss']
})
export class WorkerComponent implements OnInit {

  workers = [];
  validateForm!: FormGroup;
  controlArray: Array<{ index: number; show: boolean }> = [];
  isVisible = false;
  isUpdate = false;
  isLoading = false;
  item;

  constructor(
    private workerService: WorkerService,
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
    this.getWorker();
  }

  cancel(): void { }

  confirm(id): void {
    this.workerService.delWorker(id).subscribe(result => {
      if (result.responseCode === 200) {
        this.toastService.success('Xóa thành công!');
        this.getWorker();
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
    this.getWorker(params);
  }

  // call api
  private getWorker(requset?) {
    this.isLoading = true;
    const paramOwner = {
      page: requset?.page || 1,
      pageSize: requset?.pageSize || 10,
      sortField: '',
      sortDir: '',
      searchText: requset?.searchText || ''
    };
    this.workerService.getWorker(paramOwner).subscribe(data => {
      if (data.responseCode === 200) {
        this.isLoading = false;
        this.workers = data.listData;
      }

    });
  }

  public onCurrentPageDataChange(e) { }

  // open modal add profile
  addWorkerModal(): void {
    const modal = this.modal.create({
      nzTitle: 'Thêm mới lao động',
      nzContent: AddUserComponent,
      nzViewContainerRef: this.viewContainerRef,
      nzWidth: '900px',
      nzComponentParams: {
        add: 'worker'
      },
      nzFooter: null,
      nzMaskClosable: false,
      nzClosable: false
    });
    modal.afterClose.subscribe(result => {
      if (result.reLoad) {
        this.getWorker();
      }
    });
  }

  // open modal update profile
  updateWorkerModal(data): void {
    const modal = this.modal.create({
      nzTitle: 'Cập nhật thông tin',
      nzContent: UpdateUserComponent,
      nzViewContainerRef: this.viewContainerRef,
      nzWidth: '900px',
      nzComponentParams: {
        edit: 'worker',
        data
      },
      nzFooter: null,
      nzMaskClosable: false,
      nzClosable: false
    });
    modal.afterClose.subscribe(result => {
      if (result.reLoad) {
        this.getWorker();
      }
    });
  }

}
