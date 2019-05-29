import {Component, OnInit} from '@angular/core';
import {Title} from '@angular/platform-browser';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {TranslateService} from '@ngx-translate/core';
import {merge} from 'rxjs';
import {filter, map, mergeMap} from 'rxjs/operators';

import {environment} from '../environments/environment';
import {AuthService} from './auth/auth.service';
import {I18nService, Logger, untilDestroyed} from './core';
// import { Subscription } from "rxjs";

// import { ErrorService } from "./error/error.service";
const log = new Logger('App');

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  // hasError = false;
  // private errorSub: Subscription;

  constructor(
    private authService: AuthService,
    // private errorService: ErrorService
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private titleService: Title,
    private translateService: TranslateService,
    private i18nService: I18nService
  ) {
  }

  ngOnInit() {
    this.authService.autoAuthUser();
    // this.errorSub = this.errorService.getErrorListener().subscribe(
    //   message => this.hasError = message !== null
    // );
    // Setup logger
    if (environment.production) {
      Logger.enableProductionMode();
    }

    log.debug('init');

    // Setup translations
    this.i18nService.init(environment.defaultLanguage, environment.supportedLanguages);

    const onNavigationEnd = this.router.events.pipe(filter(event => event instanceof NavigationEnd));

    // Change page title on navigation or language change, based on route data
    merge(this.translateService.onLangChange, onNavigationEnd)
    .pipe(
      map(() => {
        let route = this.activatedRoute;
        while (route.firstChild) {
          route = route.firstChild;
        }
        return route;
      }),
      filter(route => route.outlet === 'primary'),
      mergeMap(route => route.data),
      untilDestroyed(this)
    )
    .subscribe(event => {
      const title = event['title'];
      if (title) {
        this.titleService.setTitle(this.translateService.instant(title));
      }
    });
  }

  ngOnDestroy() {
    // this.errorSub.unsubscribe();
    this.i18nService.destroy();
  }
}
