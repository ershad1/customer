import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {SharedModule} from '../shared/module/shared.module';
import {CustomerListComponent} from './customer-list/customer-list.component';

import {CustomerRoutingModule} from './customer-routing.module';
import {CustomerSaveComponent} from './customer-save/customer-save.component';
import {CustomerComponent} from './customer/customer.component';

@NgModule({
  declarations: [CustomerComponent, CustomerListComponent, CustomerSaveComponent],
  imports: [
    CommonModule,
    CustomerRoutingModule,
    SharedModule
  ],
  entryComponents: [
    CustomerSaveComponent
  ]
})
export class CustomerModule {
}
