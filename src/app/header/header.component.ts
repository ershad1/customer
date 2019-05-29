import { Component, OnInit, OnDestroy } from "@angular/core";
import {Title} from '@angular/platform-browser';
import {Router} from '@angular/router';
import { Subscription } from "rxjs";

import { AuthService } from "../auth/auth.service";
import {I18nService} from '../core';

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.css"]
})
export class HeaderComponent implements OnInit, OnDestroy {
  userIsAuthenticated = false;
  private authListenerSubs: Subscription;

  constructor(private authService: AuthService,
              private router: Router,
              private titleService: Title,
              private i18nService: I18nService

              ) {}

  ngOnInit() {
    this.userIsAuthenticated = this.authService.getIsAuth();
    this.authListenerSubs = this.authService
      .getAuthStatusListener()
      .subscribe(isAuthenticated => {
        this.userIsAuthenticated = isAuthenticated;
      });
  }
  setLanguage(language: string) {
    this.i18nService.language = language;
  }
  get currentLanguage(): string {
    return this.i18nService.language;
  }

  get languages(): string[] {
    return this.i18nService.supportedLanguages;
  }
  onLogout() {
    this.authService.logout();
  }
  get title(): string {
    return this.titleService.getTitle();
  }
  ngOnDestroy() {
    this.authListenerSubs.unsubscribe();
  }
}
