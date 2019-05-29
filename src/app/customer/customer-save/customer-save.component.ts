import {Component, OnInit} from '@angular/core';
import {MatDialogRef} from '@angular/material';
import {CustomerService} from '../customer.service';


@Component({
  selector: 'app-customer-save',
  templateUrl: './customer-save.component.html',
  styleUrls: ['./customer-save.component.css']
})
export class CustomerSaveComponent implements OnInit {

  private mode = 'create';
  isLoading = false;
  private customerId: string;

  constructor(public customerService: CustomerService) {
  }


  ngOnInit() {
  }

  onClear() {
    this.customerService.form.reset();
    this.customerService.initializeFormGroup();
  }

  onSubmit() {
    this.customerService.addCustomer(this.customerService.form.value);
  }

  onClose() {
    this.customerService.form.reset();
    this.customerService.initializeFormGroup();
  }

  onSaveCustomer() {

    this.isLoading = true;
    if (this.mode === 'create') {
      this.customerService.addCustomer(
        this.customerService.form.value
      );
    } else {
      this.customerService.updateCustomer(
        this.customerId,
        this.customerService.form.value
      );
    }
    this.customerService.form.reset();
  }
}
