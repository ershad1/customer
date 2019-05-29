import {Component, OnInit} from '@angular/core';
import {MatDialogRef} from '@angular/material';
import {CustomerService} from '../customer.service';


@Component({
  selector: 'app-customer-save',
  templateUrl: './customer-save.component.html',
  styleUrls: ['./customer-save.component.scss']
})
export class CustomerSaveComponent implements OnInit {


  constructor(public customerService: CustomerService,
              public dialogRef: MatDialogRef<CustomerSaveComponent>) {
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
    this.dialogRef.close();
  }
}
