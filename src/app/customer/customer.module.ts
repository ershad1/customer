import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {SharedModule} from '../shared/module/shared.module';

import {CustomerRoutingModule} from './customer-routing.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    CustomerRoutingModule,
    SharedModule
  ],
  entryComponents: [
    // CustomerSaveComponent
  ]
})
export class CustomerModule {
}
