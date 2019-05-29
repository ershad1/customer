import {Component, OnDestroy, OnInit} from '@angular/core';
import {PageEvent} from '@angular/material';
import {Subscription} from 'rxjs';
import {AuthService} from '../../auth/auth.service';
import {Customer} from '../../model/customer.model';
import {CustomerService} from '../customer.service';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.css']
})
export class CustomerListComponent implements OnInit, OnDestroy {

  customers: Customer[] = [];
  isLoading = false;
  totalCustomers = 0;
  customersPerPage = 2;
  currentPage = 1;
  pageSizeOptions = [1, 2, 5, 10];
  userIsAuthenticated = false;
  userId: string;
  private customersSub: Subscription;
  private authStatusSub: Subscription;

  constructor(
    public customersService: CustomerService,
    private authService: AuthService
  ) {
  }

  ngOnInit() {
    this.isLoading = true;
    this.customersService.getCustomers(this.customersPerPage, this.currentPage);
    this.userId = this.authService.getUserId();
    this.customersSub = this.customersService
    .getCustomerUpdateListener()
    .subscribe((customerData: { customers: Customer[]; customerCount: number }) => {
      this.isLoading = false;
      this.totalCustomers = customerData.customerCount;
      this.customers = customerData.customers;
    });
    this.userIsAuthenticated = this.authService.getIsAuth();
    this.authStatusSub = this.authService
    .getAuthStatusListener()
    .subscribe(isAuthenticated => {
      this.userIsAuthenticated = isAuthenticated;
      this.userId = this.authService.getUserId();
    });
  }

  onChangedPage(pageData: PageEvent) {
    this.isLoading = true;
    this.currentPage = pageData.pageIndex + 1;
    this.customersPerPage = pageData.pageSize;
    this.customersService.getCustomers(this.customersPerPage, this.currentPage);
  }

  onDelete(postId: string) {
    this.isLoading = true;
    this.customersService.deleteCustomer(postId).subscribe(() => {
      this.customersService.getCustomers(this.customersPerPage, this.currentPage);
    }, () => {
      this.isLoading = false;
    });
  }

  ngOnDestroy() {
    this.customersSub.unsubscribe();
    this.authStatusSub.unsubscribe();
  }
}


