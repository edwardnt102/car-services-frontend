import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './layout.component';


const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: 'car-brand',
        loadChildren: () => import('@pages/car-brand/car-brand.module').then(m => m.CarBrandModule),
        data: {
          breadcrumb: 'Hãng xe'
        },
      },
      {
        path: 'car-model',
        loadChildren: () => import('@pages/car-model/car-model.module').then(m => m.CarModelModule),
        data: {
          breadcrumb: 'Mẫu xe'
        },
      },
      {
        path: 'cars',
        loadChildren: () => import('@pages/cars/cars.module').then(m => m.CarsModule),
        data: {
          breadcrumb: 'Xe'
        },
      },
      {
        path: 'car-owner',
        loadChildren: () => import('@pages/owner-cars/owner-cars.module').then(m => m.OwnerCarsModule),
        data: {
          breadcrumb: 'Chủ xe'
        },
      },
      {
        path: 'staffs',
        loadChildren: () => import('@pages/staffs/staffs.module').then(m => m.StaffsModule),
        data: {
          breadcrumb: 'Nhân viên'
        },
      },
      {
        path: 'worker',
        loadChildren: () => import('@pages/worker/worker.module').then(m => m.WorkerModule),
        data: {
          breadcrumb: 'Lao động'
        },
      },
      {
        path: 'price',
        loadChildren: () => import('@pages/prices/prices.module').then(m => m.PricesModule),
        data: {
          breadcrumb: 'Bảng giá'
        },
      },
      {
        path: 'place',
        loadChildren: () => import('@pages/places/places.module').then(m => m.PlacesModule),
        data: {
          breadcrumb: 'Khu vực'
        },
      },
      {
        path: 'subs',
        loadChildren: () => import('@pages/subscription/subscription.module').then(m => m.SubscriptionModule),
        data: {
          breadcrumb: 'Thuê bao'
        },
      },
      {
        path: 'rules',
        loadChildren: () => import('@pages/rules/rules.module').then(m => m.RulesModule),
        data: {
          breadcrumb: 'Quy định'
        },
      },
      {
        path: 'company',
        loadChildren: () => import('@pages/company/company.module').then(m => m.CompanyModule),
        data: {
          breadcrumb: 'Đại lý'
        },
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutRoutingModule { }
