import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RuleService } from '@app/services/rule.service';
import { NzModalService } from 'ng-zorro-antd/modal';
import { ToastrService } from 'ngx-toastr';
import { AddEditRuleComponent } from './add-edit-rule/add-edit-rule.component';

@Component({
  selector: 'app-rules',
  templateUrl: './rules.component.html',
  styleUrls: ['./rules.component.scss']
})
export class RulesComponent implements OnInit {

  listCarBrand = [];
  validateForm!: FormGroup;
  isLoading = false;

  constructor(
    private ruleService: RuleService,
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
    this.ruleService.delRules(id).subscribe(result => {
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
    this.ruleService.getRules(paramOwner).subscribe(data => {
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
      nzContent: AddEditRuleComponent,
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
