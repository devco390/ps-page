import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

import { filter } from 'rxjs/operators';
import { isPlatformBrowser } from '@angular/common';
import { IpService } from './services/ip.service';

declare var gtag;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  ipSaved = false;
  dataIp: any;

  constructor(
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: any,
    private ipService: IpService
  ) {
    if (isPlatformBrowser(this.platformId)) {
      const navEndEvents$ = this.router.events.pipe(
        filter((event) => event instanceof NavigationEnd)
      );

      navEndEvents$.subscribe((event: NavigationEnd) => {
        gtag('config', 'UA-177560620-1', {
          page_path: event.urlAfterRedirects,
        });
      });
    }
  }

  async ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.dataIp = await this.ipService.getIp();
    }

    console.log(
      `======================================
Porque se que en las nostalgias llegas, y no dices NADA...
https://youtu.be/yLWZ8XrdBVg


“Nunca intentes ganar por la fuerza lo que se puede ganar mediante el engaño”. N.M.
======================================`
    );
  }

  clearServiceWorker() {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker
        .getRegistrations()
        .then(function (registrations) {
          for (let registration of registrations) {
            registration.unregister();
          }
        })
        .catch(function (err) {
          console.log('Service Worker registration failed: ', err);
        });
    }
  }
}
