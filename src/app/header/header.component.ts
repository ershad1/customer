import {Component, OnDestroy, OnInit} from '@angular/core';
import {Title} from '@angular/platform-browser';
import {Router} from '@angular/router';
import {Subscription} from 'rxjs';

import {AuthService} from '../auth/auth.service';
import {I18nService} from '../core';
import {CustomerService} from '../customer/customer.service';
import {Customer} from '../model/customer.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  userIsAuthenticated = false;
  private authListenerSubs: Subscription;

  totalCustomers = 0;
  private totalCustomersSubs: Subscription;

  constructor(private authService: AuthService,
              private router: Router,
              private titleService: Title,
              private i18nService: I18nService,
              private customerService: CustomerService
  ) {
  }

  get currentLanguage(): string {
    return this.i18nService.language;
  }

  get languages(): string[] {
    return this.i18nService.supportedLanguages;
  }

  get title(): string {
    return this.titleService.getTitle();
  }

  ngOnInit() {
    this.userIsAuthenticated = this.authService.getIsAuth();
    this.authListenerSubs = this.authService
    .getAuthStatusListener()
    .subscribe(isAuthenticated => {
      this.userIsAuthenticated = isAuthenticated;
    });

    this.totalCustomersSubs = this.customerService
    .getCustomerUpdateListener()
    .subscribe((customerData: { customers: Customer[]; customerCount: number }) => {
      this.totalCustomers = customerData.customerCount;

    });
  }

  setLanguage(language: string) {
    this.i18nService.language = language;
  }

  onLogout() {
    this.authService.logout();
  }

  ngOnDestroy() {
    this.authListenerSubs.unsubscribe();
    this.totalCustomersSubs.unsubscribe();
  }
}
